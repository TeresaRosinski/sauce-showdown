import { useState } from 'react'
import { getMatchups } from '@/services/mockData'
import { Matchup } from '@/types'

export function useMatchups() {
  const [currentStep, setCurrentStep] = useState(0)
  const matchups = getMatchups()
  const totalSteps = matchups.length

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
    handleNext,
    handlePrevious,
    getCurrentMatchup,
    resetToFirstMatchup,
  }
}
