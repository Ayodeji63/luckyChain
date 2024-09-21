import React from "react";

const GameButton = ({ number, color }) => {
  const baseColor =
    {
      red: "from-red-600 to-red-700",
      blue: "from-blue-600 to-blue-700",
    }[color] || "from-blue-600 to-blue-700";

  const glowColor =
    {
      red: "bg-red-500",
      blue: "bg-blue-500",
    }[color] || "bg-blue-500";

  return (
    <div className="relative w-20 h-20">
      {/* Flame effect background */}
      <div
        className={`absolute inset-0 ${glowColor} opacity-20 blur-xl rounded-2xl`}
      ></div>

      {/* Main button */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${baseColor} rounded-2xl shadow-lg
                         flex items-center justify-center text-4xl font-bold text-white
                         border-t border-t-white/20 border-b-4 border-b-black/40`}
      >
        <span className="relative z-10">{number}</span>
      </div>

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
    </div>
  );
};

export default GameButton;
