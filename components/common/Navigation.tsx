import { useState } from 'react'

interface NavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export function Navigation({ currentStep, totalSteps, onPrevious, onNext }: NavigationProps) {
  const [leftButtonPressed, setLeftButtonPressed] = useState(false)
  const [rightButtonPressed, setRightButtonPressed] = useState(false)

  const handlePrevious = () => {
    setLeftButtonPressed(true)
    setTimeout(() => setLeftButtonPressed(false), 200)
    onPrevious()
  }

  const handleNext = () => {
    setRightButtonPressed(true)
    setTimeout(() => setRightButtonPressed(false), 200)
    onNext()
  }

  return (
    <div className="flex items-center justify-center" style={{ 
     // background: 'linear-gradient(45deg, #FFC72C, #FFD700)',
      color: '#ffffff',
      height: '30px',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      //boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
      border: 'none',
      borderRadius: '12px',
      width: '260px',
      margin: '5px 0px 10px 0px' ,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="">
        <button
          onClick={handlePrevious}
          className="nav-button nav-button-left cursor-pointer"
          style={{
            color: leftButtonPressed ? "#DA020E" : "#FFC72C",
            marginRight: "10px",
            background: leftButtonPressed ? 
              "linear-gradient(45deg, #FFD700, #FFC72C)" : 
              "linear-gradient(45deg, #DA020E, #FF4444)",
            border: "2px solid #FFD700",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            fontSize: "14px",
            fontWeight: "900",
            transition: "all 0.2s ease",
            transform: leftButtonPressed ? "scale(1.05) rotate(-3deg)" : "scale(1) rotate(0deg)",
            boxShadow: leftButtonPressed ? 
              "0 5px 15px rgba(255, 199, 44, 0.5)" : 
              "0 4px 12px rgba(218, 2, 14, 0.3)",
            animation: leftButtonPressed ? "mcdonaldsPress 0.2s ease" : "none"
          }}
        >
          ◀
        </button>

        <span>
          MATCHUP  {currentStep + 1}
        </span>

        <button
          onClick={handleNext}
          className="nav-button nav-button-right cursor-pointer"
          style={{
            color: rightButtonPressed ? "#DA020E" : "#FFC72C",
            marginLeft: "10px",
            background: rightButtonPressed ? 
              "linear-gradient(45deg, #FFD700, #FFC72C)" : 
              "linear-gradient(45deg, #DA020E, #FF4444)",
            border: "2px solid #FFD700",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            fontSize: "14px",
            fontWeight: "900",
            transition: "all 0.2s ease",
            transform: rightButtonPressed ? "scale(1.05) rotate(3deg)" : "scale(1) rotate(0deg)",
            boxShadow: rightButtonPressed ? 
              "0 5px 15px rgba(255, 199, 44, 0.5)" : 
              "0 4px 12px rgba(218, 2, 14, 0.3)",
            animation: rightButtonPressed ? "mcdonaldsPress 0.2s ease" : "none"
          }}
        >
          ▶
        </button>
      </div>
    </div>
  )
}
