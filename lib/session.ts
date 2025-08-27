// Session management utilities
// This handles user session tracking to prevent duplicate votes

export function generateSessionId(): string {
  // Create a unique session ID based on timestamp + random string
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  return `user_${timestamp}_${randomString}`
}

export function getOrCreateSessionId(): string {
  // Check if we already have a session ID in localStorage
  if (typeof window !== 'undefined') {
    const existingSession = localStorage.getItem('sauce_session_id')
    if (existingSession) {
      return existingSession
    }
    
    // Create new session ID and store it
    const newSessionId = generateSessionId()
    localStorage.setItem('sauce_session_id', newSessionId)
    return newSessionId
  }
  
  // Fallback for server-side rendering
  return generateSessionId()
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sauce_session_id')
  }
}

// Get session creation time from the session ID
export function getSessionTimestamp(sessionId: string): number {
  const match = sessionId.match(/user_(\d+)_/)
  return match ? parseInt(match[1]) : Date.now()
}
