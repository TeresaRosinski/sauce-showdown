// Firebase Schema Types
export interface MatchupOption {
  display_name: string
  influencer_name: string
  sauce_name: string
  votes: number
  percentage?: number
  influencer_image: string
  sauce_image: string
}

export interface FirebaseMatchup {
  id: string
  option_a: MatchupOption
  option_b: MatchupOption
  total_votes: number
  created_at: string
  is_active: boolean
}

export interface VoteCast {
  matchup_id: string
  voted_for: "option_a" | "option_b"
  timestamp: string
}

export interface UserSession {
  session_id: string
  voted_matchups: string[]
  votes_cast: VoteCast[]
  created_at: string
  last_activity: string
}

// Legacy types for current components (we'll migrate these gradually)
export interface Sauce {
  id: string
  influencer_name: string
  sauce_name: string
  imageUrl: string
  personImageUrl: string
}

export interface Matchup {
  id: number
  leftSauce: Sauce
  rightSauce: Sauce
}

export interface MatchupResult {
  matchupId: number
  leftPercentage: number
  rightPercentage: number
}

// Voting types
export type VoteSide = "left" | "right" | null

export interface VoteSelection {
  [matchupId: number]: VoteSide
}

// UI State types
export interface AppState {
  currentStep: number
  selectedSauces: VoteSelection
  showResults: boolean
  results: { [key: number]: { left: number; right: number } }
}

// Component prop types
export interface MatchupCardProps {
  matchup: Matchup
  selectedSide: VoteSide
  onVote: (side: "left" | "right") => void
  currentPercentages: {
    left: number
    right: number
  }
  hasVoted?: boolean
  // Navigation props
  currentStep?: number
  totalSteps?: number
  onPrevious?: () => void
  onNext?: () => void
  // Vote count prop
  totalVotes?: number
}

export interface ResultsViewProps {
  matchups: Matchup[]
  results: { [key: number]: { left: number; right: number } }
  onBackToVoting: () => void
  // Navigation props (optional for backwards compatibility)
  currentStep?: number
  totalSteps?: number
  onPrevious?: () => void
  onNext?: () => void
}

export interface VoteButtonProps {
  onClick: (e: React.MouseEvent) => void
  disabled?: boolean
  isVoted?: boolean
}

export interface ProgressBarProps {
  leftPercentage: number
  rightPercentage: number
  leftColor?: string
  rightColor?: string
}
