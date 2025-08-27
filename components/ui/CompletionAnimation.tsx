import { useEffect, useState } from 'react'

interface CompletionAnimationProps {
  show: boolean
}

export function CompletionAnimation({ show }: CompletionAnimationProps) {
  const [animate, setAnimate] = useState(false)
  const [confettiPositions, setConfettiPositions] = useState<Array<{left: string, top: string, delay: string, duration: string, emoji: string}>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Generate confetti positions only on client side
    const positions = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${1 + Math.random() * 2}s`,
      emoji: ['🎉', '🎊', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)]
    }))
    setConfettiPositions(positions)
  }, [])

  useEffect(() => {
    if (show) {
      setAnimate(true)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
      <div className="text-center px-4">
        {/* Celebration Animation */}
        <div className={`transition-all duration-1000 ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          {/* Trophy/Success Icon */}
          <div className="text-4xl mb-3 animate-bounce">
            🏆
          </div>
          
          {/* Success Message */}
          <h1 className="text-white text-lg font-bold mb-2 animate-pulse">
            Voting Complete!
          </h1>
          
          <p className="text-white text-sm mb-4">
            Great choices! Let's see the results...
          </p>
          
          {/* Animated Checkmarks */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="text-green-500 text-xl animate-ping">✓</div>
            <div className="text-green-500 text-xl animate-ping" style={{ animationDelay: '0.2s' }}>✓</div>
            <div className="text-green-500 text-xl animate-ping" style={{ animationDelay: '0.4s' }}>✓</div>
            <div className="text-green-500 text-xl animate-ping" style={{ animationDelay: '0.6s' }}>✓</div>
          </div>
          
          {/* Loading Animation */}
          <div className="text-white text-sm">
            Preparing results
            <span className="animate-pulse">...</span>
          </div>
        </div>
        
        {/* Confetti Effect - smaller and contained */}
        {isClient && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {confettiPositions.map((position, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: position.left,
                  top: position.top,
                  animationDelay: position.delay,
                  animationDuration: position.duration,
                }}
              >
                <span className="text-lg">
                  {position.emoji}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
