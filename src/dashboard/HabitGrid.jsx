import React from "react";
import { habits } from "../data/mockData";

export default function HabitGrid({ days, grid, setGrid, onSelectHabit }) {
  const toggle = (h, d) => {
    const copy = grid.map((row) => [...row]);
    copy[h][d] = !copy[h][d];
    setGrid(copy);
    onSelectHabit(habits[h], copy[h]);
  };

  return (
    <div className="
      bg-cyan-50/80 dark:bg-white/10
      backdrop-blur-xl border border-cyan-200/50 dark:border-white/20
      rounded-2xl shadow-xl p-6 overflow-auto
    ">
      <div
        className="grid gap-3 items-center"
        style={{
          gridTemplateColumns: `220px repeat(${days.length}, 52px)`
        }}
      >
        <div className="font-semibold text-sky-900 dark:text-teal-200">
          Habits
        </div>

        {days.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-semibold text-sky-600 dark:text-teal-300"
          >
            {day}
          </div>
        ))}

        {habits.map((habit, h) => (
          <React.Fragment key={habit}>
            <div className="text-sky-900 dark:text-teal-100 text-sm">
              {habit}
            </div>

            {days.map((_, d) => (
              <div
                key={`${h}-${d}`}
                onClick={() => toggle(h, d)}
                className={`
                  h-12 w-12 rounded-lg cursor-pointer
                  flex items-center justify-center
                  transition-all duration-200 ease-out
                  hover:scale-110 active:scale-95
                  ${
                    grid[h][d]
                      ? "bg-cyan-500 dark:bg-teal-400 text-white dark:text-slate-900 shadow-lg"
                      : "bg-cyan-100 dark:bg-slate-800/60 hover:bg-cyan-200 dark:hover:bg-slate-700/60"
                  }
                `}
              >
                {grid[h][d] && "✓"}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
