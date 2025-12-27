export default function OceanBackground({ theme }) {
  return (
    <>
      {/* 🌊 Ocean Video */}
      <video
        className="fixed inset-0 -z-20 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={
          theme === "dark"
            ? "/ocean/ocean-dark.mp4"
            : "/ocean/ocean-light.mp4"
        }
        style={{
          opacity: theme === "dark" ? 0.99 : 0.09,
          filter:
            theme === "dark"
              ? "blur(2px) brightness(0.6)"
              : "blur(3px) brightness(1.1)",
        }}
      />

      {/* 🎨 Overlay for readability */}
      <div
        className={`
          fixed inset-0 -z-10
          ${theme === "dark"
            ? "bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90"
            : "bg-gradient-to-b from-cyan-100/80 via-sky-100/70 to-blue-50/90"}
        `}
      />
    </>
  );
}
