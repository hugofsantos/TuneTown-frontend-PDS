import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getTuneScore } from "../services/auth/getTuneScore";
import { TbMusicHeart } from "react-icons/tb";

interface TuneScoreButtonProps {
  userId1: string;
  userId2: string;
  className?: string;
}

export const TuneScoreButton: React.FC<TuneScoreButtonProps> = ({
  userId1,
  userId2,
  className = "",
}) => {
  const [loading, setLoading] = useState(false);
  const [tuneScore, setTuneScore] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    const response = await getTuneScore(userId1, userId2);
    if (response) {
      setTuneScore(response.score);
      setMessage(response.message);
    }
    setLoading(false);
  };

  const tooltipText =
    tuneScore !== null ? message || `${tuneScore}% de compatibilidade` : "";

  return (
    <div className="inline-block">
      <button
        ref={btnRef}
        onClick={handleClick}
        disabled={loading}
        onMouseEnter={() => {
          setShowTooltip(true);
          // position right away
          if (btnRef.current) {
            const r = btnRef.current.getBoundingClientRect();
            setPos({ x: r.left + r.width / 2, y: r.top });
          }
        }}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => {
          setShowTooltip(true);
          if (btnRef.current) {
            const r = btnRef.current.getBoundingClientRect();
            setPos({ x: r.left + r.width / 2, y: r.top });
          }
        }}
        onBlur={() => setShowTooltip(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-sm border border-theme 
        bg-transparent text-theme font-semibold transition-all duration-200
        hover:bg-theme hover:text-contrast hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
      >
        <TbMusicHeart className={`text-xl ${loading ? "animate-pulse" : ""}`} />
        <span>
          {loading
            ? "Calculando..."
            : tuneScore !== null
            ? `${tuneScore}% Match`
            : "Ver TuneScore"}
        </span>
      </button>
      {showTooltip &&
        tuneScore !== null &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999]"
            style={{ left: pos.x, top: pos.y }}
          >
            {/* Position so the bottom of the tooltip box aligns to the button top */}
            <div className="relative -translate-x-1/2 -translate-y-full">
              <div className="rounded-md bg-fume text-contrast border border-stroke px-3 py-2 text-sm shadow-lg w-64 max-w-[16rem] break-words whitespace-normal">
                {tooltipText}
              </div>
              {/* Arrow */}
              <div className="absolute left-1/2 top-full -translate-x-1/2 w-2 h-2 bg-fume rotate-45 border-l border-t border-stroke" />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
