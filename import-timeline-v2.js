const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, remove, get } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAL7evRkNPomJv3Bca2LjLqCawu_j3S5Rc",
  authDomain: "copilota-6d94a.firebaseapp.com",
  databaseURL: "https://copilota-6d94a-default-rtdb.firebaseio.com",
  projectId: "copilota-6d94a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Helper: "09:00" -> minuti dal mezzanotte
function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// TEAM DATA - con membri completi
const teams = [
  // EXPERIENCE (7 team)
  { id: 'exp-1', category: 'Experience', number: 1, teamName: 'Antonella & Bianca', member1: 'Antonella Santucci', member2: 'Bianca Giangrossi' },
  { id: 'exp-2', category: 'Experience', number: 2, teamName: 'Maurizio & Sabina', member1: 'Maurizio D\'Alessandro', member2: 'Sabina Riocci' },
  { id: 'exp-3', category: 'Experience', number: 3, teamName: 'Rebecca & Antonella', member1: 'Rebecca', member2: 'Antonella Capano' },
  { id: 'exp-4', category: 'Experience', number: 4, teamName: 'Norca & Francesco', member1: 'Norca Di Pietro', member2: 'Francesco di corpo' },
  { id: 'exp-5', category: 'Experience', number: 5, teamName: 'Vito & Iacopo', member1: 'Vito', member2: 'Iacopo Bombero' },
  { id: 'exp-6', category: 'Experience', number: 6, teamName: 'Anna & Mirko', member1: 'Anna Gioia', member2: 'Mirko Picco' },
  { id: 'exp-7', category: 'Experience', number: 7, teamName: 'Marika & Silvia', member1: 'Marika Di Battuto', member2: 'Silvia Diacci' },
  
  // SCALED (6 team)
  { id: 'sca-1', category: 'Scaled', number: 1, teamName: 'Alessio & Beatrice', member1: 'Alessio Zenobi', member2: 'Beatrice' },
  { id: 'sca-2', category: 'Scaled', number: 2, teamName: 'Claudia & Aurora', member1: 'Claudia Miscia', member2: 'Aurora' },
  { id: 'sca-3', category: 'Scaled', number: 3, teamName: 'Matilde & Cristiano', member1: 'Matilde Colarossi', member2: 'Cristiano Arduini' },
  { id: 'sca-4', category: 'Scaled', number: 4, teamName: 'Michela & Michele', member1: 'Michela Di Clemente', member2: 'Michele Taranta' },
  { id: 'sca-5', category: 'Scaled', number: 5, teamName: 'Laura & Eugenio', member1: 'Laura di Clemente', member2: 'Eugenio' },
  { id: 'sca-6', category: 'Scaled', number: 6, teamName: 'Simone & Francesco', member1: 'Simone Mari', member2: 'Francesco Miscia' },
  
  // OPEN (3 team)
  { id: 'ope-1', category: 'Open', number: 1, teamName: 'Marco & Emanuele', member1: 'Marco Marchetti', member2: 'Emanuele' },
  { id: 'ope-2', category: 'Open', number: 2, teamName: 'Ludovica & Salvatore', member1: 'Ludovica', member2: 'Salvatore' },
  { id: 'ope-3', category: 'Open', number: 3, teamName: 'Moira & Daniele', member1: 'Moira', member2: 'Daniele Longobardi' },
];

// Create team lookup
const teamLookup = {};
teams.forEach(t => teamLookup[t.id] = t);

// TIMELINE UFFICIALE - formato compatibile con l'app
const timeline = [
  // ========== WOD 1 - MARLIN (09:00 - 10:15) ==========
  { type: 'heat', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Experience', heatNum: 1, startTime: parseTime('09:00'), duration: 12, teamIds: ['exp-1', 'exp-2', 'exp-3'] },
  { type: 'pause', duration: 3, startTime: parseTime('09:12'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Experience', heatNum: 2, startTime: parseTime('09:15'), duration: 12, teamIds: ['exp-4', 'exp-5'] },
  { type: 'pause', duration: 3, startTime: parseTime('09:27'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Experience', heatNum: 3, startTime: parseTime('09:30'), duration: 12, teamIds: ['exp-6', 'exp-7'] },
  { type: 'pause', duration: 3, startTime: parseTime('09:42'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Scaled', heatNum: 4, startTime: parseTime('09:45'), duration: 12, teamIds: ['sca-1', 'sca-2', 'sca-3'] },
  { type: 'pause', duration: 3, startTime: parseTime('09:57'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Scaled', heatNum: 5, startTime: parseTime('10:00'), duration: 12, teamIds: ['sca-4', 'sca-5', 'sca-6'] },
  { type: 'pause', duration: 3, startTime: parseTime('10:12'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-a-marlin', wodName: 'WOD A - MARLIN', category: 'Open', heatNum: 6, startTime: parseTime('10:15'), duration: 12, teamIds: ['ope-1', 'ope-2', 'ope-3'] },
  
  // Pausa tra WOD 1 e WOD 2
  { type: 'pause', duration: 3, startTime: parseTime('10:27'), label: 'Pausa tra WOD' },
  
  // ========== WOD 2 - GORILLA (10:30 - 11:45) ==========
  { type: 'heat', wodId: 'wod-b-experience', wodName: 'WOD B - GORILLA (Exp)', category: 'Experience', heatNum: 1, startTime: parseTime('10:30'), duration: 12, teamIds: ['exp-1', 'exp-2', 'exp-3'] },
  { type: 'pause', duration: 3, startTime: parseTime('10:42'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-b-experience', wodName: 'WOD B - GORILLA (Exp)', category: 'Experience', heatNum: 2, startTime: parseTime('10:45'), duration: 12, teamIds: ['exp-4', 'exp-5'] },
  { type: 'pause', duration: 3, startTime: parseTime('10:57'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-b-experience', wodName: 'WOD B - GORILLA (Exp)', category: 'Experience', heatNum: 3, startTime: parseTime('11:00'), duration: 12, teamIds: ['exp-6', 'exp-7'] },
  { type: 'pause', duration: 3, startTime: parseTime('11:12'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-b-scaled', wodName: 'WOD B - GORILLA (Scaled)', category: 'Scaled', heatNum: 4, startTime: parseTime('11:15'), duration: 12, teamIds: ['sca-1', 'sca-2', 'sca-3'] },
  { type: 'pause', duration: 3, startTime: parseTime('11:27'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-b-scaled', wodName: 'WOD B - GORILLA (Scaled)', category: 'Scaled', heatNum: 5, startTime: parseTime('11:30'), duration: 12, teamIds: ['sca-4', 'sca-5', 'sca-6'] },
  { type: 'pause', duration: 3, startTime: parseTime('11:42'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-b-open', wodName: 'WOD B - GORILLA (Open)', category: 'Open', heatNum: 6, startTime: parseTime('11:45'), duration: 12, teamIds: ['ope-1', 'ope-2', 'ope-3'] },
  
  // ========== PAUSA PRANZO ==========
  { type: 'lunch', duration: 102, startTime: parseTime('11:57'), label: '🍽️ PAUSA PRANZO' },
  
  // ========== WOD 3 - TIGRE (14:00 - 15:15) ==========
  { type: 'heat', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Exp)', category: 'Experience', heatNum: 1, startTime: parseTime('14:00'), duration: 8, teamIds: ['exp-1', 'exp-2', 'exp-3'] },
  { type: 'pause', duration: 7, startTime: parseTime('14:08'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Exp)', category: 'Experience', heatNum: 2, startTime: parseTime('14:15'), duration: 8, teamIds: ['exp-4', 'exp-5'] },
  { type: 'pause', duration: 7, startTime: parseTime('14:23'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Exp)', category: 'Experience', heatNum: 3, startTime: parseTime('14:30'), duration: 8, teamIds: ['exp-6', 'exp-7'] },
  { type: 'pause', duration: 7, startTime: parseTime('14:38'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Scaled)', category: 'Scaled', heatNum: 4, startTime: parseTime('14:45'), duration: 8, teamIds: ['sca-1', 'sca-2', 'sca-3'] },
  { type: 'pause', duration: 7, startTime: parseTime('14:53'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-c-scaled-exp', wodName: 'WOD C - TIGRE (Scaled)', category: 'Scaled', heatNum: 5, startTime: parseTime('15:00'), duration: 8, teamIds: ['sca-4', 'sca-5', 'sca-6'] },
  { type: 'pause', duration: 7, startTime: parseTime('15:08'), label: 'Pausa' },
  { type: 'heat', wodId: 'wod-c-open', wodName: 'WOD C - TIGRE (Open)', category: 'Open', heatNum: 6, startTime: parseTime('15:15'), duration: 8, teamIds: ['ope-1', 'ope-2', 'ope-3'] },
  
  // ========== FINALE (16:00 - 17:00) ==========
  { type: 'pause', duration: 37, startTime: parseTime('15:23'), label: 'Attesa Finale' },
  { type: 'heat', wodId: 'finale', wodName: '🏆 FINALE Experience', category: 'Experience', heatNum: 1, startTime: parseTime('16:00'), duration: 15, teamIds: [], isFinale: true },
  { type: 'pause', duration: 5, startTime: parseTime('16:15'), label: 'Pausa' },
  { type: 'heat', wodId: 'finale', wodName: '🏆 FINALE Scaled', category: 'Scaled', heatNum: 2, startTime: parseTime('16:20'), duration: 15, teamIds: [], isFinale: true },
  { type: 'pause', duration: 5, startTime: parseTime('16:35'), label: 'Pausa' },
  { type: 'heat', wodId: 'finale', wodName: '🏆 FINALE Open', category: 'Open', heatNum: 3, startTime: parseTime('16:40'), duration: 15, teamIds: [], isFinale: true },
];

// Expand teamIds to full team objects
const timelineWithTeams = timeline.map((event, idx) => {
  if (event.teamIds) {
    return {
      ...event,
      teams: event.teamIds.map(id => teamLookup[id]).filter(Boolean),
      order: idx
    };
  }
  return { ...event, order: idx };
});

async function importData() {
  try {
    // Delete existing teams
    console.log('🗑️ Removing old teams...');
    await remove(ref(db, 'ark_teams'));
    
    // Insert teams
    console.log('👥 Inserting teams...');
    const teamsObj = {};
    teams.forEach(t => { teamsObj[t.id] = t; });
    await set(ref(db, 'ark_teams'), teamsObj);
    
    // Delete existing timeline
    console.log('🗑️ Removing old timeline...');
    await remove(ref(db, 'ark_timeline'));
    
    // Insert timeline
    console.log('📅 Inserting official timeline...');
    await set(ref(db, 'ark_timeline'), timelineWithTeams);
    
    console.log('\n✅ Import completato!');
    console.log(`   👥 ${teams.length} team`);
    console.log(`   📅 ${timelineWithTeams.length} eventi timeline`);
    
    // Count heats
    const heats = timelineWithTeams.filter(e => e.type === 'heat');
    console.log(`   🏋️ ${heats.length} heat totali`);
    
    console.log('\n📊 Timeline:');
    console.log('   WOD 1 (MARLIN): 09:00 - 10:27');
    console.log('   WOD 2 (GORILLA): 10:30 - 11:57');
    console.log('   🍽️ PRANZO: 12:00 - 14:00');
    console.log('   WOD 3 (TIGRE): 14:00 - 15:23');
    console.log('   🏆 FINALE: 16:00 - 16:55');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importData();
