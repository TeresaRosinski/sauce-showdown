"use client"

import { AppContainer } from '@/components/layout/AppContainer'
import { Header } from '@/components/layout/Header'
import { MatchupCard } from '@/components/sauce/MatchupCard'
import { ResultsView } from '@/components/sauce/ResultsView'
import { Navigation } from '@/components/ui/Navigation'
import { CompletionAnimation } from '@/components/ui/CompletionAnimation'
import { useMatchups } from '@/hooks/useMatchups'
import { useVoting } from '@/hooks/useVoting'
import { useResults } from '@/hooks/useResults'
import { useSession } from '@/hooks/useSession'
import { useState, useEffect } from 'react'

export default function Home() {
    //!testing API key
    console.log('API Key loaded:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  // Custom hooks for state management
  const { currentStep, totalSteps, matchups, firebaseMatchups, loading, handleNext, handlePrevious, getCurrentMatchup, resetToFirstMatchup } = useMatchups()
  const { selectedSauces, handleSauceClick, getSelectedSide, resetVotes } = useVoting()
  const { showResults, results, handleSubmitVote, handleBackToVoting, getCurrentPercentages } = useResults(matchups, firebaseMatchups)
  const { sessionId, isLoading, hasVotedLocally, getUserChoice, submitVote } = useSession()
  
  const [hasVotedOnCurrent, setHasVotedOnCurrent] = useState(false)
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false)
  const [allVotesComplete, setAllVotesComplete] = useState(false)
  const [celebrationShown, setCelebrationShown] = useState(false)
  const [localStorageChecked, setLocalStorageChecked] = useState(false)

  // Check localStorage for celebration status on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const celebrationComplete = localStorage.getItem('sauce_showdown_celebration_shown')
      if (celebrationComplete === 'true') {
        setCelebrationShown(true)
      }
      setLocalStorageChecked(true) // Mark that we've checked localStorage
    } else {
      setLocalStorageChecked(true) // SSR case
    }
  }, [])

  // Get current matchup data
  const currentMatchup = getCurrentMatchup()
  const currentMatchupId = `matchup_${currentStep + 1}`
  
  // Get the selected side - use restored choice if user has already voted, otherwise use current selection
  const userChoice = getUserChoice(currentMatchupId)
  const selectedSide = hasVotedLocally(currentMatchupId) && userChoice 
    ? (userChoice === "option_a" ? "left" : "right")
    : getSelectedSide(currentStep)
    
  const currentPercentages = getCurrentPercentages(currentStep)

  // Check if user has voted on current matchup when step changes
  useEffect(() => {
    if (!isLoading) {
      const voted = hasVotedLocally(currentMatchupId)
      setHasVotedOnCurrent(voted)
    }
  }, [currentStep, isLoading, hasVotedLocally, currentMatchupId])

  // Check if all votes are complete
  useEffect(() => {
    // Wait for both session data and localStorage to be loaded
    if (!isLoading && totalSteps > 0 && localStorageChecked) {
      const allMatchupIds = Array.from({ length: totalSteps }, (_, i) => `matchup_${i + 1}`)
      const completedVotes = allMatchupIds.filter(id => hasVotedLocally(id))
      const isComplete = completedVotes.length === totalSteps

      // Only trigger celebration AND auto-navigate if:
      // 1. All votes are complete
      // 2. We haven't marked completion before (this means it's the first time completing)
      // 3. We haven't shown celebration yet (checked from localStorage)
      // 4. Not currently showing results
      if (isComplete && !allVotesComplete && !celebrationShown && !showResults) {
        console.log('🎉 All votes complete for the first time! Triggering celebration...')
        setAllVotesComplete(true)
        setCelebrationShown(true)
        setShowCompletionAnimation(true)
        
        // Save celebration status to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('sauce_showdown_celebration_shown', 'true')
        }
        
        // Auto-navigate to results after animation
        setTimeout(() => {
          setShowCompletionAnimation(false)
          handleSubmitVote()
        }, 1300) // 3 second celebration
      } else if (isComplete && !allVotesComplete) {
        // If complete but celebration already shown (e.g., on page reload), 
        // just mark as complete but DON'T auto-navigate to results
        console.log('🔄 All votes complete (already celebrated) - staying on voting view')
        setAllVotesComplete(true)
      }
    }
  }, [isLoading, totalSteps, hasVotedLocally, allVotesComplete, celebrationShown, showResults, handleSubmitVote, localStorageChecked])

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
          // Mark as voted locally (percentages will update automatically via real-time listener)
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
    // DON'T reset allVotesComplete - they still have their votes
    // Only reset animation state
    setShowCompletionAnimation(false)
    setCelebrationShown(false) // Allow celebration again if they vote again
    
    // Clear celebration status from localStorage so they can celebrate again if they vote again
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sauce_showdown_celebration_shown')
    }
  }

  // Show loading state while fetching matchups or session
  if (loading || isLoading) {
    return (
      <AppContainer>
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </AppContainer>
    )
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
            View Matchup Stats
          </button>
        </div>
        
        {/* Completion Animation Overlay */}
        <CompletionAnimation show={showCompletionAnimation} />
    </AppContainer>
  )
}
