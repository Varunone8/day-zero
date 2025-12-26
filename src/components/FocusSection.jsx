export default function FocusSection({ active, children }) {
  return (
    <div
      className={`
        transition-all duration-700 ease-out
        ${active
          ? "opacity-100 scale-100"
          : "opacity-80 scale-[0.97]"}
      `}
    >
      {children}
    </div>
  );
}
