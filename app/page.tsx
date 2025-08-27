"use client"

import { useState } from "react"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSauces, setSelectedSauces] = useState<{ [key: number]: "left" | "right" | null }>({
    0: null, // Matchup 1: Sauce A vs Sauce B
    1: null, // Matchup 2: Sauce C vs Sauce D
    2: null, // Matchup 3: Sauce E vs Sauce F
    3: null, // Matchup 4: Sauce G vs Sauce H
  })

  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{ [key: number]: { left: number; right: number } }>({})

  //!Could dynamically build this with the database - so the amount of sauce names is dynamic based on the matchup
  const sauceNames = [
    { left: "Sauce A", right: "Sauce B" },
    { left: "Sauce C", right: "Sauce D" },
    { left: "Sauce E", right: "Sauce F" },
    { left: "Sauce G", right: "Sauce H" },
  ]


  // //!Could dynamically build this with the database - so the amount of sauce descriptions is dynamic based on the matchup
  const sauceDescriptions = [
    { left: "Sarah loves Spicy BBQ", right: "Mike prefers Sweet & Sour" },
    { left: "Emma enjoys Honey Mustard", right: "Jake favors Buffalo Ranch" },
    { left: "Alex likes Garlic Aioli", right: "Maya chooses Chipotle Mayo" },
    { left: "Ryan picks Sriracha Lime", right: "Zoe wants Teriyaki Glaze" },
  ]

  const peopleImages = [
    "https://michaelvaughngreen.com/McPollster/peeps/person.png",
    "https://michaelvaughngreen.com/McPollster/peeps/mythic.png",
    "https://michaelvaughngreen.com/McPollster/peeps/person.png",
    "https://michaelvaughngreen.com/McPollster/peeps/mythic.png",
    "https://michaelvaughngreen.com/McPollster/peeps/person.png",
    "https://michaelvaughngreen.com/McPollster/peeps/mythic.png",
    "https://michaelvaughngreen.com/McPollster/peeps/person.png",
    "https://michaelvaughngreen.com/McPollster/peeps/mythic.png",
  ]

  const sauceImages = [
    "https://michaelvaughngreen.com/McPollster/sauces/bbq.png",
    "https://michaelvaughngreen.com/McPollster/sauces/ranch.png",
    "https://michaelvaughngreen.com/McPollster/sauces/spicy.png",
    "https://michaelvaughngreen.com/McPollster/sauces/sweet.png",
    "https://michaelvaughngreen.com/McPollster/sauces/bbq.png",
    "https://michaelvaughngreen.com/McPollster/sauces/ranch.png",
    "https://michaelvaughngreen.com/McPollster/sauces/spicy.png",
    "https://michaelvaughngreen.com/McPollster/sauces/sweet.png",
  ]

  const handleSauceClick = (side: "left" | "right") => {
    setSelectedSauces((prev) => ({
      ...prev,
      [currentStep]: prev[currentStep] === side ? null : side,
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitVote = () => {
    // Generate random results for each matchup
    const newResults: { [key: number]: { left: number; right: number } } = {}
    for (let i = 0; i < 4; i++) {
      const leftPercentage = Math.floor(Math.random() * 101)
      newResults[i] = {
        left: leftPercentage,
        right: 100 - leftPercentage,
      }
    }
    setResults(newResults)
    setShowResults(true)
  }

  const handleBackToVoting = () => {
    setShowResults(false)
    setCurrentStep(0)
  }

  const getButtonStyle = (side: "left" | "right") => ({
    backgroundColor: side === "left" ? "#000000" : "#F4B52A",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
    cursor: "pointer",
    height: "142px", // increased overall sauce container height from 120px to 142px
    transition: "all 0.2s ease",
    width: "100%",
    padding: "4px",
    border: "4px solid " + (side === "left" ? "#000000" : "#F4B52A"),
  })

  const getVoteButtonStyle = () => ({
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "0", // removed padding to use fixed dimensions
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    height: "20px", // fixed height to 20px
    width: "72px", // fixed width to 72px
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })

  const getRandomPercentages = (step: number) => {
    const leftPercentage = Math.floor(Math.random() * 81) + 10 // 10-90%
    return {
      left: leftPercentage,
      right: 100 - leftPercentage,
    }
  }

  const getRandomImages = (step: number, side: "left" | "right") => {
    const baseIndex = step * 2 + (side === "left" ? 0 : 1)
    return {
      person: peopleImages[baseIndex % peopleImages.length],
      sauce: sauceImages[baseIndex % sauceImages.length],
    }
  }

  const currentPercentages = getRandomPercentages(currentStep)

  if (showResults) {
    return ( 
      <main className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
        <div
          className="ad-template"
          style={{
            width: "300px",
            height: "600px",
            backgroundColor: "#DA291C", // Updated red background to hex value DA291C
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            className="content-container"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[0, 1, 2, 3].map((row) => (
              <div key={row} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "8px", alignItems: "center" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "4px",
                    }}
                  >
                    {sauceNames[row].left}
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px",
                      padding: "0 8px",
                    }}
                  >
                    VS
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "4px",
                    }}
                  >
                    {sauceNames[row].right}
                  </div>
                </div>

                <div style={{ display: "flex", height: "20px", borderRadius: "10px", overflow: "hidden" }}>
                  <div
                    style={{
                      backgroundColor: "#FFA500",
                      width: `${results[row].left}%`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {results[row].left > 15 ? `${results[row].left}%` : ""}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#333333",
                      width: `${results[row].right}%`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {results[row].right > 15 ? `${results[row].right}%` : ""}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleBackToVoting}
              style={{
                backgroundColor: "#000000",
                color: "white",
                border: "none",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "auto",
                borderRadius: "6px",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div
        className="ad-template"
        style={{
          width: "300px",
          height: "600px",
          backgroundColor: "#DA291C", // Updated red background to hex value DA291C
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://michaelvaughngreen.com/McPollster/mcArch.svg"
            alt="McDonald's Logo"
            style={{ width: "24px", height: "24px" }} // reduced logo size from 40px to 24px
          />
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "12px",
            height: "380px", // increased height from 348px to 380px to show carousel controls
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              {" "}
              {/* Reduced space-y from 4 to 2 */}
              <button style={getButtonStyle("left")} onClick={() => handleSauceClick("left")}>
                <div
                  style={{
                    height: "112px", // increased image container height from 102px to 112px
                    display: "flex",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    overflow: "hidden",
                    paddingTop: "4px", // Added 4px top padding to the image container
                  }}
                >
                  <div style={{ width: "60%", display: "flex", alignItems: "flex-end" }}>
                    <img
                      src={getRandomImages(currentStep, "left").person || "/placeholder.svg"}
                      alt="Person"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // Changed from "cover" to "contain" to show entire image
                        objectPosition: "bottom",
                      }}
                    />
                  </div>
                  <div style={{ width: "40%", display: "flex", alignItems: "flex-end" }}>
                    <img
                      src={getRandomImages(currentStep, "left").sauce || "/placeholder.svg"}
                      alt="Sauce"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "bottom",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0", // Removed padding from parent row
                    paddingLeft: "12px", // Only left padding for text
                    paddingRight: "4px", // Minimal right padding to align button with image container
                    marginTop: "8px", // 8px spacing from images above
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.8)",
                      whiteSpace: "nowrap", // Prevent text from breaking to second line
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {sauceDescriptions[currentStep].left}
                  </span>
                  <button
                    style={getVoteButtonStyle()}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSauceClick("left")
                    }}
                  >
                    Vote
                  </button>
                </div>
              </button>
              <div
                style={{
                  height: "16px",
                  display: "flex",
                  borderRadius: "6px", // Changed border radius from 50% to 6px
                  overflow: "hidden",
                  margin: "8px auto",
                  width: "100%", // Changed width from 96% to 100%
                }}
              >
                <div
                  style={{
                    backgroundColor: "#000000",
                    width: `${currentPercentages.left}%`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  {currentPercentages.left > 20 ? `${currentPercentages.left}%` : ""}
                </div>
                <div
                  style={{
                    backgroundColor: "#F4B52A",
                    width: `${currentPercentages.right}%`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#333",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  {currentPercentages.right > 20 ? `${currentPercentages.right}%` : ""}
                </div>
              </div>
              <button style={getButtonStyle("right")} onClick={() => handleSauceClick("right")}>
                <div
                  style={{
                    height: "112px", // increased image container height from 102px to 112px
                    display: "flex",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    overflow: "hidden",
                    paddingTop: "4px", // Added 4px top padding to the image container
                  }}
                >
                  <div style={{ width: "60%", display: "flex", alignItems: "flex-end" }}>
                    <img
                      src={getRandomImages(currentStep, "right").person || "/placeholder.svg"}
                      alt="Person"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // Changed from "cover" to "contain" to show entire image
                        objectPosition: "bottom",
                      }}
                    />
                  </div>
                  <div style={{ width: "40%", display: "flex", alignItems: "flex-end" }}>
                    <img
                      src={getRandomImages(currentStep, "right").sauce || "/placeholder.svg"}
                      alt="Sauce"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "bottom",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0", // Removed padding from parent row
                    paddingLeft: "12px", // Only left padding for text
                    paddingRight: "4px", // Minimal right padding to align button with image container
                    marginTop: "8px", // 8px spacing from images above
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(0,0,0,0.6)",
                      whiteSpace: "nowrap", // Prevent text from breaking to second line
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {sauceDescriptions[currentStep].right}
                  </span>
                  <button
                    style={getVoteButtonStyle()}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSauceClick("right")
                    }}
                  >
                    Vote
                  </button>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            {" "}
            {/* Reduced mt from 6 to 4 */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                style={{
                  color: currentStep === 0 ? "#ccc" : "#F4B52A",
                  marginRight: "8px",
                }}
                className="hover:opacity-80 disabled:opacity-30"
              >
                ◀
              </button>

              <span className="text-sm font-medium text-gray-600">Matchup {currentStep + 1} of 4</span>

              <button
                onClick={handleNext}
                disabled={currentStep === 3}
                style={{
                  color: currentStep === 3 ? "#ccc" : "#F4B52A",
                  marginLeft: "8px",
                }}
                className="hover:opacity-80 disabled:opacity-30"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <h1 className="text-white text-xl font-bold mb-2">Sauce Showdown!</h1>
          <p
            className="text-white mb-4"
            style={{ fontSize: "12px", lineHeight: "normal", width: "90%", margin: "0 auto 16px auto" }}
          >
            Vote for the new sauce you want to try and get more votes in the app to unlock exclusive rewards.
          </p>

          <button
            onClick={handleSubmitVote}
            style={{
              backgroundColor: "#F4B52A", // Updated yellow color from #FFD700 to #F4B52A
              color: "#333",
              border: "none",
              borderRadius: "4px",
              padding: "0 24px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              width: "100%",
              height: "36px",
            }}
          >
            Download the App
          </button>
        </div>
      </div>
    </main>
  )
}
