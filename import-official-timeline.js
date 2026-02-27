const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAL7evRkNPomJv3Bca2LjLqCawu_j3S5Rc",
  authDomain: "copilota-6d94a.firebaseapp.com",
  databaseURL: "https://copilota-6d94a-default-rtdb.firebaseio.com",
  projectId: "copilota-6d94a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Team aggiornati - 27 Feb 2026
const teams = {
  experience: [
    { id: 'exp-1', teamName: '🦊 Antonella & Bianca' },
    { id: 'exp-2', teamName: '🦉 Eugenio & Sabina' },
    { id: 'exp-3', teamName: '🐰 Rebecca & Antonella' },
    { id: 'exp-4', teamName: '🦎 Norca & Francesco' },
    { id: 'exp-5', teamName: '🐺 Vito & Iacopo' },
    { id: 'exp-8', teamName: '🦋 Ninfa & Ilenia' },
    { id: 'exp-9', teamName: '🦏 Niko & Maurizio' }
  ],
  scaled: [
    { id: 'exp-6', teamName: '🦌 Anna & Mirko' },
    { id: 'exp-7', teamName: '🦡 Marika & Silvia' },
    { id: 'sca-1', teamName: '🦁 Alessio & Beatrice' },
    { id: 'sca-2', teamName: '🐆 Claudia & Aurora' },
    { id: 'sca-3', teamName: '🐻 Matilde & Cristiano' }
  ],
  open: [
    { id: 'ope-1', teamName: '🦈 Marco & Emanuele' },
    { id: 'ope-2', teamName: '🐊 Ludovica & Salvatore' },
    { id: 'ope-3', teamName: '🦂 Moira & Daniele' },
    { id: 'sca-4', teamName: '🐅 Michela & Michele' },
    { id: 'sca-5', teamName: '🦅 Laura & Eugenio' },
    { id: 'sca-6', teamName: '🐗 Simone & Francesco' }
  ]
};

// Timeline
const timeline = [];
let heatCounter = 0;

function addHeat(wodId, wodName, wodCap, category, teamList) {
  heatCounter++;
  timeline.push({
    type: 'heat',
    heatNum: heatCounter,
    wodId,
    wodName,
    wodCap,
    category,
    duration: wodCap,
    teams: teamList.map(t => ({
      id: t.id,
      teamName: t.teamName,
      category
    }))
  });
}

function addPause(label, duration) {
  timeline.push({
    type: 'pause',
    label,
    duration
  });
}

// ========================================
// WOD A - MARLIN (E2MOM 12 min) - Tutti
// ========================================
console.log('📋 Generando WOD A - MARLIN...');

// Experience: 7 team → 3 heat (3+3+1)
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Experience', teams.experience.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Experience', teams.experience.slice(3, 6));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Experience', teams.experience.slice(6, 7));
addPause('Cambio Categoria', 5);

// Scaled: 5 team → 2 heat (3+2)
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Scaled', teams.scaled.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Scaled', teams.scaled.slice(3, 5));
addPause('Cambio Categoria', 5);

// Open: 6 team → 2 heat (3+3)
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Open', teams.open.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Open', teams.open.slice(3, 6));

// ========================================
// PAUSA PRANZO
// ========================================
addPause('🍝 PAUSA PRANZO', 45);

// Reset heat counter per WOD B
heatCounter = 0;

// ========================================
// WOD B - GORILLA SILVERBACK (For Time 12 min)
// ========================================
console.log('📋 Generando WOD B - GORILLA SILVERBACK...');

// Experience: 7 team → 3 heat (3+3+1)
addHeat('wod-b-experience', 'WOD B - GORILLA (Experience)', 12, 'Experience', teams.experience.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-b-experience', 'WOD B - GORILLA (Experience)', 12, 'Experience', teams.experience.slice(3, 6));
addPause('Cambio Team', 3);
addHeat('wod-b-experience', 'WOD B - GORILLA (Experience)', 12, 'Experience', teams.experience.slice(6, 7));
addPause('Cambio Categoria', 5);

// Scaled: 5 team → 2 heat (3+2)
addHeat('wod-b-scaled', 'WOD B - GORILLA (Scaled)', 12, 'Scaled', teams.scaled.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-b-scaled', 'WOD B - GORILLA (Scaled)', 12, 'Scaled', teams.scaled.slice(3, 5));
addPause('Cambio Categoria', 5);

// Open: 6 team → 2 heat (3+3)
addHeat('wod-b-open', 'WOD B - GORILLA (Open)', 12, 'Open', teams.open.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-b-open', 'WOD B - GORILLA (Open)', 12, 'Open', teams.open.slice(3, 6));

// ========================================
// PAUSA
// ========================================
addPause('Preparazione WOD C', 10);

// Reset heat counter per WOD C
heatCounter = 0;

// ========================================
// WOD C - TIGRE SIBERIANA (AMRAP 8 min)
// ========================================
console.log('📋 Generando WOD C - TIGRE SIBERIANA...');

// Experience: 7 team → 3 heat (3+3+1)
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Experience)', 8, 'Experience', teams.experience.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Experience)', 8, 'Experience', teams.experience.slice(3, 6));
addPause('Cambio Team', 3);
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Experience)', 8, 'Experience', teams.experience.slice(6, 7));
addPause('Cambio Categoria', 5);

// Scaled: 5 team → 2 heat (3+2)
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Scaled)', 8, 'Scaled', teams.scaled.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Scaled)', 8, 'Scaled', teams.scaled.slice(3, 5));
addPause('Cambio Categoria', 5);

// Open: 6 team → 2 heat (3+3)
addHeat('wod-c-open', 'WOD C - TIGRE (Open)', 8, 'Open', teams.open.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-c-open', 'WOD C - TIGRE (Open)', 8, 'Open', teams.open.slice(3, 6));

// ========================================
// PREMIAZIONI
// ========================================
addPause('🏆 PREMIAZIONI', 20);

// Upload
async function uploadTimeline() {
  try {
    await set(ref(db, 'ark_timeline'), timeline);
    
    console.log('\n✅ Timeline ufficiale caricata!');
    console.log(`📊 Totale eventi: ${timeline.length}`);
    
    let totalMinutes = 0;
    timeline.forEach(item => {
      totalMinutes += item.duration || 0;
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    console.log(`⏱️ Durata totale: ${hours}h ${mins}min`);
    
    console.log('\n📋 RIEPILOGO:');
    console.log('Experience: 7 team (3 heat)');
    console.log('Scaled: 5 team (2 heat)');
    console.log('Open: 6 team (2 heat)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Errore:', error);
    process.exit(1);
  }
}

uploadTimeline();
