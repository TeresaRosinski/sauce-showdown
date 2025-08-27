import { useState } from 'react'
import { VoteSelection, VoteSide } from '@/types'

export function useVoting() {
  const [selectedSauces, setSelectedSauces] = useState<VoteSelection>({
    0: null,
    1: null,
    2: null,
    3: null,
  })

  const handleSauceClick = (matchupId: number, side: "left" | "right") => {
    setSelectedSauces((prev) => ({
      ...prev,
      [matchupId]: prev[matchupId] === side ? null : side,
    }))
  }

  const getSelectedSide = (matchupId: number): VoteSide => {
    return selectedSauces[matchupId]
  }

  const resetVotes = () => {
    setSelectedSauces({
      0: null,
      1: null,
      2: null,
      3: null,
    })
  }

  return {
    selectedSauces,
    handleSauceClick,
    getSelectedSide,
    resetVotes,
  }
}
