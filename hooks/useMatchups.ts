import { useState, useEffect } from 'react'
import { getAllMatchups, subscribeToMatchups } from '@/services/database'
import { Matchup, FirebaseMatchup } from '@/types'

export function useMatchups() {
  const [currentStep, setCurrentStep] = useState(0)
  const [matchups, setMatchups] = useState<Matchup[]>([])
  const [firebaseMatchups, setFirebaseMatchups] = useState<FirebaseMatchup[]>([])
  const [loading, setLoading] = useState(true)
  const totalSteps = matchups.length

  // Set up real-time listeners for matchups
  useEffect(() => {
    setLoading(true)
    
    // Convert Firebase format to app format
    const convertFirebaseToApp = (firebaseMatchups: FirebaseMatchup[]): Matchup[] => {
      return firebaseMatchups.map((fbMatchup: FirebaseMatchup, index: number) => ({
        id: index,
        leftSauce: {
          id: `${fbMatchup.id}_option_a`,
          name: fbMatchup.option_a.display_name,
          description: fbMatchup.option_a.display_name,
          imageUrl: fbMatchup.option_a.sauce_image,
          personImageUrl: fbMatchup.option_a.influencer_image
        },
        rightSauce: {
          id: `${fbMatchup.id}_option_b`,
          name: fbMatchup.option_b.display_name,
          description: fbMatchup.option_b.display_name,
          imageUrl: fbMatchup.option_b.sauce_image,
          personImageUrl: fbMatchup.option_b.influencer_image
        }
      }))
    }

    // Real-time listener for matchup updates
    const unsubscribe = subscribeToMatchups(
      (firebaseMatchupsData) => {
        const convertedMatchups = convertFirebaseToApp(firebaseMatchupsData)
        setMatchups(convertedMatchups)
        setFirebaseMatchups(firebaseMatchupsData) // Store raw Firebase data for percentages
        setLoading(false)
      },
      (error) => {
        console.error('Real-time listener error:', error)
        // Fallback to static data
        getAllMatchups().then(firebaseMatchupsData => {
          const convertedMatchups = convertFirebaseToApp(firebaseMatchupsData)
          setMatchups(convertedMatchups)
          setFirebaseMatchups(firebaseMatchupsData)
        }).catch(async (fallbackError) => {
          console.error('Fallback error:', fallbackError)
          const { getMatchups } = await import('@/services/mockData')
          setMatchups(getMatchups())
        }).finally(() => {
          setLoading(false)
        })
      }
    )

    // Cleanup function to unsubscribe from listeners
    return () => {
      if (unsubscribe) {
        console.log('🔥 Cleaning up real-time listeners')
        unsubscribe()
      }
    }
  }, [])

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getCurrentMatchup = (): Matchup => {
    return matchups[currentStep]
  }

  const resetToFirstMatchup = () => {
    setCurrentStep(0)
  }

  return {
    currentStep,
    totalSteps,
    matchups,
    firebaseMatchups,
    loading,
    handleNext,
    handlePrevious,
    getCurrentMatchup,
    resetToFirstMatchup,
  }
}
