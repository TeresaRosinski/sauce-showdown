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
    width: '120px',
    backgroundColor: 'transparent',
    height: 'fit-content',
    //padding: '6px',
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //gap: '8px',
    opacity: hasVoted && !isSelected ? 0.6 : 1,
    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.1s ease',
    cursor: hasVoted ? 'not-allowed' : 'pointer',
   
    // Safari-specific properties using string indexing
    ...({
      WebkitTransform: isSelected ? 'scale(1.02)' : 'scale(1)',
      WebkitTransition: 'all 0.3s ease',
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
    <div style={containerStyle} onClick={handleClick}  className={`${hasVoted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>

      <div>
        <Image
          src={sauce.personImageUrl}
          alt="Influencer"
          width={70}
          height={70}
          className={`${  side === "left" ? 'border-red-400' : 'border-yellow-400'}`}
          style={{ objectFit: 'contain', width: '70px', height: '70px', borderRadius: '0%' }}
        />
      </div>

      {/* Text Info Section */}
      <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center',  backgroundColor: '#F7ECDE', borderRadius: '12px', border: hasVoted ? `3px solid ${getBorderColor()}` : 'none', width: '120px', padding: '10px', height: '190px',  boxShadow: getShadowColor() }}>


  
      <div > 
          <Image
            src={sauce.imageUrl}
            alt="Influencer"
            width={60}
            height={60}
            className={`${  side === "left" ? 'border-red-400' : 'border-yellow-400'}`}
            style={{ objectFit: 'contain', width: '70px', height: '70px', marginLeft: '15px', marginBottom: '20px' }}
          />

          <div className="text-gray-600 font-semibold leading-tight" style={{ marginBottom: '3px', textAlign: 'center', fontSize: '12px' }}>
            {sauce.influencer_name|| 'Creator'}
          </div>

          <div className="text-red-600 font-black uppercase leading-tight" style={{
            fontSize: '16px',
            letterSpacing: '-0.5px',
            textAlign: 'center',
          }}>
            {sauce.sauce_name}
        </div>
      </div>
      
      </div>

    </div>
  )
}
