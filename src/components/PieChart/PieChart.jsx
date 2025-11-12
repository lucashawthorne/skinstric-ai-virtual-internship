import React from "react";
import "./PieChart.css";

const PieChart = ({ percentage = 0 }) => {
  const radius = 140;
  const stroke = 18;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const safePercentage = Math.max(0, Math.min(100, percentage));
  const strokeDashoffset =
    circumference - (safePercentage / 100) * circumference;

  // The trick: we expand the viewBox slightly so the whole stroke is visible.
  const size = radius * 2 + stroke * 2;

  return (
    <div className="piechart__container">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={stroke}
        />

        {/* Foreground fill circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          fill="none"
          stroke="black"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="piechart__fill"
        />

        {/* Center percentage text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="piechart__text"
        >
          {safePercentage}%
        </text>
      </svg>
    </div>
  );
};

export default PieChart;
