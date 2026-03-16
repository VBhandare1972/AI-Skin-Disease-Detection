function GlassCard({ children }) {
  return (
    <div className="
    bg-white/40
    backdrop-blur-xl
    border border-white/30
    shadow-[0_10px_40px_rgba(0,0,0,0.15)]
    rounded-3xl
    p-10
    transition
    hover:scale-[1.02]
    hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]
    ">
      {children}
    </div>
  );
}

export default GlassCard;