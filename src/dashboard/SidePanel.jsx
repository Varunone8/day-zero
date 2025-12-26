export default function SidePanel({ habit, data, grid }) {
  const total = grid.flat().length;
  const done = grid.flat().filter(Boolean).length;
  const overall = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="
      bg-cyan-50/80 dark:bg-white/10
      backdrop-blur-xl border border-cyan-200/50 dark:border-white/20
      rounded-2xl shadow-xl p-6
    ">
      <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-100 mb-4">
        {habit || "Overall Progress"}
      </h3>

      <div className="w-full h-3 bg-cyan-200 dark:bg-slate-700 rounded">
        <div
          className="h-3 bg-cyan-500 rounded"
          style={{ width: `${overall}%` }}
        />
      </div>

      <p className="mt-3 text-sky-700 dark:text-sky-300 font-medium">
        {overall}%
      </p>
    </div>
  );
}
