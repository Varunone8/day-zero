export default function ProgressCharts({ grid }) {
  if (!grid.length) return null;

  const daysCount = grid[0].length;

  const daily = Array.from({ length: daysCount }, (_, d) => {
    const done = grid.filter((h) => h[d]).length;
    return Math.round((done / grid.length) * 100);
  });

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 mt-8">
      <h3 className="text-sky-200 font-semibold mb-4">
        Weekly Flow
      </h3>

      <div className="flex items-end gap-4 h-40">
        {daily.map((p, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-8 rounded bg-gradient-to-t from-cyan-600 to-teal-400"
              style={{ height: `${p}%` }}
            />
            <span className="text-xs text-sky-300 mt-2">
              {p}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
