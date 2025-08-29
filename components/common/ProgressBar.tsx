import { ProgressBarProps } from '@/types'

export function ProgressBar({ 
  leftPercentage, 
  rightPercentage, 
  leftColor = "#000000", 
  rightColor = "#F4B52A" 
}: ProgressBarProps) {
  return (

    <div className="h-4 flex rounded-md overflow-hidden w-full" style={{width: '260px', margin: '8px 0', marginLeft: '10px'}}>
      <div
        className="flex items-center justify-center text-white text-xs font-semibold"
        style={{
          backgroundColor: leftColor,
          width: `${leftPercentage}%`,
        }}
      >
        {leftPercentage > 20 ? `${leftPercentage}%` : ""}
      </div>
      <div
        className="flex items-center justify-center text-xs font-semibold"
        style={{
          backgroundColor: rightColor,
          width: `${rightPercentage}%`,
          color: rightColor === "#F4B52A" ? "#333" : "white"
        }}
      >
        {rightPercentage > 20 ? `${rightPercentage}%` : ""}
      </div>
    </div>
  )
}
