interface NavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export function Navigation({ currentStep, totalSteps, onPrevious, onNext }: NavigationProps) {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="hover:opacity-80 disabled:opacity-30 transition-opacity"
          style={{
            color: currentStep === 0 ? "#ccc" : "#F4B52A",
            marginRight: "8px",
          }}
        >
          ◀
        </button>

        <span className="text-sm font-medium text-gray-600">
          Matchup {currentStep + 1} of {totalSteps}
        </span>

        <button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className="hover:opacity-80 disabled:opacity-30 transition-opacity"
          style={{
            color: currentStep === totalSteps - 1 ? "#ccc" : "#F4B52A",
            marginLeft: "8px",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  )
}
