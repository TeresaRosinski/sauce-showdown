interface AppContainerProps {
  children: React.ReactNode
}

export function AppContainer({ children }: AppContainerProps) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div
        style={{
          padding: "0",  // Remove padding for banner ads
          display: "flex",
          flexDirection: "column", 
          gap: "0",  // Remove gaps for precise control
          height: "600px",  // Fixed height for banner
          width: "300px",   // Fixed width for banner
          overflow: "hidden",
          background: "linear-gradient(180deg, #DA020E 0%, #B8000A 50%, #DA020E 100%)",
        }}
      >
        {children}
      </div>
    </main>
  )
}
