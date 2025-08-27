import Image from 'next/image'
import { Sauce, VoteSide } from '@/types'
import { VoteButton } from '@/components/ui/VoteButton'

interface SauceDisplayProps {
  sauce: Sauce
  side: "left" | "right"
  isSelected: boolean
  onVote: (side: "left" | "right") => void
  hasVoted?: boolean
}

export function SauceDisplay({ sauce, side, isSelected, onVote, hasVoted = false }: SauceDisplayProps) {
  const backgroundColor = side === "left" ? "#000000" : "#F4B52A"
  const textColor = side === "left" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"
  
  // Enhanced styling for selected/disabled state
  const containerStyle = {
    backgroundColor,
    borderRadius: "8px",
    border: `4px solid ${isSelected ? '#22c55e' : backgroundColor}`, // Green border when selected
    height: "142px",
    padding: "4px",
    display: "flex",
    flexDirection: "column" as const,
    opacity: hasVoted && !isSelected ? 0.5 : isSelected ? 1 : 0.9, // Dimmed if voted but not this option
    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.2s ease-in-out',
    cursor: hasVoted ? 'not-allowed' : 'pointer',
  }

  const handleClick = () => {
    if (!hasVoted) {
      onVote(side)
    }
  }

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasVoted) {
      onVote(side)
    }
  }

  return (
    <div
      className="w-full hover:opacity-95"
      style={containerStyle}
    >
      {/* Image Container - Clickable */}
      <div
        onClick={handleClick}
        className={`flex bg-white rounded overflow-hidden ${hasVoted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        style={{
          height: "112px",
          paddingTop: "4px",
        }}
      >
        {/* Person Image */}
        <div className="w-3/5 flex items-end">
          <Image
            src={sauce.personImageUrl}
            alt="Person"
            width={100}
            height={100}
            className="w-full h-full object-contain object-bottom"
          />
        </div>
        
        {/* Sauce Image */}
        <div className="w-2/5 flex items-end">
          <Image
            src={sauce.imageUrl}
            alt={sauce.name}
            width={60}
            height={100}
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* Description and Vote Button */}
      <div
        className="flex items-center justify-between mt-2"
        style={{
          height: "24px",
          paddingLeft: "12px",
          paddingRight: "4px",
        }}
      >
        <span
          onClick={handleClick}
          className={`text-xs whitespace-nowrap overflow-hidden text-ellipsis ${hasVoted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ color: textColor }}
        >
          {sauce.description}
        </span>
        
        <VoteButton 
          onClick={handleVoteClick} 
          isVoted={isSelected} 
          disabled={hasVoted}
        />
      </div>
    </div>
  )
}
