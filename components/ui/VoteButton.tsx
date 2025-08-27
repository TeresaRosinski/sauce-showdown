import { VoteButtonProps } from '@/types'

export function VoteButton({ onClick, disabled = false, isVoted = false }: VoteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-none rounded text-xs font-semibold cursor-pointer h-5 w-16 flex items-center justify-center transition-colors ${
        isVoted 
          ? 'bg-green-600 text-white hover:bg-green-700' 
          : 'bg-gray-500 text-white hover:bg-gray-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isVoted ? '✓ Voted' : 'Vote'}
    </button>
  )
}
