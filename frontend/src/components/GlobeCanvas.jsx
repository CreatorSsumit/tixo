import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Label data — rendered as HTML overlays
const LABEL_DEFS = [
  { nodeIdx: 0, title: 'South Asia',      stat: '2.4M+ Students',    sub: 'India · Pakistan · Bangladesh',  offsetX: 18, offsetY: -14 },
  { nodeIdx: 3, title: 'Middle East',     stat: 'GCC Hub',            sub: 'UAE · Saudi Arabia · Qatar',     offsetX: 18, offsetY: -14 },
  { nodeIdx: 6, title: 'United Kingdom',  stat: '#1 Destination',     sub: 'Top Target Market',              offsetX: -160, offsetY: -14 },
  { nodeIdx: 8, title: 'Australia',       stat: 'Top 3 Global',       sub: 'High Conversion',                offsetX: 18, offsetY: -14 },
  { nodeIdx: 4, title: 'West Africa',     stat: '320K+ Applicants',   sub: 'Nigeria · Ghana · Kenya',        offsetX: 18, offsetY: -14 },
];

const GlobeCanvas = () => {
  const wrapRef     = useRef(null);   // outer wrapper
  const mountRef    = useRef(null);   // canvas mount
  const labelRefs   = useRef([]);     // label element refs
  const mouseRef    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth  || 500;
    const h = mount.clientHeight || 480;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.z = 3.0;

    // Master group — initial rotation to show Eastern Hemisphere (UK, India, UAE)
    const group = new THREE.Group();
    group.rotation.y = Math.PI * 0.55; // Start showing South Asia / Europe / Middle East
    scene.add(group);

    // ── Sphere surface dots (Fibonacci sphere) ──
    const N = 5000;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const t = golden * i;
      pos[i*3]   = r * Math.cos(t);
      pos[i*3+1] = y;
      pos[i*3+2] = r * Math.sin(t);
      // colour — slightly warm white
      col[i*3]   = 0.72; col[i*3+1] = 0.72; col[i*3+2] = 0.74;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    dotGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const dotMat = new THREE.PointsMaterial({
      vertexColors: true, size: 0.013,
      transparent: true, opacity: 0.65, sizeAttenuation: true,
    });
    group.add(new THREE.Points(dotGeo, dotMat));

    // ── Lat/lon → Vector3 ──
    const ll2v = (lat, lon, r = 1.03) => {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // ── Nodes ──
    const locs = [
      { lat: 20.5,  lon: 78.9  },   // 0 India
      { lat: 30.3,  lon: 69.3  },   // 1 Pakistan
      { lat: 23.7,  lon: 90.4  },   // 2 Bangladesh
      { lat: 24.4,  lon: 54.4  },   // 3 UAE
      { lat: 9.0,   lon: 8.6   },   // 4 Nigeria
      { lat: -1.3,  lon: 36.8  },   // 5 Kenya
      { lat: 51.5,  lon: -0.1  },   // 6 UK
      { lat: 45.4,  lon: -75.7 },   // 7 Canada
      { lat: -33.9, lon: 151.2 },   // 8 Australia
      { lat: 1.35,  lon: 103.8 },   // 9 Singapore
    ];
    const nodeVecs = locs.map(({ lat, lon }) => ll2v(lat, lon));

    // Rings for animation
    const pulseRings = [];

    nodeVecs.forEach((nPos, idx) => {
      const isLabelNode = LABEL_DEFS.some(d => d.nodeIdx === idx);

      // Core sphere — larger for label nodes
      const r = isLabelNode ? 0.030 : 0.020;
      const coreGeo = new THREE.SphereGeometry(r, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xE50914 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(nPos);
      group.add(core);

      // Inner glow ring
      const normal = nPos.clone().normalize();
      const makeRing = (inner, outer, opacity) => {
        const g = new THREE.RingGeometry(inner, outer, 32);
        const m = new THREE.MeshBasicMaterial({ color: 0xE50914, transparent: true, opacity, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.copy(nPos);
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), normal);
        group.add(mesh);
        return { mesh, mat: m, baseOpacity: opacity };
      };

      makeRing(0.034, 0.048, 0.5);
      const outerRing = makeRing(0.050, 0.068, 0.22);
      pulseRings.push({ ...outerRing, phase: Math.random() * Math.PI * 2 });
    });

    // ── Connection arcs ──
    const connections = [
      [0, 6], [1, 6], [2, 8], [3, 8],
      [4, 6], [5, 6], [0, 8], [3, 7],
      [9, 8], [1, 7],
    ];
    const arcMats = [];
    connections.forEach(([i, j]) => {
      const s  = nodeVecs[i].clone();
      const e  = nodeVecs[j].clone();
      const mid = s.clone().add(e).normalize().multiplyScalar(1.58);
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      const pts   = curve.getPoints(72);
      const geo   = new THREE.BufferGeometry().setFromPoints(pts);
      const mat   = new THREE.LineBasicMaterial({ color: 0xFF3333, transparent: true, opacity: 0.35 });
      group.add(new THREE.Line(geo, mat));
      arcMats.push({ mat, phase: Math.random() * Math.PI * 2 });
    });

    // ── Equatorial glow ring ──
    const eqGeo = new THREE.TorusGeometry(1.01, 0.003, 8, 120);
    const eqMat = new THREE.MeshBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.12 });
    group.add(new THREE.Mesh(eqGeo, eqMat));

    // ── Animation loop ──
    let rafId, t = 0;

    // Helper: project 3D world pos → container 2D pixel
    const project2D = (worldPos) => {
      const ndc = worldPos.clone().project(camera);
      const cw  = mount.clientWidth;
      const ch  = mount.clientHeight;
      return { x: (ndc.x * 0.5 + 0.5) * cw, y: (-ndc.y * 0.5 + 0.5) * ch };
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.012;

      // Auto-rotate
      group.rotation.y += 0.0020;

      // Mouse tilt on X
      const targetX = mouseRef.current.y * 0.26;
      group.rotation.x += (targetX - group.rotation.x) * 0.04;

      // Pulse arcs
      arcMats.forEach(({ mat, phase }, i) => {
        mat.opacity = 0.22 + 0.2 * Math.sin(t + phase + i * 0.42);
      });

      // Pulse outer rings
      pulseRings.forEach(({ mat, baseOpacity, phase }) => {
        mat.opacity = baseOpacity * (0.5 + 0.5 * Math.sin(t * 1.4 + phase));
      });

      // ── Update floating labels ──
      LABEL_DEFS.forEach((def, i) => {
        const labelEl = labelRefs.current[i];
        if (!labelEl) return;

        // World position of this node
        const localPos = nodeVecs[def.nodeIdx];
        const worldPos = localPos.clone().applyMatrix4(group.matrixWorld);

        // Visibility: fade in as node comes to front hemisphere
        const visibility = Math.min(1, Math.max(0, (worldPos.z + 0.08) * 3.5));

        if (visibility < 0.01) {
          labelEl.style.opacity = '0';
          labelEl.style.pointerEvents = 'none';
          return;
        }

        const { x, y } = project2D(worldPos);
        labelEl.style.opacity = Math.min(1, visibility).toString();
        labelEl.style.transform = `translate(${x + def.offsetX}px, ${y + def.offsetY}px)`;
        labelEl.style.pointerEvents = 'auto';
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Mouse ──
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Resize ──
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
      ro.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} data-testid="globe-canvas" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '460px' }}>
      {/* WebGL canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* HTML label overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {LABEL_DEFS.map((def, i) => (
          <div
            key={i}
            ref={(el) => { labelRefs.current[i] = el; }}
            data-testid={`globe-label-${i}`}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              opacity: 0,
              transition: 'opacity 0.35s ease',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            {/* Connector dot */}
            <div style={{ position: 'absolute', top: '50%', left: def.offsetX > 0 ? -6 : 'auto', right: def.offsetX < 0 ? -6 : 'auto', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#E50914' }} />
            {/* Label card */}
            <div style={{
              background: 'rgba(10,10,10,0.88)',
              border: '1px solid rgba(229,9,20,0.55)',
              borderRadius: 6,
              padding: '7px 12px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(229,9,20,0.18)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#E50914', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.2 }}>{def.title}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginTop: 2 }}>{def.stat}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', marginTop: 1 }}>{def.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobeCanvas;
