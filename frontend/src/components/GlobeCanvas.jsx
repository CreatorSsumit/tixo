import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── Destination nodes (recruitment targets) ─── */
const DEST = [
  {
    lat: -33.9, lon: 151.2, title: 'AUSTRALIA', sub: 'Top Student Destination',
    bullets: ['Top Global Destination', 'High Visa Approval Rate', 'Strong Demand from South Asia'],
    popupOffset: { x: 18, y: -12 },
  },
  {
    lat: 51.2, lon: 10.4, title: 'GERMANY', sub: 'European Study Hub',
    bullets: ['Low / No Tuition Fees', 'Strong Engineering Programmes', 'Growing International Intake'],
    popupOffset: { x: 16, y: -92 },
  },
  {
    lat: 56.1, lon: -106.3, title: 'CANADA', sub: 'North American Gateway',
    bullets: ['High PGWP Demand', 'Top: Business & IT', 'Fast-Track Immigration Routes'],
    popupOffset: { x: -188, y: -12 },
  },
  {
    lat: 51.5, lon: -0.1, title: 'UNITED KINGDOM', sub: '#1 International Destination',
    bullets: ['#1 for International Students', 'Strong Graduate Route Visa', 'World-Class Research'],
    popupOffset: { x: -192, y: 22 },
  },
  {
    lat: 38.9, lon: -77.0, title: 'UNITED STATES', sub: 'STEM & Research Leader',
    bullets: ['STEM OPT Opportunities', 'Top Research Universities', 'Diverse Programme Portfolio'],
    popupOffset: { x: -192, y: -12 },
  },
];

/* ─── Source nodes (student flow origins) ─── */
const SRC = [
  { lat: 20.5, lon: 78.9  }, // India
  { lat: 30.3, lon: 69.3  }, // Pakistan
  { lat: 23.7, lon: 90.4  }, // Bangladesh
  { lat: 24.4, lon: 54.4  }, // UAE
  { lat: 9.0,  lon: 8.6   }, // Nigeria
  { lat: -1.3, lon: 36.8  }, // Kenya
];

/* ─── Connections [srcIdx, destIdx] ─── */
const CONNECTIONS = [
  [0, 3], [0, 0], [0, 2],   // India → UK, AU, CA
  [1, 3], [1, 2],            // Pakistan → UK, CA
  [2, 3], [2, 0],            // Bangladesh → UK, AU
  [3, 3], [3, 0], [3, 1],   // UAE → UK, AU, DE
  [4, 3], [4, 4],            // Nigeria → UK, US
  [5, 3], [5, 4],            // Kenya → UK, US
];

const GlobeCanvas = () => {
  const wrapRef    = useRef(null);
  const mountRef   = useRef(null);
  const labelRefs  = useRef([]);
  const mouseRef   = useRef({ gx: 0, gy: 0, cx: -999, cy: -999 });
  const hoveredRef = useRef(-1);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth  || 500;
    const h = mount.clientHeight || 500;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.z = 3.1;

    // ── Globe group ──
    const group = new THREE.Group();
    group.rotation.y = Math.PI * 0.58; // Eastern hemisphere visible initially
    scene.add(group);

    // ── Lat/lon → Vector3 ──
    const ll2v = (lat, lon, r = 1.0) => {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // ── 1. Globe surface dots ──
    const N = 4800;
    const posArr = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const t = golden * i;
      posArr[i*3]   = r * Math.cos(t);
      posArr[i*3+1] = y;
      posArr[i*3+2] = r * Math.sin(t);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0x999999, size: 0.010, transparent: true, opacity: 0.40, sizeAttenuation: true });
    group.add(new THREE.Points(dotGeo, dotMat));

    // ── 2. Grid lines (lat + lon) ──
    const latMat = new THREE.LineBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.30 });
    const lonMat = new THREE.LineBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.22 });

    // Latitude circles every 30°
    [-60, -30, 0, 30, 60].forEach(lat => {
      const phi = (90 - lat) * Math.PI / 180;
      const ry  = Math.cos(phi) * 1.006;
      const rr  = Math.sin(phi) * 1.006;
      const pts = [];
      for (let i = 0; i <= 80; i++) {
        const a = (i / 80) * Math.PI * 2;
        pts.push(new THREE.Vector3(rr * Math.cos(a), ry, rr * Math.sin(a)));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), latMat));
    });

    // Longitude lines every 30°
    for (let lon = 0; lon < 360; lon += 30) {
      const theta = (lon + 180) * Math.PI / 180;
      const pts = [];
      for (let i = 0; i <= 40; i++) {
        const lat = -90 + 180 * i / 40;
        const phi = (90 - lat) * Math.PI / 180;
        pts.push(new THREE.Vector3(
          -1.006 * Math.sin(phi) * Math.cos(theta),
           1.006 * Math.cos(phi),
           1.006 * Math.sin(phi) * Math.sin(theta)
        ));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lonMat));
    }

    // ── 3. Source nodes (smaller) ──
    const srcVecs = SRC.map(({ lat, lon }) => ll2v(lat, lon, 1.03));
    srcVecs.forEach(pos => {
      const geo = new THREE.SphereGeometry(0.016, 10, 10);
      const mat = new THREE.MeshBasicMaterial({ color: 0xFF4444 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      group.add(mesh);

      const rGeo = new THREE.RingGeometry(0.022, 0.030, 20);
      const rMat = new THREE.MeshBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.38, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.position.copy(pos);
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), pos.clone().normalize());
      group.add(ring);
    });

    // ── 4. Destination nodes (larger, with pulse rings) ──
    const destVecs  = DEST.map(({ lat, lon }) => ll2v(lat, lon, 1.03));
    const destMeshes    = [];
    const destOuterRings = [];

    destVecs.forEach((pos, i) => {
      const normal = pos.clone().normalize();

      // Core sphere
      const cGeo = new THREE.SphereGeometry(0.030, 18, 18);
      const cMat = new THREE.MeshBasicMaterial({ color: 0xE50914 });
      const core = new THREE.Mesh(cGeo, cMat);
      core.position.copy(pos);
      group.add(core);
      destMeshes.push(core);

      // Inner ring
      const iGeo = new THREE.RingGeometry(0.040, 0.054, 30);
      const iMat = new THREE.MeshBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.50, side: THREE.DoubleSide });
      const iRing = new THREE.Mesh(iGeo, iMat);
      iRing.position.copy(pos);
      iRing.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), normal);
      group.add(iRing);

      // Outer pulse ring
      const oGeo = new THREE.RingGeometry(0.058, 0.076, 30);
      const oMat = new THREE.MeshBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.20, side: THREE.DoubleSide });
      const oRing = new THREE.Mesh(oGeo, oMat);
      oRing.position.copy(pos);
      oRing.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), normal);
      group.add(oRing);
      destOuterRings.push({ mat: oMat, phase: i * (Math.PI * 2 / DEST.length) });
    });

    // ── 5. Connection arcs ──
    const arcData = [];
    CONNECTIONS.forEach(([si, di]) => {
      const s   = srcVecs[si].clone();
      const e   = destVecs[di].clone();
      const mid = s.clone().add(e).normalize().multiplyScalar(1.54);
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      const pts   = curve.getPoints(64);
      const geo   = new THREE.BufferGeometry().setFromPoints(pts);
      const mat   = new THREE.LineBasicMaterial({ color: 0xFF3333, transparent: true, opacity: 0.26 });
      group.add(new THREE.Line(geo, mat));
      arcData.push({ mat, destIdx: di, phase: Math.random() * Math.PI * 2 });
    });

    // ── 6. Equatorial accent ──
    const eqGeo = new THREE.TorusGeometry(1.01, 0.002, 6, 120);
    group.add(new THREE.Mesh(eqGeo, new THREE.MeshBasicMaterial({ color: 0xE50914, transparent: true, opacity: 0.16 })));

    // ── Project helper ──
    const project2D = (worldPos) => {
      const ndc = worldPos.clone().project(camera);
      return {
        x: (ndc.x  * 0.5 + 0.5) * mount.clientWidth,
        y: (-ndc.y * 0.5 + 0.5) * mount.clientHeight,
      };
    };

    // ── Animation loop ──
    let rafId, t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.012;

      group.rotation.y += 0.0016;
      const tX = mouseRef.current.gy * 0.24;
      group.rotation.x += (tX - group.rotation.x) * 0.04;

      // Pulse outer rings
      destOuterRings.forEach(({ mat, phase }, i) => {
        const isHov = i === hoveredRef.current;
        mat.opacity = (isHov ? 0.55 : 0.18) + 0.14 * Math.sin(t * 1.4 + phase);
      });

      // Pulse arcs
      arcData.forEach(({ mat, destIdx, phase }) => {
        const isHov = destIdx === hoveredRef.current;
        const base = isHov ? 0.65 : 0.24;
        mat.opacity = base + base * 0.35 * Math.sin(t + phase);
      });

      // Update labels and hover detection
      let newHovered = -1;
      const { cx, cy } = mouseRef.current;

      destVecs.forEach((localPos, i) => {
        const worldPos = localPos.clone().applyMatrix4(group.matrixWorld);
        const viz      = Math.min(1, Math.max(0, (worldPos.z + 0.04) * 2.8));
        const labelEl  = labelRefs.current[i];
        if (!labelEl) return;

        if (viz < 0.01) { labelEl.style.opacity = '0'; return; }

        const { x, y } = project2D(worldPos);
        const { x: ox, y: oy } = DEST[i].popupOffset;

        // Clamp so popup stays within container
        const popW = 170;
        const cw   = mount.clientWidth;
        const rawX = x + ox;
        const safeX = Math.max(4, Math.min(cw - popW - 4, rawX));

        labelEl.style.opacity   = viz.toString();
        labelEl.style.transform = `translate(${safeX}px, ${y + oy}px)`;

        // Hover proximity
        const dx = x - cx, dy = y - cy;
        if (Math.sqrt(dx*dx + dy*dy) < 42 && viz > 0.35) newHovered = i;
      });

      hoveredRef.current = newHovered;

      // Hover: scale dest meshes
      destMeshes.forEach((mesh, i) => {
        const isHov = i === hoveredRef.current;
        const tScale = isHov ? 1.5 : 1.0;
        mesh.scale.x += (tScale - mesh.scale.x) * 0.14;
        mesh.scale.y = mesh.scale.z = mesh.scale.x;
        mesh.material.color.setHex(isHov ? 0xFF2020 : 0xE50914);
      });

      // Hover: style popup cards
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const card = el.querySelector('[data-card]');
        if (!card) return;
        const isHov = i === hoveredRef.current;
        card.style.transform   = `scale(${isHov ? 1.06 : 1.0})`;
        card.style.boxShadow   = isHov
          ? '0 16px 48px rgba(229,9,20,0.42), 0 0 24px rgba(229,9,20,0.22)'
          : '0 6px 28px rgba(229,9,20,0.18)';
        card.style.borderColor = isHov ? 'rgba(229,9,20,0.95)' : 'rgba(229,9,20,0.55)';
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Mouse ──
    const onMouse = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current = {
        gx: (e.clientX / window.innerWidth  - 0.5) * 2,
        gy: (e.clientY / window.innerHeight - 0.5) * 2,
        cx: e.clientX - rect.left,
        cy: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', onMouse);

    // ── Resize ──
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
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
    <div ref={wrapRef} data-testid="globe-canvas" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '480px' }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Floating destination popup labels */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
        {DEST.map((d, i) => (
          <div
            key={i}
            ref={(el) => { labelRefs.current[i] = el; }}
            data-testid={`globe-dest-${i}`}
            style={{
              position: 'absolute', top: 0, left: 0,
              opacity: 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            {/* Floating animation inner wrapper */}
            <div style={{ animation: `globe-float-${i} ${3.2 + i * 0.5}s ease-in-out infinite` }}>
              <div
                data-card="true"
                style={{
                  background: 'rgba(10,10,10,0.93)',
                  border: '1px solid rgba(229,9,20,0.55)',
                  borderRadius: 8,
                  padding: '10px 12px 10px 16px',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: '0 6px 28px rgba(229,9,20,0.18)',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
                  minWidth: 158,
                  maxWidth: 190,
                  position: 'relative',
                  transformOrigin: 'center center',
                }}
              >
                {/* Red left accent stripe */}
                <div style={{
                  position: 'absolute', top: 0, bottom: 0, left: 0, width: 3,
                  background: 'linear-gradient(180deg, #E50914 0%, #FF3B3B 100%)',
                  borderRadius: '8px 0 0 8px',
                }} />
                <div style={{ fontSize: 9.5, fontWeight: 800, color: '#E50914', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2, lineHeight: 1.2 }}>
                  {d.title}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: 8, letterSpacing: '0.04em' }}>
                  {d.sub}
                </div>
                {d.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: bi < d.bullets.length - 1 ? 4 : 0 }}>
                    <span style={{ color: '#E50914', fontSize: 7, marginTop: 1.5, flexShrink: 0, lineHeight: 1 }}>▶</span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.82)', lineHeight: 1.45 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        ${DEST.map((_, i) => `
          @keyframes globe-float-${i} {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(${-5 - i * 1.2}px); }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default GlobeCanvas;
