interface AppContainerProps {
  children: React.ReactNode
}

export function AppContainer({ children }: AppContainerProps) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div
        className="ad-template relative"
        style={{
          width: "300px",
          height: "600px",
          backgroundColor: "#DA291C",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </main>
  )
}
