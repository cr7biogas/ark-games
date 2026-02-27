// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcWWYXr7qpXWYtfIRnIV-tkU4DcJPLOaE",
  authDomain: "copilota-6d94a.firebaseapp.com",
  projectId: "copilota-6d94a",
  databaseURL: "https://copilota-6d94a-default-rtdb.firebaseio.com",
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, ref, set, get, push, onValue, update, remove, child, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ========== Clock Sync ==========
// Offset between local clock and server (ms)
let clockOffset = 0;

// Get synchronized time (use this instead of Date.now())
export function getSyncedTime() {
  return Date.now() + clockOffset;
}

// Sync clock with Firebase server (continuous sync)
let syncUnsubscribe = null;

export function syncClock() {
  return new Promise((resolve) => {
    try {
      // Use onValue for .info paths - keeps listening for offset changes
      const offsetRef = ref(db, '.info/serverTimeOffset');
      
      // Unsubscribe previous listener if exists
      if (syncUnsubscribe) syncUnsubscribe();
      
      let resolved = false;
      syncUnsubscribe = onValue(offsetRef, (snap) => {
        const newOffset = snap.val() || 0;
        // Only log if offset changed significantly (>100ms)
        if (Math.abs(newOffset - clockOffset) > 100) {
          console.log('Clock synced, offset:', newOffset, 'ms (was', clockOffset, 'ms)');
        }
        clockOffset = newOffset;
        
        if (!resolved) {
          resolved = true;
          resolve(clockOffset);
        }
      }, (error) => {
        console.warn('Clock sync failed:', error);
        if (!resolved) {
          resolved = true;
          resolve(0);
        }
      });
      
      // Timeout fallback for initial sync
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(0);
        }
      }, 3000);
    } catch (e) {
      console.warn('Clock sync error:', e);
      resolve(0);
    }
  });
}

// Force immediate resync (call when timer starts)
export async function resyncClock() {
  return new Promise((resolve) => {
    const offsetRef = ref(db, '.info/serverTimeOffset');
    const unsub = onValue(offsetRef, (snap) => {
      clockOffset = snap.val() || 0;
      unsub();
      resolve(clockOffset);
    }, () => {
      unsub();
      resolve(clockOffset);
    });
    setTimeout(() => { unsub(); resolve(clockOffset); }, 1000);
  });
}

// Export for use in other files (getSyncedTime and syncClock already exported inline)
export { db, ref, set, get, push, onValue, update, remove, child, serverTimestamp };

// ========== Helper Functions ==========

export function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Categories
export const CATEGORIES = ['Open', 'Scaled', 'Experience'];

// Workout types
export const WORKOUT_TYPES = ['AMRAP', 'For Time', 'EMOM'];

// ========== Database Paths ==========
export const PATHS = {
  competition: 'ark_competitions/current',
  athletes: 'ark_teams',
  judges: 'ark_judges',
  scores: 'ark_scores',
  workouts: 'ark_workouts',
  leaderboard: 'ark_leaderboard',
  timer: 'ark_timer',
  timeline: 'ark_timeline',
};
