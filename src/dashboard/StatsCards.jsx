import { useEffect, useState } from "react";

export default function StatsCards({ grid }) {
  const totalDays = grid[0]?.length || 0;
  const totalHabits = grid.length;

  let completed = 0;
  grid.forEach(row =>
    row.forEach(cell => {
      if (cell) completed++;
    })
  );

  const total = totalDays * totalHabits;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 🔢 animated counters
  const [countCompleted, setCountCompleted] = useState(0);
  const [countRemaining, setCountRemaining] = useState(0);
  const [countPercent, setCountPercent] = useState(0);

  useEffect(() => {
    animateCounter(setCountCompleted, completed, 600);
    animateCounter(setCountRemaining, total - completed, 600);
    animateCounter(setCountPercent, percentage, 800);
  }, [completed, total, percentage]);

  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      <Card
        title="Completed"
        value={countCompleted}
        suffix=""
      />
      <Card
        title="Remaining"
        value={countRemaining}
        suffix=""
      />
      <Card
        title="Progress"
        value={countPercent}
        suffix="%"
      />
    </div>
  );
}

/* ---------------- CARD ---------------- */

function Card({ title, value, suffix }) {
  return (
    <div
      className="
        rounded-2xl p-6 text-center
        bg-white/70 dark:bg-white/10
        border border-white/30
        backdrop-blur-xl
        shadow-xl
        transition-transform duration-300
        hover:scale-[1.03]
      "
    >
      <p className="text-sm text-sky-600 dark:text-sky-300 mb-1">
        {title}
      </p>
      <h2 className="text-4xl font-bold text-sky-900 dark:text-sky-100">
        {value}{suffix}
      </h2>
    </div>
  );
}

/* ---------------- COUNTER LOGIC ---------------- */

function animateCounter(setter, target, duration) {
  let start = 0;
  const stepTime = Math.max(duration / target, 20);

  const timer = setInterval(() => {
    start += 1;
    setter(start);
    if (start >= target) clearInterval(timer);
  }, stepTime);
}
