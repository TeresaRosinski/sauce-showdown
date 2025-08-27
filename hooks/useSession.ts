import { useState, useEffect } from 'react'
import { getOrCreateSessionId } from '@/lib/session'
import { hasUserVoted, castVote, getUserSession } from '@/services/database'

export function useSession() {
  const [sessionId, setSessionId] = useState<string>('')
  const [votedMatchups, setVotedMatchups] = useState<Set<string>>(new Set())
  const [voteChoices, setVoteChoices] = useState<{ [matchupId: string]: "option_a" | "option_b" }>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Initialize session on client side only
        const id = getOrCreateSessionId()
        setSessionId(id)

        // Fetch user's voting history from Firebase
        const userSession = await getUserSession(id)
        if (userSession && userSession.voted_matchups) {
          setVotedMatchups(new Set(userSession.voted_matchups))
          
          // Also restore the specific choices (option_a or option_b)
          if (userSession.votes_cast) {
            const choices: { [matchupId: string]: "option_a" | "option_b" } = {}
            userSession.votes_cast.forEach(vote => {
              choices[vote.matchup_id] = vote.voted_for
            })
            setVoteChoices(choices)
            console.log(`🔄 Restored voting history: ${userSession.voted_matchups.length} votes with choices`)
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeSession()
  }, [])



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
        // Mark this matchup as voted and track the choice
        setVotedMatchups(prev => new Set([...prev, matchupId]))
        setVoteChoices(prev => ({ ...prev, [matchupId]: votedFor }))
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

  // Get the user's choice for a specific matchup
  const getUserChoice = (matchupId: string): "option_a" | "option_b" | null => {
    return voteChoices[matchupId] || null
  }

  return {
    sessionId,
    isLoading,
    hasVotedLocally,
    getUserChoice,
    submitVote,
    votedMatchups: Array.from(votedMatchups)
  }
}
