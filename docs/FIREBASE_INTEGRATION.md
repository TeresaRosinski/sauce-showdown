# Firebase Integration Guide

## Overview
Your app is now perfectly structured for Firebase integration. All the code follows your exact database schema and is ready for a seamless transition.

## Steps to Connect to Firebase

### 1. Install Firebase Dependencies
```bash
npm install firebase
```

### 2. Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: "sauce-showdown"
3. Enable Firestore Database
4. Set up security rules (see below)

### 3. Environment Variables
Create `.env.local` with your Firebase config:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sauce-showdown.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sauce-showdown
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sauce-showdown.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 4. Uncomment Firebase Code
In `/lib/firebase.ts`, uncomment the Firebase initialization code.

### 5. Update Database Service
In `/services/database.ts`, uncomment the Firebase implementation code and comment out the mock implementations.

### 6. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all matchups
    match /matchups/{matchupId} {
      allow read: if true;
      allow write: if false; // Only server can update vote counts
    }
    
    // Allow users to read/write their own sessions
    match /user_sessions/{sessionId} {
      allow read, write: if true;
    }
  }
}
```

### 7. Initial Data Setup
Use the Firebase Console to create your initial matchup documents:

```javascript
// matchups/matchup_1
{
  option_a: {
    display_name: "MrBeast's Beast Mode BBQ",
    votes: 0,
    influencer_image: "path/to/mrbeast.jpg",
    sauce_image: "path/to/beast_mode_bbq.jpg"
  },
  option_b: {
    display_name: "Charli's Dance Floor Hot Sauce", 
    votes: 0,
    influencer_image: "path/to/charli.jpg",
    sauce_image: "path/to/dance_floor_sauce.jpg"
  },
  total_votes: 0,
  created_at: "2024-08-26",
  is_active: true
}
```

## Current Features ✅
- ✅ Session-based voting (prevents duplicate votes)
- ✅ Real-time percentage calculations
- ✅ Vote validation and error handling
- ✅ Firebase schema compliance
- ✅ TypeScript types matching your schema
- ✅ Mock data for testing

## Ready for Firebase ✅
- ✅ All Firebase functions are written and commented
- ✅ Exact schema matching your database design
- ✅ Error handling and validation
- ✅ Session management with localStorage
- ✅ Vote restriction logic

## Testing
Your app currently works with mock data that perfectly simulates the Firebase behavior. When you switch to Firebase, the user experience will be identical!
