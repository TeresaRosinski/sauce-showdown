import Image from 'next/image'
import { Sauce, VoteSide } from '@/types'
import { VoteButton } from '@/components/common/VoteButton'

interface SauceDisplayProps {
  sauce: Sauce
  side: "left" | "right"
  isSelected: boolean
  onVote: (side: "left" | "right") => void
  hasVoted?: boolean
}

export function SauceDisplay({ sauce, side, isSelected, onVote, hasVoted = false }: SauceDisplayProps) {
  const textColor = side === "left" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"
  
  // Enhanced styling for selected/disabled state
  const getBorderColor = () => {
    if (!isSelected) return '#E5E5E5'
    return side === 'left' ? '#000000' : '#FFC72C'  // Red for left, Gold for right
  }

  const getShadowColor = () => {
    if (!isSelected) return '0 4px 12px rgba(0,0,0,0.1)'
    return side === 'left' 
      ? '0 6px 20px rgba(0, 0, 0, 0.3)'    // Red shadow for left
      : '0 6px 20px rgba(255, 199, 44, 0.3)'  // Gold shadow for right
  }

  const containerStyle: React.CSSProperties = {
    width: '120px',
    backgroundColor: 'transparent',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: hasVoted && !isSelected ? 0.3 : 1,
    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: hasVoted ? 'not-allowed' : 'pointer'
  }

  const infoSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'top',
    justifyContent: 'center',
    backgroundColor: '#F7ECDE',
    borderRadius: '12px',
    border: hasVoted ? `3px solid ${getBorderColor()}` : 'none',
    width: '130px',
    padding: '2px',
    height: '160px',
    boxShadow: getShadowColor()
  }

  const innerContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
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
      style={containerStyle} 
      onClick={handleClick} 
      className={`sauce-card ${hasVoted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <div style={{ marginBottom: '0px' }}>
        <Image
          src={sauce.personImageUrl}
          alt="Influencer"
          width={50}
          height={50}
          className={`${side === "left" ? 'border-red-400' : 'border-yellow-400'}`}
          style={{ objectFit: 'contain', width: '50px', height: '50px',display: 'block' }}
        />
      </div>

      {/* Text Info Section */}
      <div style={infoSectionStyle}>
        <div style={innerContentStyle}>
          <Image
            src={sauce.imageUrl}
            alt="SAUCE"
            width={80}
            height={80}
            className={`${side === "left" ? 'border-red-400' : 'border-yellow-400'}`}
            style={{ 
              objectFit: 'cover', 
              width: '90px', 
              height: '90px', 
              marginBottom: '8px',
            }}
          />

          <div 
            className="text-gray-600 font-semibold leading-tight" 
            style={{ 
              marginBottom: '2px', 
              textAlign: 'center', 
              fontSize: '12px',
              width: '100%'
            }}
          >
            {sauce.influencer_name || 'Creator'}
          </div>

          <div 
            className="text-red-600 font-black uppercase leading-tight" 
            style={{
              fontSize: '16px',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              width: '100%',
              //wordWrap: 'break-word'
            }}
          >
            {sauce.sauce_name}
          </div>
        </div>
      </div>
    </div>
  )
}