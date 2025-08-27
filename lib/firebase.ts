// Firebase configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase only if config is available
let app: any = null
let db: any = null
let analytics: any = null

if (firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
} else {
  console.log('Firebase config not found - using mock data')
}

export { db, analytics }
export default app
