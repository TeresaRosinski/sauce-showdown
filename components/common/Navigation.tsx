interface NavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export function Navigation({ currentStep, totalSteps, onPrevious, onNext }: NavigationProps) {
  return (
    <div className="flex items-center justify-center" style={{ 
      background: 'linear-gradient(45deg, #FFC72C, #FFD700)',
      color: '#DA020E',
      height: '30px',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
      border: 'none',
      borderRadius: '12px',
      width: '260px',
      margin: '5px 0px 5px 0px' ,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="">
        <button
          onClick={onPrevious}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          style={{
            color: "#DA020E",
            marginRight: "60px",
            background: "none",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ◀
        </button>

        <span>
          MATCHUP  {currentStep + 1}
        </span>

        <button
          onClick={onNext}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          style={{
            color: "#DA020E",
            marginLeft: "60px",
            background: "none",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ▶
        </button>
      </div>
    </div>
  )
}
