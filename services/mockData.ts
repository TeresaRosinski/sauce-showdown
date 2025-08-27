import { Sauce, Matchup } from '@/types'

// Mock sauce data - eventually this will come from your database
export const mockSauces: Sauce[] = [
  {
    id: 'sauce-a',
    name: 'Sauce A',
    description: 'Sarah loves Spicy BBQ',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png', // We'll replace external URLs with local assets
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/person.png'
  },
  {
    id: 'sauce-b', 
    name: 'Sauce B',
    description: 'Mike prefers Sweet & Sour',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png',
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png'
  },
  {
    id: 'sauce-c',
    name: 'Sauce C', 
    description: 'Emma enjoys Honey Mustard',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png',
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/person.png'
  },
  {
    id: 'sauce-d',
    name: 'Sauce D',
    description: 'Jake favors Buffalo Ranch', 
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png',
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png'
  },
  {
    id: 'sauce-e',
    name: 'Sauce E',
    description: 'Alex likes Garlic Aioli',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png',
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/person.png'
  },
  {
    id: 'sauce-f',
    name: 'Sauce F',
    description: 'Maya chooses Chipotle Mayo',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png', 
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png'
  },
  {
    id: 'sauce-g',
    name: 'Sauce G',
    description: 'Ryan picks Sriracha Lime',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png',
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/person.png'
  },
  {
    id: 'sauce-h',
    name: 'Sauce H',
    description: 'Zoe wants Teriyaki Glaze',
    imageUrl: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png',
    personImageUrl: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png'
  }
]

// Create matchups from sauce pairs
export const mockMatchups: Matchup[] = [
  {
    id: 0,
    leftSauce: mockSauces[0], // Sauce A
    rightSauce: mockSauces[1]  // Sauce B
  },
  {
    id: 1, 
    leftSauce: mockSauces[2], // Sauce C
    rightSauce: mockSauces[3]  // Sauce D
  },
  {
    id: 2,
    leftSauce: mockSauces[4], // Sauce E  
    rightSauce: mockSauces[5]  // Sauce F
  },
  {
    id: 3,
    leftSauce: mockSauces[6], // Sauce G
    rightSauce: mockSauces[7]  // Sauce H
  }
]

// Utility functions for data access
export const getMatchups = (): Matchup[] => {
  return mockMatchups
}

export const getMatchupById = (id: number): Matchup | undefined => {
  return mockMatchups.find(matchup => matchup.id === id)
}

export const getSauceById = (id: string): Sauce | undefined => {
  return mockSauces.find(sauce => sauce.id === id)
}

// Mock vote counts - in production this will come from your database
const mockVoteData = {
  0: { leftVotes: 127, rightVotes: 173 }, // Sauce A vs B
  1: { leftVotes: 245, rightVotes: 89 },  // Sauce C vs D
  2: { leftVotes: 156, rightVotes: 144 }, // Sauce E vs F
  3: { leftVotes: 98, rightVotes: 202 },  // Sauce G vs H
}

// Calculate percentages from vote counts (like you'll do with real database data)
export const getMockVoteCounts = (): { [key: number]: { left: number; right: number } } => {
  const results: { [key: number]: { left: number; right: number } } = {}
  
  Object.entries(mockVoteData).forEach(([matchupId, votes]) => {
    const totalVotes = votes.leftVotes + votes.rightVotes
    const leftPercentage = Math.round((votes.leftVotes / totalVotes) * 100)
    const rightPercentage = 100 - leftPercentage
    
    results[parseInt(matchupId)] = {
      left: leftPercentage,
      right: rightPercentage
    }
  })
  
  return results
}

// Function to simulate submitting a vote (future database operation)
export const submitVote = async (matchupId: number, sauceId: string): Promise<void> => {
  // In production, this will be:
  // await supabase.from('votes').insert({ matchup_id: matchupId, sauce_id: sauceId })
  console.log(`Vote submitted for matchup ${matchupId}, sauce ${sauceId}`)
}

// Function to get current vote counts (future database query)
export const getCurrentVoteCounts = async (matchupId: number) => {
  // In production, this will be:
  // const { data } = await supabase.from('votes').select('*').eq('matchup_id', matchupId)
  // Then calculate percentages from the vote counts
  return mockVoteData[matchupId as keyof typeof mockVoteData] || { leftVotes: 0, rightVotes: 0 }
}
