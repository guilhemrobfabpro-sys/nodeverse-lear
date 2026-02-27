import { motion } from 'framer-motion';

interface AnimatedNodesProps {
  className?: string;
}

export function AnimatedNodes({ className = '' }: AnimatedNodesProps) {
  const nodes = [
    { x: 120, y: 100, label: '⚡ Trigger', color: 'accent' },
    { x: 320, y: 75, label: '🌐 HTTP', color: 'primary' },
    { x: 520, y: 110, label: '🤖 AI', color: 'secondary' },
    { x: 720, y: 80, label: '💬 Slack', color: 'primary' },
    { x: 180, y: 240, label: '📧 Gmail', color: 'secondary' },
    { x: 420, y: 260, label: '🔀 IF', color: 'accent' },
    { x: 640, y: 230, label: '📊 Sheets', color: 'primary' },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [2, 5],
  ];

  const colorMap: Record<string, string> = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
  };

  return (
    <svg className={`w-full h-full ${className}`} viewBox="0 0 840 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
          <stop offset="100%" stopColor="hsl(var(--secondary) / 0.3)" />
        </linearGradient>
      </defs>

      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <g key={i}>
          <motion.line
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: i * 0.15 }}
          />
          {/* Data flow particles */}
          <motion.circle
            r="4"
            fill="hsl(var(--primary))"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              cx: [nodes[from].x, nodes[to].x],
              cy: [nodes[from].y, nodes[to].y],
            }}
            transition={{ duration: 2.5, delay: 1.5 + i * 0.4, repeat: Infinity, repeatDelay: 4 }}
          />
          <motion.circle
            r="2"
            fill="hsl(var(--secondary))"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0.6, 0],
              cx: [nodes[from].x, nodes[to].x],
              cy: [nodes[from].y, nodes[to].y],
            }}
            transition={{ duration: 2, delay: 3 + i * 0.5, repeat: Infinity, repeatDelay: 5 }}
          />
        </g>
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const hslColor = `hsl(${colorMap[node.color]} / `;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.12, type: 'spring' }}
          >
            {/* Glow behind */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill={`${hslColor}0.08)`}
              animate={{ r: [28, 34, 28], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
            
            <rect
              x={node.x - 45}
              y={node.y - 22}
              width="90"
              height="44"
              rx="10"
              fill={`${hslColor}0.12)`}
              stroke={`${hslColor}0.35)`}
              strokeWidth="1.5"
            />
            
            <motion.rect
              x={node.x - 45}
              y={node.y - 22}
              width="90"
              height="44"
              rx="10"
              fill="transparent"
              stroke={`${hslColor}0.5)`}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontFamily="Space Grotesk"
              fontWeight="600"
            >
              {node.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
