import { ResultsViewProps } from '@/types'

export function ResultsView({ matchups, results, onBackToVoting }: ResultsViewProps) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {matchups.map((matchup) => {
        // Get results for this matchup with fallback
        const matchupResult = results[matchup.id] || { left: 50, right: 50 }
        
        return (
          <div key={matchup.id} className="flex flex-col gap-2">
            {/* Sauce Names */}
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="bg-white h-15 flex items-center justify-center text-xs font-bold rounded">
                {matchup.leftSauce.sauce_name}
              </div>
              <div className="text-white font-bold text-sm text-center px-2">
                VS
              </div>
              <div className="bg-white h-15 flex items-center justify-center text-xs font-bold rounded">
                {matchup.rightSauce.sauce_name}
              </div>
            </div>

            {/* Results Bar */}
            <div className="flex h-5 rounded-xl overflow-hidden">
              <div
                className="flex items-center justify-center text-white text-xs font-bold"
                style={{
                  backgroundColor: "#FFA500",
                  width: `${matchupResult.left}%`,
                }}
              >
                {matchupResult.left > 15 ? `${matchupResult.left}%` : ""}
              </div>
              <div
                className="flex items-center justify-center text-white text-xs font-bold"
                style={{
                  backgroundColor: "#333333",
                  width: `${matchupResult.right}%`,
                }}
              >
                {matchupResult.right > 15 ? `${matchupResult.right}%` : ""}
              </div>
            </div>
          </div>
        )
      })}

      {/* Back Button */}
      <button
        onClick={onBackToVoting}
        className="text-gray-100 border-none rounded font-bold text-sm cursor-pointer w-full h-9 hover:opacity-90 transition-opacity"
         style={{ backgroundColor: "#000000" }}
      >
        Back To My Choices
      </button>

      <button
        //onClick={onBackToVoting}
        className="text-gray-800 border-none rounded font-bold text-sm cursor-pointer w-full h-9 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#F4B52A" }}
      >
        Download App
      </button>
    </div>
  )
}
