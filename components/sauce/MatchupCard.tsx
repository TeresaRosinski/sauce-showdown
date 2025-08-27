import { MatchupCardProps } from '@/types'
import { SauceDisplay } from './SauceDisplay'
import { ProgressBar } from '@/components/ui/ProgressBar'

export function MatchupCard({ 
  matchup, 
  selectedSide, 
  onVote, 
  currentPercentages,
  hasVoted = false
}: MatchupCardProps) {
  return (
    <div className="space-y-2">
      {/* Left Sauce */}
      <SauceDisplay
        sauce={matchup.leftSauce}
        side="left"
        isSelected={selectedSide === "left"}
        onVote={onVote}
        hasVoted={hasVoted}
      />

      {/* Progress Bar */}
      <ProgressBar
        leftPercentage={currentPercentages.left}
        rightPercentage={currentPercentages.right}
        leftColor="#000000"
        rightColor="#F4B52A"
      />

      {/* Right Sauce */}
      <SauceDisplay
        sauce={matchup.rightSauce}
        side="right"
        isSelected={selectedSide === "right"}
        onVote={onVote}
        hasVoted={hasVoted}
      />
    </div>
  )
}
