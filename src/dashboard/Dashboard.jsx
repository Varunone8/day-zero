import { useState, useEffect } from "react";
import { habits } from "../data/mockData";
import HabitGrid from "./HabitGrid";
import StatsCards from "./StatsCards";
import SidePanel from "./SidePanel";
import ProgressCharts from "./ProgressCharts";

import OceanBackground from "../components/OceanBackground";
import FocusSection from "../components/FocusSection";
import useInView from "../hooks/useInView";

export default function Dashboard() {
  /* ---------- LOAD FROM localStorage ---------- */
  const savedTheme = localStorage.getItem("theme");
  const savedRange = localStorage.getItem("range");
  const savedGrid = JSON.parse(localStorage.getItem("grid"));

  const [theme, setTheme] = useState(savedTheme || "dark");
  const [range, setRange] = useState(savedRange || "week");

  const days =
    range === "week"
      ? Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`)
      : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  const [grid, setGrid] = useState(
    savedGrid ||
      habits.map(() =>
        Array.from(
          { length: range === "week" ? 7 : 30 },
          () => false
        )
      )
  );

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitData, setHabitData] = useState([]);

  /* ---------- SAVE TO localStorage ---------- */
  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  useEffect(() => localStorage.setItem("range", range), [range]);
  useEffect(() => localStorage.setItem("grid", JSON.stringify(grid)), [grid]);

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

  /* ---------- ONLY STATS GET FOCUS ---------- */
  const [statsRef, statsInView] = useInView(0.6);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* 🌊 BACKGROUND */}
      <OceanBackground theme={theme} />

      <div className="min-h-screen p-10">
        {/* ---------- HEADER ---------- */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-sky-900 dark:text-sky-100">
            DAY ZERO
          </h1>

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

            {/* THEME TOGGLE */}
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="
                h-12 w-12 flex items-center justify-center rounded-full
                bg-white/70 dark:bg-white/10
                hover:scale-110 transition
                backdrop-blur border border-white/30
              "
            >
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={
                    theme === "dark"
                      ? "/avatars/naruto.jpg"
                      : "/avatars/sauske.png"
                  }
                  alt="theme avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </div>
        </div>

        {/* ---------- STATS (FOCUS ONLY HERE) ---------- */}
        <div ref={statsRef}>
          <FocusSection active={statsInView}>
            <StatsCards grid={grid} />
          </FocusSection>
        </div>

        {/* ---------- MAIN CONTENT (NO BLUR) ---------- */}
        <div className="grid grid-cols-[3fr_1fr] gap-6 mt-10">
          {/* LEFT */}
          <div>
            <HabitGrid
              days={days}
              grid={grid}
              setGrid={setGrid}
              onSelectHabit={(habit, data) => {
                setSelectedHabit(habit);
                setHabitData(data);
              }}
            />

            <ProgressCharts grid={grid} />
          </div>

          {/* RIGHT */}
          <div>
            <SidePanel
              habit={selectedHabit}
              data={habitData}
              grid={grid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
