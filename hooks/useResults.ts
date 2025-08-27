import { useState, useEffect } from 'react'
import { getMockVoteCounts } from '@/services/mockData'
import { Matchup, FirebaseMatchup } from '@/types'

export function useResults(matchups: Matchup[] = [], firebaseMatchups: FirebaseMatchup[] = []) {
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{ [key: number]: { left: number; right: number } }>({})
  const [currentVoteCounts, setCurrentVoteCounts] = useState<{ [key: number]: { left: number; right: number } }>({})

  // Extract real-time percentages from Firebase matchup data
  useEffect(() => {
    if (firebaseMatchups.length > 0) {
      const livePercentages: { [key: number]: { left: number; right: number } } = {}
      
      firebaseMatchups.forEach((fbMatchup, index) => {
        // Extract the real calculated percentages from Firebase
        const leftPercent = fbMatchup.option_a.percentage || 50
        const rightPercent = fbMatchup.option_b.percentage || 50
        
        livePercentages[index] = {
          left: leftPercent,
          right: rightPercent
        }
      })
      
      setCurrentVoteCounts(livePercentages)
      console.log('🔥 Updated live percentages from real Firebase data:', livePercentages)
    }
  }, [firebaseMatchups])

  const handleSubmitVote = () => {
    //alert('app downloading...')
    // Use the current live percentages for the results view
    //setResults(currentVoteCounts)
    setShowResults(true)
  }

  const handleBackToVoting = () => {
    setShowResults(false)
    setResults({})
  }

    // Vote submission is now handled by Firebase real-time updates
  // No need to simulate - the real-time listener will update percentages automatically

  // Get current percentages for display during voting
  const getCurrentPercentages = (step: number) => {
    return currentVoteCounts[step] || { left: 50, right: 50 }
  }

  return {
    showResults,
    results,
    handleSubmitVote,
    handleBackToVoting,
    getCurrentPercentages,
  }
}
