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

// TEAM DATA
const teams = [
  // EXPERIENCE (7 team)
  { id: 'exp-1', category: 'Experience', number: 1, teamName: 'Antonella & Bianca', members: ['Antonella Santucci', 'Bianca Giangrossi'] },
  { id: 'exp-2', category: 'Experience', number: 2, teamName: 'Maurizio & Sabina', members: ['Maurizio D\'Alessandro', 'Sabina Riocci'] },
  { id: 'exp-3', category: 'Experience', number: 3, teamName: 'Rebecca & Antonella', members: ['Rebecca', 'Antonella Capano'] },
  { id: 'exp-4', category: 'Experience', number: 4, teamName: 'Norca & Francesco', members: ['Norca Di Pietro', 'Francesco di corpo'] },
  { id: 'exp-5', category: 'Experience', number: 5, teamName: 'Vito & Iacopo', members: ['Vito', 'Iacopo Bombero'] },
  { id: 'exp-6', category: 'Experience', number: 6, teamName: 'Anna & Mirko', members: ['Anna Gioia', 'Mirko Picco'] },
  { id: 'exp-7', category: 'Experience', number: 7, teamName: 'Marika & Silvia', members: ['Marika Di Battuto', 'Silvia Diacci'] },
  
  // SCALED (6 team)
  { id: 'sca-1', category: 'Scaled', number: 1, teamName: 'Alessio & Beatrice', members: ['Alessio Zenobi', 'Beatrice'] },
  { id: 'sca-2', category: 'Scaled', number: 2, teamName: 'Claudia & Aurora', members: ['Claudia Miscia', 'Aurora'] },
  { id: 'sca-3', category: 'Scaled', number: 3, teamName: 'Matilde & Cristiano', members: ['Matilde Colarossi', 'Cristiano Arduini'] },
  { id: 'sca-4', category: 'Scaled', number: 4, teamName: 'Michela & Michele', members: ['Michela Di Clemente', 'Michele Taranta'] },
  { id: 'sca-5', category: 'Scaled', number: 5, teamName: 'Laura & Eugenio', members: ['Laura di Clemente', 'Eugenio'] },
  { id: 'sca-6', category: 'Scaled', number: 6, teamName: 'Simone & Francesco', members: ['Simone Mari', 'Francesco Miscia'] },
  
  // OPEN (3 team)
  { id: 'ope-1', category: 'Open', number: 1, teamName: 'Marco & Emanuele', members: ['Marco Marchetti', 'Emanuele'] },
  { id: 'ope-2', category: 'Open', number: 2, teamName: 'Ludovica & Salvatore', members: ['Ludovica', 'Salvatore'] },
  { id: 'ope-3', category: 'Open', number: 3, teamName: 'Moira & Daniele', members: ['Moira', 'Daniele Longobardi'] },
];

// TIMELINE DATA
const timeline = [
  // WOD 1 - MARLIN (tutti fanno WOD A)
  { id: 'wod1-h1', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Experience', heat: 1, time: '09:00', teams: ['exp-1', 'exp-2', 'exp-3'] },
  { id: 'wod1-h2', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Experience', heat: 2, time: '09:15', teams: ['exp-4', 'exp-5'] },
  { id: 'wod1-h3', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Experience', heat: 3, time: '09:30', teams: ['exp-6', 'exp-7'] },
  { id: 'wod1-h4', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Scaled', heat: 4, time: '09:45', teams: ['sca-1', 'sca-2', 'sca-3'] },
  { id: 'wod1-h5', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Scaled', heat: 5, time: '10:00', teams: ['sca-4', 'sca-5', 'sca-6'] },
  { id: 'wod1-h6', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Open', heat: 6, time: '10:15', teams: ['ope-1', 'ope-2', 'ope-3'] },
  
  // WOD 2 - GORILLA SILVERBACK (versione per categoria)
  { id: 'wod2-h1', wodId: 'wod-b-experience', wodName: 'WOD B - GORILLA (Experience)', category: 'Experience', heat: 1, time: '10:30', teams: ['exp-1', 'exp-2', 'exp-3'] },
  { id: 'wod2-h2', wodId: 'wod-b-experience', wodName: 'WOD B - GORILLA (Experience)', category: 'Experience', heat: 2, time: '10:45', teams: ['exp-4', 'exp-5'] },
  { id: 'wod2-h3', wodId: 'wod-b-experience', wodName: 'WOD B - GORILLA (Experience)', category: 'Experience', heat: 3, time: '11:00', teams: ['exp-6', 'exp-7'] },
  { id: 'wod2-h4', wodId: 'wod-b-scaled', wodName: 'WOD B - GORILLA (Scaled)', category: 'Scaled', heat: 4, time: '11:15', teams: ['sca-1', 'sca-2', 'sca-3'] },
  { id: 'wod2-h5', wodId: 'wod-b-scaled', wodName: 'WOD B - GORILLA (Scaled)', category: 'Scaled', heat: 5, time: '11:30', teams: ['sca-4', 'sca-5', 'sca-6'] },
  { id: 'wod2-h6', wodId: 'wod-b-open', wodName: 'WOD B - GORILLA (Open)', category: 'Open', heat: 6, time: '11:45', teams: ['ope-1', 'ope-2', 'ope-3'] },
  
  // WOD 3 - TIGRE SIBERIANA (versione per categoria)
  { id: 'wod3-h1', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Experience)', category: 'Experience', heat: 1, time: '14:00', teams: ['exp-1', 'exp-2', 'exp-3'] },
  { id: 'wod3-h2', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Experience)', category: 'Experience', heat: 2, time: '14:15', teams: ['exp-4', 'exp-5'] },
  { id: 'wod3-h3', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Experience)', category: 'Experience', heat: 3, time: '14:30', teams: ['exp-6', 'exp-7'] },
  { id: 'wod3-h4', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Scaled)', category: 'Scaled', heat: 4, time: '14:45', teams: ['sca-1', 'sca-2', 'sca-3'] },
  { id: 'wod3-h5', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Scaled)', category: 'Scaled', heat: 5, time: '15:00', teams: ['sca-4', 'sca-5', 'sca-6'] },
  { id: 'wod3-h6', wodId: 'wod-c-open', wodName: 'WOD C - TIGRE (Open)', category: 'Open', heat: 6, time: '15:15', teams: ['ope-1', 'ope-2', 'ope-3'] },
  
  // FINALE
  { id: 'finale-exp', wodId: 'finale', wodName: 'WOD FINALE', category: 'Experience', heat: 1, time: '16:00', teams: [], isFinale: true },
  { id: 'finale-sca', wodId: 'finale', wodName: 'WOD FINALE', category: 'Scaled', heat: 2, time: '16:20', teams: [], isFinale: true },
  { id: 'finale-ope', wodId: 'finale', wodName: 'WOD FINALE', category: 'Open', heat: 3, time: '16:40', teams: [], isFinale: true },
];

async function importData() {
  try {
    // Delete existing teams
    console.log('🗑️ Removing old teams...');
    await remove(ref(db, 'ark_teams'));
    
    // Insert teams
    console.log('👥 Inserting teams...');
    const teamsObj = {};
    teams.forEach(t => {
      teamsObj[t.id] = t;
    });
    await set(ref(db, 'ark_teams'), teamsObj);
    
    // Delete existing timeline
    console.log('🗑️ Removing old timeline...');
    await remove(ref(db, 'ark_timeline'));
    
    // Insert timeline
    console.log('📅 Inserting timeline...');
    const timelineObj = {};
    timeline.forEach((t, idx) => {
      timelineObj[t.id] = { ...t, order: idx };
    });
    await set(ref(db, 'ark_timeline'), timelineObj);
    
    console.log('\n✅ Import completato!');
    console.log(`   👥 ${teams.length} team inseriti`);
    console.log(`   📅 ${timeline.length} eventi timeline inseriti`);
    console.log('\n📊 Riepilogo:');
    console.log(`   🌱 Experience: 7 team`);
    console.log(`   💪 Scaled: 6 team`);
    console.log(`   🔥 Open: 3 team`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importData();
