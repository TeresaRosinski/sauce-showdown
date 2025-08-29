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
    return side === 'left' ? '#DA020E' : '#FFC72C'  // Red for left, Gold for right
  }

  const getShadowColor = () => {
    if (!isSelected) return '0 4px 12px rgba(0,0,0,0.1)'
    return side === 'left' 
      ? '0 6px 20px rgba(218, 2, 14, 0.3)'    // Red shadow for left
      : '0 6px 20px rgba(255, 199, 44, 0.3)'  // Gold shadow for right
  }

  const containerStyle: React.CSSProperties = {
    width: '260px',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: `3px solid ${getBorderColor()}`,
    height: '115px',
    //padding: '6px',
    display: 'flex',
    alignItems: 'flex-end',
    //justifyContent: 'space-evenly',
    gap: '8px',
    opacity: hasVoted && !isSelected ? 0.6 : 1,
    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.3s ease',
    cursor: hasVoted ? 'not-allowed' : 'pointer',
    boxShadow: getShadowColor(),
    marginLeft: '10px',
    margin: "10px 10px 10px 10px",
    // Safari-specific properties using string indexing
    ...({
      WebkitTransform: isSelected ? 'scale(1.02)' : 'scale(1)',
      WebkitTransition: 'all 0.3s ease',
      WebkitBoxShadow: getShadowColor()
    } as any)
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
    <div style={containerStyle} onClick={handleClick}  className={`bg-white rounded ${hasVoted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
      
      <Image
        src={sauce.personImageUrl}
        alt="Influencer"
        width={60}
        height={60}
        className={`${  side === "left" ? 'border-red-400' : 'border-yellow-400'}`}
        style={{ objectFit: 'contain', width: '110px', height: '100px' }}
      />

      {/* Text Info Section */}
      <div style={{
          width: '180px', height: '100px', display: 'flex', flexDirection: 'column',  alignItems: 'center', textAlign: 'center', justifyContent: 'center'
        }}>

          <div>
            <Image
                  src={sauce.imageUrl}
                  alt="Influencer"
                  width={40}
                  height={40}
                  className=""
                  style={{ objectFit: 'cover', marginBottom: '5px' }}
            />
          </div>
    
        <div> 
          <div className="text-gray-600 text-xs font-semibold leading-tight">
              {sauce.influencer_name|| 'Creator'}
            </div>
            <div className="text-red-600 text-base font-black uppercase leading-tight" style={{
              fontSize: '16px',
              letterSpacing: '-0.5px'
            }}>
              {sauce.sauce_name}
          </div>
      </div>
       
      </div>
      
    </div>
  )
}
