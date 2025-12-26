import { useState } from "react";
import { habits } from "../data/mockData";
import HabitGrid from "./HabitGrid";
import StatsCards from "./StatsCards";
import SidePanel from "./SidePanel";
import ProgressCharts from "./ProgressCharts";

export default function Dashboard() {
  const [theme, setTheme] = useState("dark");
  const [range, setRange] = useState("week");

  const days =
    range === "week"
      ? Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`)
      : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  const [grid, setGrid] = useState(
    habits.map(() => days.map(() => false))
  );

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    setGrid(
      habits.map(() =>
        Array.from(
          { length: newRange === "week" ? 7 : 30 },
          () => false
        )
      )
    );
  };

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitData, setHabitData] = useState([]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className="
          min-h-screen p-10 transition-colors duration-500
          bg-gradient-to-b from-cyan-100 via-sky-100 to-blue-50
          dark:bg-gradient-to-b dark:from-slate-950 dark:via-sky-950 dark:to-slate-900
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-sky-900 dark:text-sky-100">
            DAY ZERO
          </h1>

          {/* CONTROLS */}
          <div className="flex items-center gap-4">
            {/* WEEK / MONTH */}
            <div className="flex bg-white/70 dark:bg-white/10 rounded-xl p-1 backdrop-blur border border-white/30">
              <button
                onClick={() => handleRangeChange("week")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    range === "week"
                      ? "bg-cyan-500 text-white"
                      : "text-sky-700 dark:text-sky-200 hover:bg-white/40"
                  }
                `}
              >
                Week
              </button>

              <button
                onClick={() => handleRangeChange("month")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    range === "month"
                      ? "bg-cyan-500 text-white"
                      : "text-sky-700 dark:text-sky-200 hover:bg-white/40"
                  }
                `}
              >
                Month
              </button>
            </div>

            {/* THEME TOGGLE (Naruto / Sauske) */}
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="
                h-10 w-10 flex items-center justify-center rounded-full
                bg-white/70 dark:bg-white/10
                hover:scale-110 transition
                backdrop-blur border border-white/30
              "
            >
              <img
                src={
                  theme === "dark"
                    ? "/avatars/naruto.jpg"
                    : "/avatars/sauske.png"
                }
                alt="theme icon"
                className="w-6 h-6 object-cover rounded-full"
              />
            </button>
          </div>
        </div>

        {/* STATS */}
        <StatsCards grid={grid} />

        {/* MAIN */}
        <div className="grid grid-cols-[3fr_1fr] gap-6">
          <HabitGrid
            days={days}
            grid={grid}
            setGrid={setGrid}
            onSelectHabit={(habit, data) => {
              setSelectedHabit(habit);
              setHabitData(data);
            }}
          />

          <SidePanel habit={selectedHabit} data={habitData} grid={grid} />
        </div>

        {/* GRAPH */}
        <ProgressCharts grid={grid} />
      </div>
    </div>
  );
}
