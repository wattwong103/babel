"use client";

interface ProgressBarProps {
  percent: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  percent,
  color = "bg-babel-learned",
  height = "h-2",
  showLabel = false,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div
        className={`w-full ${height} rounded-full bg-babel-border overflow-hidden`}
      >
        <div
          className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-babel-text-secondary mt-1">
          {percent}% complete
        </p>
      )}
    </div>
  );
}
