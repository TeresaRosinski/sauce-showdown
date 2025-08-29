import { MatchupCardProps } from '@/types'
import { SauceDisplay } from './SauceDisplay'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Navigation } from '@/components/common/Navigation'
import Image from 'next/image'
import React from 'react'

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




  const handleNavigation = (direction: 'next' | 'previous', originalHandler: () => void) => {
    originalHandler()
  }

  return (
    <div 
      className="matchup-card"
      style={{
        //borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        transform: 'scale(1)',
        transition: 'all 0.4s ease',
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '300px',
      }}
    >

      {/* Contestants + VS/Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', width: '100%', margin: '20px 10px 10px 10px' }}>

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
          position: 'absolute',
          backgroundImage: 'url("/Street-Fighter-Character-Battle-PNG.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          //background: 'linear-gradient(45deg, #FFC72C, #FFFFFF)',
          //WebkitBackgroundClip: 'text',
          //  WebkitTextFillColor: 'transparent',
          //backgroundClip: 'text',
          padding: '0px 3px 0px 3px',
          margin: '100px 0px 0px 0px',
          fontWeight: 800,
          height: '50px',
          width: '50px',
          zIndex: 20,
          fontSize: 'auto',
          textAlign: 'center',
          rotate: '-45deg',
          animation: 'pulse 2s infinite',
          //transform: 'translateX(-10px)',
        }}
        >
          
        </div>
      
        {/* Bottom Contestant */}
        <SauceDisplay
          sauce={matchup.rightSauce}
          side="right"
          isSelected={selectedSide === "right"}
          onVote={onVote}
          hasVoted={hasVoted}
        />
      </div>

            {/* Navigation - only show if props are provided */}
      {currentStep !== undefined && totalSteps !== undefined && onPrevious && onNext && (
        <div>
          <Navigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={() => handleNavigation('previous', onPrevious || (() => {}))}
            onNext={() => handleNavigation('next', onNext || (() => {}))}
          />
        </div>
      )}

      {/* Progress Bar with conditional rendering */}
      {hasVoted ? (
          <ProgressBar
            leftPercentage={currentPercentages.left}
            rightPercentage={currentPercentages.right}
            leftColor="#000000"
            rightColor="#FFC72C"
          />
        ) : (
          <div style={{ height: '22px' }} /> // Spacer to maintain consistent layout
        )}




      {/* <div className="text-center" style={{ margin: '5px 0px 5px 0px' }}>
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
      </div> */}


    </div>
  )
}
