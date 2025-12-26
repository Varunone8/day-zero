import { useState } from "react";

export default function ProgressCharts({ grid }) {
  if (!grid || grid.length === 0) return null;

  const days = grid[0].length;
  const habits = grid.length;

  const values = Array.from({ length: days }, (_, d) => {
    let done = 0;
    for (let h = 0; h < habits; h++) {
      if (grid[h][d]) done++;
    }
    return Math.round((done / habits) * 100);
  });

  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const w = 700;
  const h = 220;
  const p = 30;

  const points = values.map((v, i) => {
    const x = p + (i / (days - 1)) * (w - p * 2);
    const y = h - p - (v / 100) * (h - p * 2);
    return { x, y, value: v, day: i + 1 };
  });

  const linePath =
    "M " +
    points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");

  const areaPath =
    `${linePath} L ${points[points.length - 1].x} ${h - p} L ${points[0].x} ${h - p} Z`;

  const [hover, setHover] = useState(null);

  return (
    <div className="
      relative mt-10 p-6 rounded-2xl
      bg-cyan-50/80 dark:bg-white/10
      backdrop-blur-xl border border-cyan-200/50 dark:border-white/20
      shadow-xl
    ">
      <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-100 mb-4">
        Productivity Overview
      </h2>

      {/*  GRAPH */}
      <svg viewBox={`0 0 ${w} ${h}`} width="100%">
        <defs>
          <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = h - p - (v / 100) * (h - p * 2);
          return (
            <line
              key={v}
              x1={p}
              x2={w - p}
              y1={y}
              y2={y}
              stroke="rgba(14,165,233,0.2)"
              strokeDasharray="4"
            />
          );
        })}

        {/* area */}
        <path d={areaPath} fill="url(#waveFill)" />
        {points.map((pt, i) => {
  const isActive = hover && hover.day === pt.day;

  return (
    <circle
      key={i}
      cx={pt.x}
      cy={pt.y}
      r={
        isActive
          ? (days > 14 ? 5 : 7)
          : (days > 14 ? 3 : 5)
      }
      fill="#06b6d4"
      fillOpacity={isActive ? 1 : 0.7}
      style={{ transition: "all 0.2s ease" }}
      onMouseEnter={() => setHover(pt)}
      onMouseLeave={() => setHover(null)}
    />
  );
})}


      </svg>

      {/* 🧾 TOOLTIP */}
      {hover && (
        <div
          className="
            absolute px-3 py-2 rounded-lg text-sm
            bg-sky-900 text-white
            pointer-events-none
            shadow-lg
          "
          style={{
            left: `${(hover.x / w) * 100}%`,
            top: `${(hover.y / h) * 100}%`,
            transform: "translate(-50%, -120%)"
          }}
        >
          Day {hover.day} = {hover.value}%
        </div>
      )}

      {/* 📊 MINI STATS */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Average" value={`${avg}%`} />
        <Stat label="Best Day" value={`${max}%`} />
        <Stat label="Lowest Day" value={`${min}%`} />
      </div>

      {/* animation */}
      <style>
        {`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}
      </style>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="
      rounded-xl p-4 text-center
      bg-white/70 dark:bg-white/10
      border border-white/30
    ">
      <p className="text-sm text-sky-600 dark:text-sky-300">
        {label}
      </p>
      <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100">
        {value}
      </h3>
    </div>
  );
}
