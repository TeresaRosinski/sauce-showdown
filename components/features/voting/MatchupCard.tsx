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
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000', textShadow: '0 2px 4px rgba(0,0,0,0.2)', margin: '5px 0px 5px 0px'}}>
          VOTE NOW!
        </p>
      </div>


      {/* Contestants + VS/Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '10px 0px 10px 0px' }}>

        {/* Top Contestant */}
        <div>
        <SauceDisplay
          sauce={matchup.leftSauce}
          side="left"
          isSelected={selectedSide === "left"}
          onVote={onVote}
          hasVoted={hasVoted}
          //style={{ marginBottom: "40px" }} // spacing for VS overlap
        />
        </div>


        {/* VS  */}
        <div 
          style={{
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: 600,
            padding: '4px 4px',
            borderRadius: '25px',
            zIndex: 2,
          }}
        >
          VS
        </div>
      


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

      {hasVoted ? (
          <ProgressBar
            leftPercentage={currentPercentages.left}
            rightPercentage={currentPercentages.right}
            leftColor="#DA020E"
            rightColor="#FFC72C"
          />
        ) : null}


      <div className="text-center" style={{ margin: '5px 0px 5px 0px' }}>
              <div 
                className="font-black leading-none mb-1"
                style={{ 
                  fontSize: '24px',
                  color: '#ffffff',
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
