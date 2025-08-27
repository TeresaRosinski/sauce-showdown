"use client"

import { AppContainer } from '@/components/layout/AppContainer'
import { Header } from '@/components/layout/Header'
import { MatchupCard } from '@/components/sauce/MatchupCard'
import { ResultsView } from '@/components/sauce/ResultsView'
import { Navigation } from '@/components/ui/Navigation'
import { useMatchups } from '@/hooks/useMatchups'
import { useVoting } from '@/hooks/useVoting'
import { useResults } from '@/hooks/useResults'
import { useSession } from '@/hooks/useSession'
import { useState, useEffect } from 'react'

export default function Home() {
  // Custom hooks for state management
  const { currentStep, totalSteps, matchups, handleNext, handlePrevious, getCurrentMatchup, resetToFirstMatchup } = useMatchups()
  const { selectedSauces, handleSauceClick, getSelectedSide, resetVotes } = useVoting()
  const { showResults, results, handleSubmitVote, handleBackToVoting, getCurrentPercentages, handleVoteSubmission } = useResults()
  const { sessionId, isLoading, hasVotedLocally, submitVote } = useSession()
  
  const [hasVotedOnCurrent, setHasVotedOnCurrent] = useState(false)

  // Get current matchup data
  const currentMatchup = getCurrentMatchup()
  const selectedSide = getSelectedSide(currentStep)
  const currentPercentages = getCurrentPercentages(currentStep)
  const currentMatchupId = `matchup_${currentStep + 1}`

  // Check if user has voted on current matchup when step changes
  useEffect(() => {
    if (!isLoading) {
      const voted = hasVotedLocally(currentMatchupId)
      setHasVotedOnCurrent(voted)
    }
  }, [currentStep, isLoading, hasVotedLocally, currentMatchupId])

  // Handle voting for current matchup
  const handleVote = async (side: "left" | "right") => {
    // Prevent voting if already voted
    if (hasVotedOnCurrent) {
      console.log('Already voted on this matchup!')
      return
    }

    // Map side to Firebase schema
    const votedFor = side === "left" ? "option_a" : "option_b"
    
    // Submit vote through session management
    const result = await submitVote(currentMatchupId, votedFor)
    
    if (result.success) {
      // Update local voting state for UI feedback
      handleSauceClick(currentStep, side)
      // Update percentages simulation
      handleVoteSubmission(currentStep, side)
      // Mark as voted locally
      setHasVotedOnCurrent(true)
    } else {
      console.error('Vote failed:', result.error)
    }
  }

  // Handle back to voting from results
  const handleBackClick = () => {
    handleBackToVoting()
    resetToFirstMatchup()
    resetVotes()
  }

  if (showResults) {
    return (
      <AppContainer>
        <div
          style={{
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            height: "100%",
          }}
        >
          <ResultsView
            matchups={matchups}
            results={results}
            onBackToVoting={handleBackClick}
          />
        </div>
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <Header />
      
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "12px",
          height: "380px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <MatchupCard
            matchup={currentMatchup}
            selectedSide={selectedSide}
            onVote={handleVote}
            currentPercentages={currentPercentages}
            hasVoted={hasVotedOnCurrent}
          />
        </div>

        <Navigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      <div className="text-center mt-4">
        <h1 className="text-white text-xl font-bold mb-2">Sauce Showdown!</h1>
        <p
          className="text-white mb-4"
          style={{ fontSize: "12px", lineHeight: "normal", width: "90%", margin: "0 auto 16px auto" }}
        >
          Vote for the new sauce you want to try and get more votes in the app to unlock exclusive rewards.
        </p>

        <button
          onClick={handleSubmitVote}
          className="text-gray-800 border-none rounded font-bold text-sm cursor-pointer w-full h-9 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#F4B52A" }}
        >
          Download the App
        </button>
      </div>
    </AppContainer>
  )
}
