import { VoteButtonProps } from '@/types'

export function VoteButton({ disabled = false, isVoted = false }: VoteButtonProps) {
  return (
    <button
      disabled={disabled}
      className="border-none rounded-full text-xs font-black cursor-pointer transition-all duration-300"
      style={{
        background: isVoted 
          ? 'linear-gradient(45deg, #00D084, #00B571)' 
          : 'linear-gradient(45deg, #FFC72C, #FFD700)',
        color: isVoted ? 'white' : '#DA020E',
        width: '60px',
        height: '28px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxShadow: isVoted 
          ? '0 4px 12px rgba(0, 208, 132, 0.4)' 
          : '0 4px 12px rgba(255, 199, 44, 0.4)',
        transform: disabled ? 'none' : 'scale(1)',
      }}
    >
      {isVoted ? '✓ Voted' : 'Vote'}
    </button>
  )
}
