// scripts/populateDatabase.js
const admin = require('firebase-admin');

// Initialize Firebase Admin
// Make sure you have firebase-admin-key.json in your project root
const serviceAccount = require('../firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'sauce-showdown'
});

const db = admin.firestore();

// Matchup data matching your app's expected Firebase schema
// Each matchup contains full sauce data (no references needed)
const matchups = [
  {
    id: 'matchup_1',
    option_a: {
      display_name: "MrBeast's Beast Mode BBQ",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/person.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png'
    },
    option_b: {
      display_name: "Charli's Dance Floor Hot Sauce",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/sweet.png'
    },
    total_votes: 0,
    created_at: "2024-08-26",
    is_active: true
  },
  {
    id: 'matchup_2',
    option_a: {
      display_name: "Dude Perfect's Trick Shot Teriyaki",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/person.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/ranch.png'
    },
    option_b: {
      display_name: "Emma's Coffee Shop Chipotle",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/spicy.png'
    },
    total_votes: 0,
    created_at: "2024-08-26",
    is_active: true
  },
  {
    id: 'matchup_3',
    option_a: {
      display_name: "Gordon's Hell's Kitchen Heat",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/person.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/bbq.png'
    },
    option_b: {
      display_name: "Addison's Sweet & Sassy",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/ranch.png'
    },
    total_votes: 0,
    created_at: "2024-08-26",
    is_active: true
  },
  {
    id: 'matchup_4',
    option_a: {
      display_name: "Ryan's Deadpool Revenge",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/person.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/spicy.png'
    },
    option_b: {
      display_name: "Zendaya's Spider-Verse Spice",
      votes: 0,
      influencer_image: 'https://michaelvaughngreen.com/McPollster/peeps/mythic.png',
      sauce_image: 'https://michaelvaughngreen.com/McPollster/sauces/sweet.png'
    },
    total_votes: 0,
    created_at: "2024-08-26",
    is_active: true
  }
];

// Database population function matching your app's schema
async function populateDatabase() {
  console.log('🚀 Starting database population...');
  try {
    console.log(`📊 Will add ${matchups.length} matchups to the 'matchups' collection`);

    // Step 1: Clear existing matchups (optional - remove if you want to keep existing data)
    console.log('🧹 Clearing existing matchups...');
    
    const existingMatchups = await db.collection('matchups').get();
    const deletePromises = existingMatchups.docs.map(doc => doc.ref.delete());
    
    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
      console.log(`🗑️ Deleted ${deletePromises.length} existing matchups`);
    }

    // Step 2: Add matchups with embedded sauce data
    console.log('🥊 Adding matchups...');
    
    for (const matchup of matchups) {
      const matchupRef = db.collection('matchups').doc(matchup.id);
      await matchupRef.set(matchup);
      console.log(`   ✅ Added: ${matchup.option_a.display_name} vs ${matchup.option_b.display_name}`);
    }
    
    console.log(`✅ Successfully added ${matchups.length} matchups!`);

    // Step 3: Verify the data was added correctly
    console.log('🔍 Verifying data...');
    const addedMatchups = await db.collection('matchups').get();
    n the
    console.log(`📊 Database verification:`);
    console.log(`   Matchups in database: ${addedMatchups.size}`);
    
    // Test a specific matchup structure
    if (addedMatchups.size > 0) {
      const firstMatchup = addedMatchups.docs[0].data();
      console.log(`   Sample matchup structure:`, {
        id: firstMatchup.id,
        option_a_votes: firstMatchup.option_a.votes,
        option_b_votes: firstMatchup.option_b.votes,
        total_votes: firstMatchup.total_votes,
        is_active: firstMatchup.is_active
      });
    }
    
    if (addedMatchups.size !== matchups.length) {
      throw new Error('Data verification failed - counts do not match');
    }
    
    console.log('🎉 Database population completed successfully!');
    console.log('🌐 You can view your data at: https://console.firebase.google.com/project/sauce-showdown/firestore');
    console.log('');
    console.log('🔥 Your app is now ready to use real Firebase data!');
    console.log('   Make sure your .env.local file has the Firebase config keys');
    
  } catch (error) {
    console.error('❌ Error during database population:');
    console.error(error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    // Clean up admin connection
    try {
      await admin.app().delete();
      console.log('🧹 Firebase admin connection closed');
    } catch (err) {
      console.log('Note: Firebase admin connection cleanup completed');
    }
  }
}

// Run the population function
populateDatabase();