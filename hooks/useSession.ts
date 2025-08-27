import { useState, useEffect } from 'react'
import { getOrCreateSessionId } from '@/lib/session'
import { hasUserVoted, castVote } from '@/services/database'

export function useSession() {
  const [sessionId, setSessionId] = useState<string>('')
  const [votedMatchups, setVotedMatchups] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize session on client side only
    const id = getOrCreateSessionId()
    setSessionId(id)
    setIsLoading(false)
  }, [])

  // Check if user has already voted on a specific matchup
  const hasVotedOnMatchup = async (matchupId: string): Promise<boolean> => {
    if (!sessionId) return false
    
    try {
      const voted = await hasUserVoted(sessionId, matchupId)
      if (voted) {
        setVotedMatchups(prev => new Set([...prev, matchupId]))
      }
      return voted
    } catch (error) {
      console.error('Error checking vote status:', error)
      return false
    }
  }

  // Submit a vote for a matchup
  const submitVote = async (matchupId: string, votedFor: "option_a" | "option_b"): Promise<{ success: boolean; error?: string }> => {
    if (!sessionId) {
      return { success: false, error: 'No session ID' }
    }

    // Check if already voted locally first
    if (votedMatchups.has(matchupId)) {
      return { success: false, error: 'Already voted on this matchup' }
    }

    try {
      const result = await castVote(sessionId, matchupId, votedFor)
      
      if (result.success) {
        // Mark this matchup as voted
        setVotedMatchups(prev => new Set([...prev, matchupId]))
        console.log(`Vote successful! Voted ${votedFor} for ${matchupId}`)
      }
      
      return result
    } catch (error) {
      return { success: false, error: 'Failed to submit vote' }
    }
  }

  // Check if user has voted on a matchup (from local state)
  const hasVotedLocally = (matchupId: string): boolean => {
    return votedMatchups.has(matchupId)
  }

  return {
    sessionId,
    isLoading,
    hasVotedOnMatchup,
    hasVotedLocally,
    submitVote,
    votedMatchups: Array.from(votedMatchups)
  }
}
