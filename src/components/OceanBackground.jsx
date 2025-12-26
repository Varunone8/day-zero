export default function OceanBackground({ theme }) {
  return (
    <div
      className={`
        fixed inset-0 -z-10 transition-colors duration-700
        ${theme === "dark"
          ? "bg-gradient-to-b from-slate-950 via-sky-950 to-slate-900"
          : "bg-gradient-to-b from-cyan-100 via-sky-100 to-blue-50"}
      `}
    />
  );
}
