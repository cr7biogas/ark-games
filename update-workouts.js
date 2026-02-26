const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, remove } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAL7evRkNPomJv3Bca2LjLqCawu_j3S5Rc",
  authDomain: "copilota-6d94a.firebaseapp.com",
  databaseURL: "https://copilota-6d94a-default-rtdb.firebaseio.com",
  projectId: "copilota-6d94a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const workouts = [
  {
    id: 'wod-a-marlin',
    name: 'WOD A - MARLIN',
    type: 'For Reps',
    timeCap: 12,
    totalReps: null,
    categories: ['Open', 'Scaled', 'Experience'],
    description: `E2MOM X 12' (6 Rounds)
1 Round Atleta A - 1 Round Atleta B e così via per 6 rounds totali.

Buy In: 
20 Cal Row (16 Women)
Max Rep C&J

SCORE: Totale C&J

⚠️ PESI VARIANO PER CATEGORIA`,
    order: 1
  },
  {
    id: 'wod-b-open',
    name: 'WOD B - GORILLA SILVERBACK (Open)',
    type: 'For Time',
    timeCap: 12,
    totalReps: 105,
    categories: ['Open'],
    description: `FOR TIME 12'

🔥 ROUND 1:
15 Box Jump Syncro 
10 MU Change As Needed 
15 Clean Syncro 80/55Kg

🔥 ROUND 2:
10 Box Jump Syncro 
15 C2B Change As Needed 
10 Snatch Syncro 70/45Kg

🔥 ROUND 3:
5 Box Jump Syncro 
20 TTB Syncro
5 Thruster Syncro 60/40Kg

SCORE: Tempo per chiudere il circuito, oppure 12 min + reps mancanti`,
    order: 2
  },
  {
    id: 'wod-b-scaled',
    name: 'WOD B - GORILLA SILVERBACK (Scaled)',
    type: 'For Time',
    timeCap: 12,
    totalReps: 90,
    categories: ['Scaled'],
    description: `FOR TIME 12'

💪 ROUND 1:
15 Box Step Syncro 
10 PullUps Change As Needed 
15 Hang Clean Syncro 2 DBs 15/10 KG

💪 ROUND 2:
10 Box Jump Syncro 
15 PullUps Change As Needed 
10 Hang Snatch Syncro 2 DBs 15/10 KG

💪 ROUND 3:
5 Box Jump Syncro 
20 TTB Syncro
5 Thruster Syncro 2 DBs 15/10 KG

SCORE: Tempo per chiudere il circuito, oppure 12 min + reps mancanti`,
    order: 3
  },
  {
    id: 'wod-b-experience',
    name: 'WOD B - GORILLA SILVERBACK (Experience)',
    type: 'For Time',
    timeCap: 12,
    totalReps: 90,
    categories: ['Experience'],
    description: `FOR TIME 12'

🌱 ROUND 1:
15 Box Step Syncro 
10 KTC Change As Needed 
15 Hang Clean Syncro 2 DBs 15/10 KG

🌱 ROUND 2:
10 Box Step Syncro 
20 PushPress Change As Needed 2 DBs 15/10 KG
10 Hang Snatch Syncro 2 DBs 15/10 KG

🌱 ROUND 3:
5 Box Step Syncro 
30 KTC Syncro
5 Thruster Syncro 2 DBs 15/10 KG

SCORE: Tempo per chiudere il circuito, oppure 12 min + reps mancanti`,
    order: 4
  },
  {
    id: 'wod-c-open',
    name: 'WOD C - TIGRE SIBERIANA (Open)',
    type: 'AMRAP',
    timeCap: 8,
    totalReps: null,
    categories: ['Open'],
    description: `AMRAP 8'

DU Change as needed 

⏱️ Allo scattare di ogni minuto:
I due partecipanti devono effettuare 10 Swing Syncro, poi proseguire con max DU

SCORE: Totale DU`,
    order: 5
  },
  {
    id: 'wod-c-scaled-exp',
    name: 'WOD C - TIGRE SIBERIANA (Scaled/Experience)',
    type: 'AMRAP',
    timeCap: 8,
    totalReps: null,
    categories: ['Scaled', 'Experience'],
    description: `AMRAP 8'

SU Change as needed 

⏱️ Allo scattare di ogni minuto:
I due partecipanti devono effettuare 6 Burpees Over the corda Syncro, poi proseguire con max SU

SCORE: Totale SU`,
    order: 6
  }
];

async function updateWorkouts() {
  try {
    // Delete all existing workouts
    console.log('🗑️ Removing old workouts...');
    await remove(ref(db, 'ark_workouts'));
    
    // Insert new workouts
    console.log('📝 Inserting new workouts...');
    const workoutsObj = {};
    workouts.forEach(w => {
      workoutsObj[w.id] = w;
    });
    
    await set(ref(db, 'ark_workouts'), workoutsObj);
    
    console.log('✅ Done! Workouts updated:');
    workouts.forEach(w => {
      console.log(`  - ${w.name} [${w.categories.join(', ')}]`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateWorkouts();
