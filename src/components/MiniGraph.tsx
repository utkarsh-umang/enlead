import { motion } from 'motion/react';
import { useState } from 'react';

interface MiniGraphProps {
  data: number[];
  color?: string;
  delay?: number;
  label?: string;
  naturalCurve?: boolean;
}

export function MiniGraph({ data, color = '#00D9FF', delay = 0, label = 'Value', naturalCurve = false }: MiniGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  // Generate more natural curve points
  const generatePoints = () => {
    if (naturalCurve) {
      // Add some randomness for a more natural look
      return data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        // Add slight variation
        const variation = Math.sin(index * 0.5) * 2;
        return `${x},${Math.max(0, Math.min(100, y + variation))}`;
      }).join(' ');
    } else {
      return data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      }).join(' ');
    }
  };

  const points = generatePoints();

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Find closest data point
    const pointIndex = Math.round(((x / rect.width) * (data.length - 1)));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, pointIndex));
    
    setHoveredIndex(clampedIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="relative w-full h-16 mt-2">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient Fill */}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={hoveredIndex !== null ? "0.5" : "0.3"} />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Area under the line */}
        <motion.polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay }}
        />

        {/* Line */}
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={hoveredIndex !== null ? "3" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
          }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 ${hoveredIndex !== null ? 8 : 4}px ${color})`,
            transition: 'all 0.3s ease',
          }}
        />

        {/* Animated dots */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const yBase = 100 - ((value - min) / range) * 100;
          const y = naturalCurve ? Math.max(0, Math.min(100, yBase + Math.sin(index * 0.5) * 2)) : yBase;
          const isHovered = hoveredIndex === index;

          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r={isHovered ? 3.5 : 1.5}
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1.3 : 1, 
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ 
                duration: 0.3, 
                delay: delay + 1.5 + index * 0.05,
              }}
              style={{
                filter: `drop-shadow(0 0 ${isHovered ? 10 : 3}px ${color})`,
              }}
            />
          );
        })}

        {/* Pulsing highlight on hover */}
        {hoveredIndex !== null && (
          <motion.circle
            cx={(hoveredIndex / (data.length - 1)) * 100}
            cy={100 - ((data[hoveredIndex] - min) / range) * 100}
            r={6}
            fill="none"
            stroke={color}
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </svg>
    </div>
  );
}
