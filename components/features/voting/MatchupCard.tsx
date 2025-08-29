import { MatchupCardProps } from '@/types'
import { SauceDisplay } from './SauceDisplay'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Navigation } from '@/components/common/Navigation'

export function MatchupCard({ 
  matchup, 
  selectedSide, 
  onVote, 
  currentPercentages,
  hasVoted = false,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  totalVotes = 0
}: MatchupCardProps) {
  return (
    <div 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        //justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: "10px",
        marginTop: "10px",
        width: '280px',
      }}
    >

      <div>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#DA020E', textShadow: '0 2px 4px rgba(0,0,0,0.2)', margin: '5px 0px 5px 0px'}}>
          VOTE NOW!
        </p>
      </div>


 

  

      

      {/* Contestants + VS/Progress Bar */}
      <div style={{ position: "relative", width: "100%" }}>
        {/* Top Contestant */}
        <SauceDisplay
          sauce={matchup.leftSauce}
          side="left"
          isSelected={selectedSide === "left"}
          onVote={onVote}
          hasVoted={hasVoted}
          //style={{ marginBottom: "40px" }} // spacing for VS overlap
        />

        {/* VS Badge or Progress Bar */}
        {hasVoted ? (
          <ProgressBar
            leftPercentage={currentPercentages.left}
            rightPercentage={currentPercentages.right}
            leftColor="#DA020E"
            rightColor="#FFC72C"
          />
        ) : (
          <div 
            style={{
              position: "absolute",   // float in the middle
              top: "50%",
              left: "50%",
              //rotate: "-33deg",
              transform: "translate(-50%, -50%)",
              //background: 'linear-gradient(45deg, #FFC72C, #FFD700)',
              color: '#000000',
              fontSize: '24px',
              fontWeight: 900,
              padding: '8px 8px',
              borderRadius: '25px',
              //border: '2px solid white',
              //boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              //animation: 'pulse 3s infinite',
              zIndex: 2,
            }}
          >
            VS
          </div>
        )}

        {/* Bottom Contestant */}
        <SauceDisplay
          sauce={matchup.rightSauce}
          side="right"
          isSelected={selectedSide === "right"}
          onVote={onVote}
          hasVoted={hasVoted}
          //style={{ marginTop: "40px" }} // spacing for VS overlap
        />
      </div>

    {/* Navigation - only show if props are provided */}
    {currentStep !== undefined && totalSteps !== undefined && onPrevious && onNext && (
        <Navigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}

<div className="text-center" style={{ margin: '5px 0px 5px 0px' }}>
        <div 
          className="font-black leading-none mb-1"
          style={{ 
            fontSize: '24px',
            color: '#DA020E',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {totalVotes.toLocaleString()}
        </div>
        <div 
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ 
            color: '#666',
            fontSize: '10px',
            letterSpacing: '0.5px'
          }}
        >
          Votes Cast
        </div>
      </div>


    </div>
  )
}
