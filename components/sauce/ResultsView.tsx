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
      {matchups.map((matchup) => (
        <div key={matchup.id} className="flex flex-col gap-2">
          {/* Sauce Names */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="bg-white h-15 flex items-center justify-center text-xs font-bold rounded">
              {matchup.leftSauce.name}
            </div>
            <div className="text-white font-bold text-sm text-center px-2">
              VS
            </div>
            <div className="bg-white h-15 flex items-center justify-center text-xs font-bold rounded">
              {matchup.rightSauce.name}
            </div>
          </div>

          {/* Results Bar */}
          <div className="flex h-5 rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-center text-white text-xs font-bold"
              style={{
                backgroundColor: "#FFA500",
                width: `${results[matchup.id].left}%`,
              }}
            >
              {results[matchup.id].left > 15 ? `${results[matchup.id].left}%` : ""}
            </div>
            <div
              className="flex items-center justify-center text-white text-xs font-bold"
              style={{
                backgroundColor: "#333333",
                width: `${results[matchup.id].right}%`,
              }}
            >
              {results[matchup.id].right > 15 ? `${results[matchup.id].right}%` : ""}
            </div>
          </div>
        </div>
      ))}

      {/* Back Button */}
      <button
        onClick={onBackToVoting}
        className="bg-black text-white border-none h-10 flex items-center justify-center cursor-pointer font-bold mt-auto rounded-md hover:bg-gray-800 transition-colors"
      >
        Back
      </button>
    </div>
  )
}
