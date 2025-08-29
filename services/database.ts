// Firebase integration layer
// This matches your exact Firebase schema structure

import { FirebaseMatchup, UserSession, VoteCast } from '@/types'
import { db } from '@/lib/firebase'
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  arrayUnion, 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore'

// CORE DATABASE OPERATIONS (exactly matching your schema)

// 1. CHECK IF USER ALREADY VOTED
export async function hasUserVoted(sessionId: string, matchupId: string): Promise<boolean> {
  if (!db) {
    // Fallback to mock implementation when Firebase is not configured
    console.log('Firebase not configured - using mock data')
    return false
  }

  try {
    const docRef = doc(db, 'user_sessions', sessionId)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return false
    
    const votedMatchups = docSnap.data().voted_matchups || []
    return votedMatchups.includes(matchupId)
  } catch (error) {
    console.error('Error checking vote status:', error)
    return false
  }
}

// 2. CAST A VOTE
export async function castVote(sessionId: string, matchupId: string, votedFor: "option_a" | "option_b"): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if they already voted
    const alreadyVoted = await hasUserVoted(sessionId, matchupId)
    if (alreadyVoted) {
      return { success: false, error: 'User already voted on this matchup' }
    }

    if (!db) {
      // Mock success when Firebase is not configured
      console.log(`Vote cast: Session ${sessionId} voted ${votedFor} for ${matchupId}`)
      return { success: true }
    }

    // Update the matchup vote count
    const matchupRef = doc(db, 'matchups', matchupId)
    await updateDoc(matchupRef, {
      [`${votedFor}.votes`]: increment(1),
      total_votes: increment(1)
    })

    // Record the user's vote
    const userSessionRef = doc(db, 'user_sessions', sessionId)
    await setDoc(userSessionRef, {
      session_id: sessionId,
      voted_matchups: arrayUnion(matchupId),
      votes_cast: arrayUnion({
        matchup_id: matchupId,
        voted_for: votedFor,
        timestamp: new Date().toISOString()
      }),
      last_activity: new Date().toISOString()
    }, { merge: true })

    console.log(`Vote successfully cast: Session ${sessionId} voted ${votedFor} for ${matchupId}`)
    return { success: true }
    
  } catch (error) {
    console.error('Error casting vote:', error)
    return { success: false, error: 'Failed to cast vote' }
  }
}

// 2.5. GET USER SESSION DATA
export async function getUserSession(sessionId: string): Promise<UserSession | null> {
  if (!db) {
    console.log('Firebase not configured - cannot fetch user session')
    return null
  }

  try {
    const docRef = doc(db, 'user_sessions', sessionId)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }

    return docSnap.data() as UserSession
  } catch (error) {
    console.error('Error fetching user session:', error)
    return null
  }
}

// 3. GET LIVE MATCHUP DATA
export async function getMatchupData(matchupId: string): Promise<FirebaseMatchup> {
  if (db) {
    try {
      const docRef = doc(db, 'matchups', matchupId)
      const docSnap = await getDoc(docRef)
      
      if (!docSnap.exists()) {
        throw new Error('Matchup not found')
      }

      const data = docSnap.data() as FirebaseMatchup
      
      // Calculate percentages
      const totalVotes = data.total_votes
      const optionAPercent = totalVotes > 0 ? Math.round((data.option_a.votes / totalVotes) * 100) : 50
      const optionBPercent = totalVotes > 0 ? Math.round((data.option_b.votes / totalVotes) * 100) : 50

      return {
        ...data,
        option_a: { ...data.option_a, percentage: optionAPercent },
        option_b: { ...data.option_b, percentage: optionBPercent }
      }
    } catch (error) {
      console.error('Error fetching matchup data:', error)
      // Fall through to mock data
    }
  }

  // Mock data matching your schema
  const mockMatchups: { [key: string]: FirebaseMatchup } = {
    'matchup_1': {
      id: 'matchup_1',
      option_a: {
        display_name: "MrBeast's Beast Mode BBQ",
        influencer_name: "MrBeast",
        sauce_name: "Beast Mode BBQ",
        votes: 127,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Charli's Dance Floor Hot Sauce",
        influencer_name: "Charli D'Amelio",
        sauce_name: "Dance Floor Hot Sauce",
        votes: 98,
        influencer_image: "/placeholder-user.jpg", 
        sauce_image: "/placeholder.svg"
      },
      total_votes: 225,
      created_at: "2024-08-26",
      is_active: true
    },
    'matchup_2': {
      id: 'matchup_2',
      option_a: {
        display_name: "Dude Perfect's Trick Shot Teriyaki",
        influencer_name: "Dude Perfect",
        sauce_name: "Trick Shot Teriyaki",
        votes: 156,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Emma's Coffee Shop Chipotle",
        influencer_name: "Emma Chamberlain",
        sauce_name: "Coffee Shop Chipotle",
        votes: 134,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      total_votes: 290,
      created_at: "2024-08-26",
      is_active: true
    },
    'matchup_3': {
      id: 'matchup_3',
      option_a: {
        display_name: "Gordon's Hell's Kitchen Heat",
        influencer_name: "Gordon Ramsay",
        sauce_name: "Hell's Kitchen Heat",
        votes: 203,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Addison's Sweet & Sassy",
        influencer_name: "Addison Rae",
        sauce_name: "Sweet & Sassy",
        votes: 167,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      total_votes: 370,
      created_at: "2024-08-26",
      is_active: true
    },
    'matchup_4': {
      id: 'matchup_4',
      option_a: {
        display_name: "Ryan's Deadpool Revenge",
        influencer_name: "Ryan Reynolds",
        sauce_name: "Deadpool Revenge",
        votes: 189,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Zendaya's Spider-Verse Spice",
        influencer_name: "Zendaya",
        sauce_name: "Spider-Verse Spice",
        votes: 201,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      total_votes: 390,
      created_at: "2024-08-26",
      is_active: true
    }
  }

  const matchup = mockMatchups[matchupId]
  if (!matchup) {
    throw new Error('Matchup not found')
  }

  // Calculate percentages
  const totalVotes = matchup.total_votes
  const optionAPercent = totalVotes > 0 ? Math.round((matchup.option_a.votes / totalVotes) * 100) : 50
  const optionBPercent = totalVotes > 0 ? Math.round((matchup.option_b.votes / totalVotes) * 100) : 50

  return {
    ...matchup,
    option_a: { ...matchup.option_a, percentage: optionAPercent },
    option_b: { ...matchup.option_b, percentage: optionBPercent }
  }
}

// 4. GET ALL MATCHUPS FOR DISPLAY
export async function getAllMatchups(): Promise<FirebaseMatchup[]> {
  if (!db) {
    // Fallback to mock implementation when Firebase is not configured
    console.log('🔥 Firebase not configured - using mock matchups')
    const allMatchups = await Promise.all([
      getMatchupData('matchup_1'),
      getMatchupData('matchup_2'), 
      getMatchupData('matchup_3'),
      getMatchupData('matchup_4')
    ])
    return allMatchups
  }

  try {
    console.log('🔥 Fetching matchups from Firebase...')
    const q = query(collection(db, 'matchups'), where('is_active', '==', true))
    const querySnapshot = await getDocs(q)
    const matchups: FirebaseMatchup[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirebaseMatchup
      const totalVotes = data.total_votes
      const optionAPercent = totalVotes > 0 ? Math.round((data.option_a.votes / totalVotes) * 100) : 50
      const optionBPercent = totalVotes > 0 ? Math.round((data.option_b.votes / totalVotes) * 100) : 50
      
      // Reduced logging to minimize console noise
      
      matchups.push({
        //id: doc.id,
        ...data,
        option_a: { ...data.option_a, percentage: optionAPercent },
        option_b: { ...data.option_b, percentage: optionBPercent }
      })
    })
    
    console.log(`🔥 Successfully loaded ${matchups.length} matchups from Firebase`)
    return matchups.sort((a, b) => a.id.localeCompare(b.id))
  } catch (error) {
    console.error('Error fetching matchups from Firebase:', error)
    // Fallback to mock data if Firebase fails
    const allMatchups = await Promise.all([
      getMatchupData('matchup_1'),
      getMatchupData('matchup_2'), 
      getMatchupData('matchup_3'),
      getMatchupData('matchup_4')
    ])
    return allMatchups
  }
}

// 4.5. GET ALL MATCHUPS WITH REAL-TIME UPDATES
export function subscribeToMatchups(
  onMatchupsUpdate: (matchups: FirebaseMatchup[]) => void,
  onError?: (error: Error) => void
): Unsubscribe | null {
  if (!db) {
    console.log('🔥 Firebase not configured - using mock data fallback')
    // Use mock data directly instead of getAllMatchups which also tries Firebase
    const mockMatchups = [
      getMatchupData('matchup_1'),
      getMatchupData('matchup_2'), 
      getMatchupData('matchup_3'),
      getMatchupData('matchup_4')
    ]
    Promise.all(mockMatchups).then(onMatchupsUpdate).catch(onError || console.error)
    return null
  }

  try {
    console.log('🔥 Setting up real-time matchup listeners...')
    const q = query(collection(db, 'matchups'), where('is_active', '==', true))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const matchups: FirebaseMatchup[] = []
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirebaseMatchup
        const totalVotes = data.total_votes
        const optionAPercent = totalVotes > 0 ? Math.round((data.option_a.votes / totalVotes) * 100) : 50
        const optionBPercent = totalVotes > 0 ? Math.round((data.option_b.votes / totalVotes) * 100) : 50
        
        matchups.push({
          //id: doc.id,
          ...data,
          option_a: { ...data.option_a, percentage: optionAPercent },
          option_b: { ...data.option_b, percentage: optionBPercent }
        })
      })
      
      const sortedMatchups = matchups.sort((a, b) => a.id.localeCompare(b.id))
      console.log(`🔥 Real-time update: ${sortedMatchups.length} matchups`)
      onMatchupsUpdate(sortedMatchups)
    }, (error) => {
      console.error('Error in real-time listener:', error)
      if (onError) onError(error)
    })

    return unsubscribe
  } catch (error) {
    console.error('Error setting up real-time listener:', error)
    if (onError) onError(error as Error)
    return null
  }
}
