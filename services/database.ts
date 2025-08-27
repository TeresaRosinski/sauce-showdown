// Firebase integration layer
// This matches your exact Firebase schema structure

import { FirebaseMatchup, UserSession, VoteCast } from '@/types'

// Future: Initialize Firebase here
// import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app)

// CORE DATABASE OPERATIONS (exactly matching your schema)

// 1. CHECK IF USER ALREADY VOTED
export async function hasUserVoted(sessionId: string, matchupId: string): Promise<boolean> {
  // Future Firebase implementation:
  // const docRef = doc(db, 'user_sessions', sessionId)
  // const docSnap = await getDoc(docRef)
  // 
  // if (!docSnap.exists()) return false
  // 
  // const votedMatchups = docSnap.data().voted_matchups || []
  // return votedMatchups.includes(matchupId)
  
  // Mock implementation for now
  const mockUserSessions: { [key: string]: UserSession } = {
    // Will be populated with real session data
  }
  
  const userSession = mockUserSessions[sessionId]
  if (!userSession) return false
  
  return userSession.voted_matchups.includes(matchupId)
}

// 2. CAST A VOTE
export async function castVote(sessionId: string, matchupId: string, votedFor: "option_a" | "option_b"): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if they already voted
    const alreadyVoted = await hasUserVoted(sessionId, matchupId)
    if (alreadyVoted) {
      return { success: false, error: 'User already voted on this matchup' }
    }

    // Future Firebase implementation:
    // // Update the matchup vote count
    // const matchupRef = doc(db, 'matchups', matchupId)
    // await updateDoc(matchupRef, {
    //   [`${votedFor}.votes`]: increment(1),
    //   total_votes: increment(1)
    // })
    //
    // // Record the user's vote
    // const userSessionRef = doc(db, 'user_sessions', sessionId)
    // await setDoc(userSessionRef, {
    //   session_id: sessionId,
    //   voted_matchups: arrayUnion(matchupId),
    //   votes_cast: arrayUnion({
    //     matchup_id: matchupId,
    //     voted_for: votedFor,
    //     timestamp: new Date().toISOString()
    //   }),
    //   last_activity: new Date().toISOString()
    // }, { merge: true })

    // Mock success for now
    console.log(`Vote cast: Session ${sessionId} voted ${votedFor} for ${matchupId}`)
    return { success: true }
    
  } catch (error) {
    return { success: false, error: 'Failed to cast vote' }
  }
}

// 3. GET LIVE MATCHUP DATA
export async function getMatchupData(matchupId: string): Promise<FirebaseMatchup> {
  // Future Firebase implementation:
  // const docRef = doc(db, 'matchups', matchupId)
  // const docSnap = await getDoc(docRef)
  // 
  // if (!docSnap.exists()) {
  //   throw new Error('Matchup not found')
  // }
  //
  // const data = docSnap.data() as FirebaseMatchup
  // 
  // // Calculate percentages
  // const totalVotes = data.total_votes
  // const optionAPercent = totalVotes > 0 ? Math.round((data.option_a.votes / totalVotes) * 100) : 50
  // const optionBPercent = totalVotes > 0 ? Math.round((data.option_b.votes / totalVotes) * 100) : 50
  //
  // return {
  //   ...data,
  //   option_a: { ...data.option_a, percentage: optionAPercent },
  //   option_b: { ...data.option_b, percentage: optionBPercent }
  // }

  // Mock data matching your schema
  const mockMatchups: { [key: string]: FirebaseMatchup } = {
    'matchup_1': {
      id: 'matchup_1',
      option_a: {
        display_name: "MrBeast's Beast Mode BBQ",
        votes: 127,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Charli's Dance Floor Hot Sauce",
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
        votes: 156,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Emma's Coffee Shop Chipotle",
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
        votes: 203,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Addison's Sweet & Sassy",
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
        votes: 189,
        influencer_image: "/placeholder-user.jpg",
        sauce_image: "/placeholder.svg"
      },
      option_b: {
        display_name: "Zendaya's Spider-Verse Spice",
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
  // Future Firebase implementation:
  // const q = query(collection(db, 'matchups'), where('is_active', '==', true))
  // const querySnapshot = await getDocs(q)
  // const matchups: FirebaseMatchup[] = []
  // 
  // querySnapshot.forEach((doc) => {
  //   const data = doc.data() as FirebaseMatchup
  //   const totalVotes = data.total_votes
  //   const optionAPercent = totalVotes > 0 ? Math.round((data.option_a.votes / totalVotes) * 100) : 50
  //   const optionBPercent = totalVotes > 0 ? Math.round((data.option_b.votes / totalVotes) * 100) : 50
  //   
  //   matchups.push({
  //     id: doc.id,
  //     ...data,
  //     option_a: { ...data.option_a, percentage: optionAPercent },
  //     option_b: { ...data.option_b, percentage: optionBPercent }
  //   })
  // })
  // 
  // return matchups.sort((a, b) => a.id.localeCompare(b.id))

  // Mock implementation - get all 4 matchups
  const allMatchups = await Promise.all([
    getMatchupData('matchup_1'),
    getMatchupData('matchup_2'), 
    getMatchupData('matchup_3'),
    getMatchupData('matchup_4')
  ])

  return allMatchups.filter(matchup => matchup.is_active)
}
