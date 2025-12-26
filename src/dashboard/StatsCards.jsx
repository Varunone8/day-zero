export default function StatsCards({ grid }) {
  const total = grid.flat().length;
  const done = grid.flat().filter(Boolean).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {[
        { label: "Progress", value: `${percent}%` },
        { label: "Completed", value: done },
        { label: "Remaining", value: total - done },
      ].map((card) => (
        <div
          key={card.label}
          className="
            bg-cyan-50/80 dark:bg-white/10
            backdrop-blur-xl border border-cyan-200/50 dark:border-white/20
            rounded-2xl shadow-xl p-6
          "
        >
          <p className="text-sky-600 dark:text-sky-300 text-sm">
            {card.label}
          </p>
          <h2 className="text-3xl font-bold text-sky-900 dark:text-sky-100 mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
