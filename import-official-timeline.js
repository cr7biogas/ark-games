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

// Team definitions
const teams = {
  experience: [
    { id: 'exp-1', teamName: '🦊 Antonella & Bianca' },
    { id: 'exp-2', teamName: '🦉 Eugenio & Sabina' },
    { id: 'exp-3', teamName: '🐰 Rebecca & Antonella' },
    { id: 'exp-4', teamName: '🦎 Norca & Francesco' },
    { id: 'exp-5', teamName: '🐺 Vito & Iacopo' },
    { id: 'exp-6', teamName: '🦌 Anna & Mirko' },
    { id: 'exp-7', teamName: '🦡 Marika & Silvia' },
    { id: 'exp-8', teamName: '🦋 Ninfa & Ilenia' },
    { id: 'exp-9', teamName: '🦏 Niko & Maurizio' }
  ],
  scaled: [
    { id: 'sca-1', teamName: '🦁 Alessio & Beatrice' },
    { id: 'sca-2', teamName: '🐆 Claudia & Aurora' },
    { id: 'sca-3', teamName: '🐻 Matilde & Cristiano' },
    { id: 'sca-4', teamName: '🐅 Michela & Michele' },
    { id: 'sca-5', teamName: '🦅 Laura & Eugenio' },
    { id: 'sca-6', teamName: '🐗 Simone & Francesco' }
  ],
  open: [
    { id: 'ope-1', teamName: '🦈 Marco & Emanuele' },
    { id: 'ope-2', teamName: '🐊 Ludovica & Salvatore' },
    { id: 'ope-3', teamName: '🦂 Moira & Daniele' }
  ]
};

// Timeline ufficiale - 3 LANES
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

// Experience: 9 team → 3 heat (3+3+3)
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Experience', teams.experience.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Experience', teams.experience.slice(3, 6));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Experience', teams.experience.slice(6, 9));
addPause('Cambio Categoria', 5);

// Scaled: 6 team → 2 heat (3+3)
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Scaled', teams.scaled.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Scaled', teams.scaled.slice(3, 6));
addPause('Cambio Categoria', 5);

// Open: 3 team → 1 heat
addHeat('wod-a-marlin', 'WOD A - MARLIN', 12, 'Open', teams.open);

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

// Experience: versione Experience (9 team → 3 heat)
addHeat('wod-b-experience', 'WOD B - GORILLA (Experience)', 12, 'Experience', teams.experience.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-b-experience', 'WOD B - GORILLA (Experience)', 12, 'Experience', teams.experience.slice(3, 6));
addPause('Cambio Team', 3);
addHeat('wod-b-experience', 'WOD B - GORILLA (Experience)', 12, 'Experience', teams.experience.slice(6, 9));
addPause('Cambio Categoria', 5);

// Scaled: versione Scaled
addHeat('wod-b-scaled', 'WOD B - GORILLA (Scaled)', 12, 'Scaled', teams.scaled.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-b-scaled', 'WOD B - GORILLA (Scaled)', 12, 'Scaled', teams.scaled.slice(3, 6));
addPause('Cambio Categoria', 5);

// Open: versione Open
addHeat('wod-b-open', 'WOD B - GORILLA (Open)', 12, 'Open', teams.open);

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

// Experience: versione Scaled/Experience (9 team → 3 heat)
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Experience)', 8, 'Experience', teams.experience.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Experience)', 8, 'Experience', teams.experience.slice(3, 6));
addPause('Cambio Team', 3);
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Experience)', 8, 'Experience', teams.experience.slice(6, 9));
addPause('Cambio Categoria', 5);

// Scaled: versione Scaled/Experience
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Scaled)', 8, 'Scaled', teams.scaled.slice(0, 3));
addPause('Cambio Team', 3);
addHeat('wod-c-scaled-exp', 'WOD C - TIGRE (Scaled)', 8, 'Scaled', teams.scaled.slice(3, 6));
addPause('Cambio Categoria', 5);

// Open: versione Open
addHeat('wod-c-open', 'WOD C - TIGRE (Open)', 8, 'Open', teams.open);

// ========================================
// FINE + PREMIAZIONI
// ========================================
addPause('🏆 PREMIAZIONI', 20);

// Upload to Firebase
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
    
    // Riepilogo
    console.log('\n📋 RIEPILOGO TIMELINE:');
    console.log('========================');
    
    let wodA = timeline.filter(t => t.wodId === 'wod-a-marlin').length;
    let wodB = timeline.filter(t => t.wodId && t.wodId.includes('wod-b')).length;
    let wodC = timeline.filter(t => t.wodId && t.wodId.includes('wod-c')).length;
    let pauses = timeline.filter(t => t.type === 'pause').length;
    
    console.log(`WOD A - MARLIN: ${wodA} heat`);
    console.log(`WOD B - GORILLA: ${wodB} heat`);
    console.log(`WOD C - TIGRE: ${wodC} heat`);
    console.log(`Pause: ${pauses}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Errore:', error);
    process.exit(1);
  }
}

uploadTimeline();
