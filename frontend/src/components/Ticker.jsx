import { cn } from "@/lib/utils";
import { FaCircle, FaStar } from "react-icons/fa";

const items = [
  'In-Country Representation',
  'AI Student Analytics',
  'Predictive Lead Scoring',
  'Paid Media & Performance',
  'CRM & Marketing Automation',
  'Social Media Strategy',
  'UI/UX Conversion Design',
  'Data-Driven Enrolment',
];

const Ticker = () => {
  const all = [...items, ...items];

  return (
    <div
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderTop: '2px solid rgb(255, 0, 0)',
        borderBottom: '2px solid rgb(255, 0, 0)',
        position: 'relative',
      }}
      data-testid="ticker-bar"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #ffffff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #ffffff, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className={cn("ticker-track")}>
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: "0px 15px",
              gap: 20,
              background: i % 2 === 0 ? '#f4f4f4' : '#f0d4d4',
              height: 60
            }}
          >
            {/* Custom badge icons */}
           <div className="">
             {i % 2 === 0 ? (
              // Ribbon badge
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="6" fill="#e50914"/>
                <rect x="5" y="13" width="2.5" height="4" rx="1" fill="#e50914"/>
                <rect x="10.5" y="13" width="2.5" height="4" rx="1" fill="#e50914"/>
                <circle cx="9" cy="7" r="3" fill="#fff"/>
              </svg>
            ) : (
              // Shield badge
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M8 1L15 4V8C15 13 8 17 8 17C8 17 1 13 1 8V4L8 1Z" fill="#000"/>
                <path d="M8 4V13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="2" fill="#fff"/>
              </svg>
            )}
           </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: i % 2 === 0 ? '#000000' : '#080808',
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
