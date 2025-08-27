import { useState } from 'react'
import { getMockVoteCounts } from '@/services/mockData'

export function useResults() {
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{ [key: number]: { left: number; right: number } }>({})
  const [currentVoteCounts, setCurrentVoteCounts] = useState<{ [key: number]: { left: number; right: number } }>({
    0: { left: 42, right: 58 }, // Sauce A vs B
    1: { left: 67, right: 33 }, // Sauce C vs D  
    2: { left: 55, right: 45 }, // Sauce E vs F
    3: { left: 38, right: 62 }, // Sauce G vs H
  })

  const handleSubmitVote = () => {
    // In the future, this will fetch real vote counts from your database
    const mockResults = getMockVoteCounts()
    setResults(mockResults)
    setShowResults(true)
  }

  const handleBackToVoting = () => {
    setShowResults(false)
    setResults({})
  }

  // Simulate adding a vote and updating percentages
  const handleVoteSubmission = (matchupId: number, side: "left" | "right") => {
    setCurrentVoteCounts(prev => {
      const current = prev[matchupId] || { left: 50, right: 50 }
      
      // Simulate adding 1 vote (in real app, this will be a database operation)
      const totalVotes = 100 // Simulate 100 total votes for easier math
      const leftVotes = Math.round(current.left * totalVotes / 100)
      const rightVotes = Math.round(current.right * totalVotes / 100)
      
      const newLeftVotes = side === "left" ? leftVotes + 1 : leftVotes
      const newRightVotes = side === "right" ? rightVotes + 1 : rightVotes
      const newTotal = newLeftVotes + newRightVotes
      
      const newPercentages = {
        left: Math.round((newLeftVotes / newTotal) * 100),
        right: Math.round((newRightVotes / newTotal) * 100)
      }
      
      return {
        ...prev,
        [matchupId]: newPercentages
      }
    })
  }

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
    handleVoteSubmission,
  }
}
