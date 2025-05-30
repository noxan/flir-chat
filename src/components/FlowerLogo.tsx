interface FlowerLogoProps {
  size?: number
  className?: string
  animate?: boolean
  animationDuration?: string
}

export function FlowerLogo({
  size = 80,
  className = '',
  animate = false,
  animationDuration = '3s',
}: FlowerLogoProps) {
  const petalSize = size * 0.3
  const smallPetalSize = size * 0.25
  const centerSize = size * 0.4
  const radius = size * 0.35

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={animate ? 'animate-spin' : ''}
        style={animate ? { animationDuration } : {}}
      >
        <title>Flir Chat Flower Logo</title>
        {/* Flower petals */}
        {/* Top petal - Pink */}
        <circle
          cx={size / 2}
          cy={size / 2 - radius}
          r={petalSize / 2}
          fill="url(#pinkGradient)"
          opacity="0.8"
        />

        {/* Top-right small petal - Purple */}
        <circle
          cx={size / 2 + radius * 0.7}
          cy={size / 2 - radius * 0.7}
          r={smallPetalSize / 2}
          fill="url(#purpleGradient)"
          opacity="0.7"
        />

        {/* Right petal - Blue */}
        <circle
          cx={size / 2 + radius}
          cy={size / 2}
          r={petalSize / 2}
          fill="url(#blueGradient)"
          opacity="0.8"
        />

        {/* Bottom-right small petal - Green */}
        <circle
          cx={size / 2 + radius * 0.7}
          cy={size / 2 + radius * 0.7}
          r={smallPetalSize / 2}
          fill="url(#greenGradient)"
          opacity="0.7"
        />

        {/* Bottom petal - Yellow */}
        <circle
          cx={size / 2}
          cy={size / 2 + radius}
          r={petalSize / 2}
          fill="url(#yellowGradient)"
          opacity="0.8"
        />

        {/* Bottom-left small petal - Red */}
        <circle
          cx={size / 2 - radius * 0.7}
          cy={size / 2 + radius * 0.7}
          r={smallPetalSize / 2}
          fill="url(#redGradient)"
          opacity="0.7"
        />

        {/* Left petal - Indigo */}
        <circle
          cx={size / 2 - radius}
          cy={size / 2}
          r={petalSize / 2}
          fill="url(#indigoGradient)"
          opacity="0.8"
        />

        {/* Top-left small petal - Orange */}
        <circle
          cx={size / 2 - radius * 0.7}
          cy={size / 2 - radius * 0.7}
          r={smallPetalSize / 2}
          fill="url(#orangeGradient)"
          opacity="0.7"
        />

        {/* Center */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={centerSize / 2}
          fill="url(#sandGradient)"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <linearGradient
            id="purpleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient
            id="greenGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          <linearGradient
            id="yellowGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>

          <linearGradient
            id="indigoGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient
            id="orangeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8e6c8" />
            <stop offset="100%" stopColor="#edc478" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
