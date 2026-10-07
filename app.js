const modes = {
  cognitive: {
    title: 'Cognitive mode',
    features: [
      ['routine', 'Daily routine reminders'],
      ['meds', 'Medication tracker'],
      ['games', 'Cognitive skills games'],
      ['mood', 'Mood check-in'],
      ['mindfulness', 'Mindfulness practice'],
    ],
  },
  motor: {
    title: 'Motor mode',
    features: [
      ['body', 'Body check-in'],
      ['large', 'Large touch layout'],
      ['voice', 'Persistent voice control'],
      ['motorGames', 'Motor games'],
    ],
  },
  speech: {
    title: 'Speech mode',
    features: [
      ['board', 'Conversation board'],
      ['lessons', 'Guided speech lessons'],
      ['wordBank', 'Word bank'],
    ],
  },
};

// Shared stick-figure rig used to animate each individual stretch. Groups are nested so a
// rotation on a parent joint (e.g. shoulder) carries its children (elbow, hand) with it.
// Builds one stick-figure instance with unique element ids (suffix) so several suggestions can render their own independent animation at once.
function stickFigureSvg(suffix) {
  const id = (name) => `fig-${suffix}-${name}`;
  return '<svg class="stick-figure" viewBox="0 0 200 260" aria-hidden="true">'
    + '<line x1="14" y1="252" x2="186" y2="252" stroke="#d9d4ca" stroke-width="6" stroke-linecap="round"/>'
    + `<g id="${id('root')}">`
    + `<g id="${id('hipL')}"><line x1="100" y1="150" x2="85" y2="195" stroke="#162a3a" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('kneeL')}"><line x1="85" y1="195" x2="80" y2="240" stroke="#162a3a" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('footL')}"><line x1="80" y1="240" x2="63" y2="245" stroke="#162a3a" stroke-width="6" stroke-linecap="round"/></g></g></g>`
    + `<g id="${id('hipR')}"><line x1="100" y1="150" x2="115" y2="195" stroke="#162a3a" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('kneeR')}"><line x1="115" y1="195" x2="120" y2="240" stroke="#162a3a" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('footR')}"><line x1="120" y1="240" x2="137" y2="245" stroke="#162a3a" stroke-width="6" stroke-linecap="round"/></g></g></g>`
    + `<g id="${id('torso')}"><line x1="100" y1="150" x2="100" y2="58" stroke="#162a3a" stroke-width="7" stroke-linecap="round"/>`
    + `<g id="${id('head-group')}"><circle cx="100" cy="40" r="16" fill="#e2735b"/></g>`
    + `<g id="${id('shoulderL')}"><line x1="100" y1="70" x2="72" y2="95" stroke="#167d78" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('elbowL')}"><line x1="72" y1="95" x2="58" y2="125" stroke="#167d78" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('handL')}"><circle cx="58" cy="125" r="7" fill="#167d78"/></g></g></g>`
    + `<g id="${id('shoulderR')}"><line x1="100" y1="70" x2="128" y2="95" stroke="#167d78" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('elbowR')}"><line x1="128" y1="95" x2="142" y2="125" stroke="#167d78" stroke-width="6" stroke-linecap="round"/>`
    + `<g id="${id('handR')}"><circle cx="142" cy="125" r="7" fill="#167d78"/></g></g></g>`
    + '</g></g></svg>';
}

const speechLessonSets = [
  { name: 'Everyday words', words: [['Mango', ['m', 'an', 'go']], ['Morning', ['m', 'or', 'n', 'ing']], ['Maybe', ['m', 'ay', 'be']], ['Map', ['m', 'a', 'p']], ['Banana', ['b', 'a', 'n', 'a', 'na']], ['Paper', ['p', 'a', 'per']], ['Baby', ['b', 'ay', 'be']], ['Happy', ['h', 'a', 'p', 'py']], ['Window', ['w', 'in', 'do']], ['Water', ['w', 'a', 'ter']], ['Open', ['o', 'pen']], ['Apple', ['a', 'p', 'ple']], ['Orange', ['or', 'an', 'ge']], ['Cookie', ['c', 'oo', 'kie']], ['Coffee', ['c', 'of', 'fee']], ['Pillow', ['p', 'il', 'low']], ['Flower', ['fl', 'ow', 'er']], ['Lemon', ['le', 'm', 'on']], ['Music', ['mu', 'sic']], ['Garden', ['gar', 'den']]] },
  { name: 'Helpful phrases', words: [['Hello', ['he', 'l', 'lo']], ['Thank you', ['th', 'ank', 'you']], ['Please', ['p', 'lea', 'se']], ['Sorry', ['sor', 'ry']], ['Welcome', ['wel', 'come']], ['Ready', ['r', 'ea', 'dy']], ['Listen', ['lis', 'ten']], ['Again', ['a', 'gain']], ['Slowly', ['s', 'low', 'ly']], ['Together', ['to', 'ge', 'ther']], ['Friend', ['fr', 'iend']], ['Family', ['fam', 'i', 'ly']], ['Support', ['sup', 'port']], ['Question', ['ques', 'tion']], ['Answer', ['an', 'swer']], ['Comfort', ['com', 'fort']], ['Careful', ['care', 'ful']], ['Patient', ['pa', 'tient']], ['Practice', ['prac', 'tice']], ['Conversation', ['con', 'ver', 'sa', 'tion']]] },
  { name: 'Clear sounds', words: [['Sun', ['s', 'un']], ['Moon', ['m', 'oo', 'n']], ['Rain', ['r', 'ain']], ['Rainbow', ['r', 'ain', 'bow']], ['Tree', ['t', 'ree']], ['Green', ['g', 'reen']], ['Blue', ['b', 'lue']], ['Purple', ['pur', 'ple']], ['Yellow', ['yel', 'low']], ['Circle', ['cir', 'cle']], ['Number', ['num', 'ber']], ['Seven', ['sev', 'en']], ['Bubble', ['bub', 'ble']], ['Little', ['lit', 'tle']], ['Big', ['b', 'ig']], ['Quiet', ['qui', 'et']], ['Loud', ['l', 'ou', 'd']], ['Smile', ['sm', 'ile']], ['Voice', ['v', 'oi', 'ce']], ['Sound', ['s', 'ou', 'nd']]] },
  { name: 'Nature words', words: [['River', ['riv', 'er']], ['Forest', ['for', 'est']], ['Mountain', ['moun', 'tain']], ['Garden', ['gar', 'den']], ['Flower', ['fl', 'ow', 'er']], ['Leaf', ['l', 'eaf']], ['Grass', ['gr', 'ass']], ['Cloud', ['cl', 'oud']], ['Thunder', ['thun', 'der']], ['Lightning', ['light', 'ning']], ['Ocean', ['o', 'cean']], ['Beach', ['beach']], ['Island', ['is', 'land']], ['Sunlight', ['sun', 'light']], ['Snowflake', ['snow', 'flake']], ['Rainbow', ['r', 'ain', 'bow']], ['Breeze', ['breeze']], ['Autumn', ['au', 'tumn']], ['Summer', ['sum', 'mer']], ['Planet', ['plan', 'et']]] },
  { name: 'Action words', words: [['Walk', ['w', 'alk']], ['Reach', ['reach']], ['Stretch', ['stretch']], ['Breathe', ['breathe']], ['Listen', ['lis', 'ten']], ['Speak', ['speak']], ['Write', ['write']], ['Draw', ['draw']], ['Read', ['read']], ['Open', ['o', 'pen']], ['Close', ['close']], ['Choose', ['choose']], ['Share', ['share']], ['Help', ['help']], ['Learn', ['learn']], ['Notice', ['no', 'tice']], ['Remember', ['re', 'mem', 'ber']], ['Imagine', ['i', 'mag', 'ine']], ['Create', ['cre', 'ate']], ['Celebrate', ['cel', 'e', 'brate']]] },
  { name: 'Comfort words', words: [['Safe', ['safe']], ['Kind', ['k', 'ind']], ['Hope', ['hope']], ['Peace', ['peace']], ['Rest', ['rest']], ['Warm', ['warm']], ['Cozy', ['co', 'zy']], ['Gentle', ['gen', 'tle']], ['Quiet', ['qui', 'et']], ['Brave', ['brave']], ['Strong', ['strong']], ['Proud', ['proud']], ['Calm', ['calm']], ['Smile', ['sm', 'ile']], ['Care', ['care']], ['Love', ['love']], ['Trust', ['trust']], ['Welcome', ['wel', 'come']], ['Together', ['to', 'ge', 'ther']], ['You', ['you']]] },
];

const VOICE_PROFILES = [
  { id: 'feminine-1', label: 'Feminine One', gender: 'feminine', pitch: 1.05, rate: 1 },
  { id: 'feminine-2', label: 'Feminine Two', gender: 'feminine', pitch: 1.25, rate: 1.05 },
  { id: 'feminine-3', label: 'Feminine Three', gender: 'feminine', pitch: 0.95, rate: 0.92 },
  { id: 'feminine-4', label: 'Feminine Four', gender: 'feminine', pitch: 1.4, rate: 1.1 },
  { id: 'feminine-5', label: 'Feminine Five', gender: 'feminine', pitch: 1.15, rate: 0.85 },
  { id: 'masculine-1', label: 'Masculine One', gender: 'masculine', pitch: 0.8, rate: 1 },
  { id: 'masculine-2', label: 'Masculine Two', gender: 'masculine', pitch: 0.6, rate: 0.95 },
  { id: 'masculine-3', label: 'Masculine Three', gender: 'masculine', pitch: 0.95, rate: 1.08 },
  { id: 'masculine-4', label: 'Masculine Four', gender: 'masculine', pitch: 0.5, rate: 0.9 },
  { id: 'masculine-5', label: 'Masculine Five', gender: 'masculine', pitch: 0.7, rate: 1.15 },
];
// Best-effort gender guess from a system voice's name so we can group real browser voices into the ten profiles above.
const FEMININE_VOICE_HINTS = /female|woman|zira|samantha|victoria|karen|susan|moira|tessa|fiona|alice|amelie|anna|ava|allison|emma|eva|ida|joana|kate|laura|lisa|mary|monica|paulina|sandy|sara|serena|tina|vicki|veena|salli|kendra|joanna|ivy|kimberly|nicole|aria|zoe|maria|sabina|catherine|hazel|linda/i;
const MASCULINE_VOICE_HINTS = /male|man|david|mark|alex|daniel|fred|george|james|tom|thomas|oliver|ryan|eric|aaron|gordon|justin|matthew|guy|rishi|diego|carlos|jorge|luca|marco|russell|joey|brian|will|arthur|henry/i;
function classifyVoiceGender(voice) { const name = `${voice.name} ${voice.voiceURI}`.toLowerCase(); if (FEMININE_VOICE_HINTS.test(name)) return 'feminine'; if (MASCULINE_VOICE_HINTS.test(name)) return 'masculine'; return 'unknown'; }
let voiceRoster = null;
// Maps each of the ten voice profiles to a real system voice (when available), cycling through the pool so every profile still gets a voice even with a small pool.
function refreshVoiceRoster() {
  if (!('speechSynthesis' in window)) { voiceRoster = {}; return; }
  const allVoices = window.speechSynthesis.getVoices();
  if (!allVoices.length) return;
  const englishVoices = allVoices.filter((voice) => /^en/i.test(voice.lang));
  const usablePool = englishVoices.length ? englishVoices : allVoices;
  const feminineVoices = usablePool.filter((voice) => classifyVoiceGender(voice) === 'feminine');
  const masculineVoices = usablePool.filter((voice) => classifyVoiceGender(voice) === 'masculine');
  const unknownVoices = usablePool.filter((voice) => classifyVoiceGender(voice) === 'unknown');
  const roster = {};
  let feminineIndex = 0;
  let masculineIndex = 0;
  VOICE_PROFILES.forEach((profile) => {
    if (profile.gender === 'feminine') {
      const source = feminineVoices.length ? feminineVoices : (unknownVoices.length ? unknownVoices : usablePool);
      roster[profile.id] = source.length ? source[feminineIndex % source.length] : null;
      feminineIndex += 1;
    } else {
      const source = masculineVoices.length ? masculineVoices : (unknownVoices.length ? unknownVoices : usablePool);
      roster[profile.id] = source.length ? source[masculineIndex % source.length] : null;
      masculineIndex += 1;
    }
  });
  voiceRoster = roster;
}
if ('speechSynthesis' in window) { refreshVoiceRoster(); window.speechSynthesis.onvoiceschanged = refreshVoiceRoster; }
const VOICE_LOCK_KEY = 'openpath-board-voice';
function getLockedVoiceId() { return localStorage.getItem(VOICE_LOCK_KEY) || null; }
function setLockedVoiceId(id) { localStorage.setItem(VOICE_LOCK_KEY, id); }
function getVoiceProfile(id) { return VOICE_PROFILES.find((profile) => profile.id === id) || null; }
const mindfulnessExercises = {
  breathing: { name: 'Guided breathing' },
  bodyScan: { name: 'Body scan' },
  focus: { name: 'Sensory focus' },
};
let mindfulnessTimer;
let mindfulnessFinishTimeout;
let mindfulnessRunning = false;
let mindfulnessComplete = false;
let mindfulnessFinishing = false;
let mindfulnessRemaining = 5 * 60;

const featureContent = {
  routine: { kicker: 'Cognitive mode / 02', title: 'Keep the next thing close.', lede: 'Set a small reminder for a routine. It will stay on this device and can ask for notification permission when needed.', body: '<form class="form-stack" id="routineForm"><label class="field-label">Routine name<input name="name" required placeholder="Get ready for bed" /></label><label class="field-label">Time<input name="time" type="time" required /></label><button class="primary-button" type="submit">Add routine reminder</button></form><div class="results" id="routineResults"></div>' },
  meds: { kicker: 'Cognitive mode / 03', title: 'A gentle nudge for medication.', lede: 'Track a medication and its scheduled time. This tool supports memory; it does not replace advice from a doctor or pharmacist.', body: '<form class="form-stack" id="medForm"><label class="field-label">Medication name<input name="name" required placeholder="Medication name" /></label><label class="field-label">Dose note<input name="dose" placeholder="Optional dose or instruction" /></label><label class="field-label">Reminder time<input name="time" type="time" required /></label><button class="primary-button" type="submit">Save medication reminder</button></form><div class="results" id="medResults"></div>' },
  games: { kicker: 'Cognitive mode / 04', title: 'Practice a skill, one round at a time.', lede: 'Choose a memory game to practice. This is practice, not a medical assessment.', body: '<div class="game-selector" role="group" aria-label="Choose a cognitive game"><button class="choice-button" data-game="number" type="button">Number memory</button><button class="choice-button" data-game="items" type="button">Item recall</button></div><div class="tool-card memory-game" id="numberGame" hidden><div class="memory-game-heading"><h4>Number memory</h4><div class="memory-game-stats"><span id="gameBest">Best: 0</span><span id="gameLevel">4 numbers</span></div></div><p id="gamePrompt">Press start to see your first sequence.</p><div class="number-sequence" id="gameSequence" aria-live="polite"></div><label class="field-label memory-answer" for="gameAnswer">Type the numbers in order<input id="gameAnswer" type="text" inputmode="numeric" autocomplete="off" disabled /></label><p class="game-feedback" id="gameResult" aria-live="polite"></p><div class="action-row"><button class="primary-button" data-action="start-game" type="button">Start game</button></div><div class="item-game-over" id="numberGameOver" hidden><strong id="numberGameOverTitle">Round Over</strong><span id="numberGameOverDetail">You lost.</span><p id="numberGameOverScore"></p></div></div><div class="tool-card item-game" id="itemGame" hidden><div class="memory-game-heading"><h4>Item recall</h4><div class="memory-game-stats"><span id="itemBest">Best: 0 / 10</span><span id="itemScore">0 / 10 correct</span></div></div><p id="itemPrompt">Press start to open the chest and study the items.</p><div class="item-display" id="itemDisplay"><div class="item-chest" aria-hidden="true">&#128081;</div><div class="item-countdown" id="itemCountdown">30</div><ul class="item-list" id="itemList"></ul></div><div class="item-game-over" id="itemGameOver" hidden><strong id="itemGameOverTitle">Game Over</strong><span id="itemGameOverDetail">That item was not in the chest.</span><p id="itemGameOverScore"></p></div><form class="form-stack item-answer" id="itemRecallForm" hidden><label class="field-label" for="itemAnswer">Name an item you remember<input id="itemAnswer" type="text" autocomplete="off" /></label><p class="game-feedback" id="itemResult" aria-live="polite"></p><button class="primary-button" type="submit">Submit item</button></form><div class="action-row"><button class="primary-button" data-action="start-items" type="button">Start game</button></div></div>' },
  mood: { kicker: 'Cognitive mode / 05', title: 'Check in with yourself.', lede: 'Choose the feeling that is closest right now. Each time you pick it, you will get a different small, optional exercise to support your next moment.', body: '<div class="choice-grid" id="moodChoices"><button class="choice-button" data-mood="happy" type="button">Happy</button><button class="choice-button" data-mood="sad" type="button">Sad</button><button class="choice-button" data-mood="calm" type="button">Calm</button><button class="choice-button" data-mood="overwhelmed" type="button">Overwhelmed</button><button class="choice-button" data-mood="tired" type="button">Tired</button><button class="choice-button" data-mood="angry" type="button">Angry</button><button class="choice-button" data-mood="stressed" type="button">Stressed</button><button class="choice-button" data-mood="excited" type="button">Excited</button><button class="choice-button" data-mood="nervous" type="button">Nervous</button></div><div class="tool-card" id="moodResult" hidden><h4>Your small next step</h4><p></p></div>' },
  mindfulness: { kicker: 'Cognitive mode / 06', title: 'Make a little room to arrive.', lede: 'Choose a practice and a length that feels manageable. You can pause or reset whenever you need to.', body: '<div class="mindfulness-controls"><label class="field-label" for="mindfulnessExercise">Practice<select id="mindfulnessExercise"><option value="breathing">Guided breathing</option><option value="bodyScan">Body scan</option><option value="focus">Sensory focus</option></select></label><label class="field-label" for="mindfulnessDuration">Practice length<select id="mindfulnessDuration"><option value="1">1 minute</option><option value="3">3 minutes</option><option value="5" selected>5 minutes</option><option value="10">10 minutes</option><option value="15">15 minutes</option><option value="30">30 minutes</option></select></label><label class="field-label" for="mindfulnessBreathLength">Breath length (inhale and exhale)<select id="mindfulnessBreathLength"><option value="3">3 seconds</option><option value="4" selected>4 seconds</option><option value="5">5 seconds</option><option value="6">6 seconds</option><option value="8">8 seconds</option></select></label></div><div class="mindfulness-stage" id="mindfulnessStage" data-exercise="breathing" data-running="false" role="img" aria-label="Guided breathing animation"><div class="mindfulness-orbit" aria-hidden="true"></div><div class="mindfulness-core" aria-hidden="true"></div><div class="mindfulness-body-figure" aria-hidden="true"><i class="body-head"></i><i class="body-neck"></i><i class="body-torso"></i><i class="body-arm body-arm-left"></i><i class="body-arm body-arm-right"></i><i class="body-leg body-leg-left"></i><i class="body-leg body-leg-right"></i></div><div class="mindfulness-focus-scene" aria-hidden="true"><i class="focus-object focus-object-one"></i><i class="focus-object focus-object-two"></i><i class="focus-object focus-object-three"></i><i class="focus-object focus-object-four"></i><i class="focus-object focus-object-five"></i></div><div class="mindfulness-sparks" aria-hidden="true"><i></i><i></i><i></i></div></div><div class="mindfulness-readout"><strong id="mindfulnessTime">05:00</strong><span id="mindfulnessPhase">Ready when you are.</span></div><div class="action-row"><button class="primary-button" id="mindfulnessStart" type="button">Start practice</button><button class="secondary-button" id="mindfulnessReset" type="button">Reset</button></div><p class="mindfulness-status" id="mindfulnessStatus" aria-live="polite">Choose start when you feel ready.</p>' },
  body: { kicker: 'Motor mode / 01', title: 'Tell us what your body needs today.', lede: 'Choose every area that feels less comfortable and every area that feels strong. Each pick draws a different real exercise or stretch from a varied pool, so it will not repeat the same suggestion each time.', body: '<div class="choice-grid" id="bodyChoices"><button class="choice-button" data-body="Neck" type="button">Neck</button><button class="choice-button" data-body="Shoulders" type="button">Shoulders</button><button class="choice-button" data-body="Elbows" type="button">Elbows</button><button class="choice-button" data-body="Wrists" type="button">Wrists</button><button class="choice-button" data-body="Hands" type="button">Hands</button><button class="choice-button" data-body="Back" type="button">Back</button><button class="choice-button" data-body="Hips" type="button">Hips</button><button class="choice-button" data-body="Knees" type="button">Knees</button><button class="choice-button" data-body="Ankles" type="button">Ankles</button><button class="choice-button" data-body="Feet" type="button">Feet</button></div><button class="primary-button" data-action="mobility" type="button">Suggest mobility support</button><div class="tool-card" id="mobilityResult" hidden><h4>Your suggested stretch</h4><div class="mobility-cards" id="mobilityCards"></div></div>' },
  large: { kicker: 'Motor mode / 03', title: 'More room. More control.', lede: 'Motor Mode is designed with bigger targets and more separation for people with tremors or reduced fine motor control.', body: '<div class="tool-card"><h4>Large touch layout</h4><p>Tap the plus or minus button to make every button and control across the app bigger or smaller. Your choice is saved on this device.</p><div class="touch-scale-control"><div class="touch-scale-buttons"><button class="touch-scale-button" id="touchScaleMinus" type="button" aria-label="Make touch targets smaller">&minus;</button><div class="meter"><span id="touchScaleMeter"></span></div><button class="touch-scale-button" id="touchScalePlus" type="button" aria-label="Make touch targets bigger">+</button></div><p id="touchScaleLabel"></p></div></div>' },
  voice: { kicker: 'Motor mode / 04', title: 'Use your voice when touch is hard.', lede: 'The voice button stays at the top of the app. Try it now, or use the button below to test browser voice recognition.', body: '<div class="tool-card"><h4>Voice control</h4><p>Say “cognitive mode”, “motor mode”, or “speech mode” to jump straight there. Tap the button again to stop listening. Allow microphone access for this site if your browser asks.</p><p class="field-hint">Works in Chrome or Edge on a computer or Android phone; needs the app served over https:// or localhost. No browser on iPhone/iPad supports this yet.</p><div class="action-row"><button class="primary-button" data-action="listen" type="button">Start listening</button></div></div>' },
  motorGames: { kicker: 'Motor mode / 05', title: 'Sharpen your speed and steady control.', lede: 'Choose a motor game: Whack-a-mole tests reaction speed, and Precision drawing tests steady, accurate control. Whack moles with your mouse cursor or a screen tap, or trace a randomized guide shape as closely as you can before time runs out. This is practice, not a medical assessment.', body: '<div class="game-selector" role="group" aria-label="Choose a motor game"><button class="choice-button" data-motor-game="whack" type="button">Whack-a-mole</button><button class="choice-button" data-motor-game="draw" type="button">Precision drawing</button></div><div class="tool-card motor-game" id="motorWhackGame"><div class="memory-game-heading"><h4>Whack-a-mole</h4><div class="memory-game-stats"><span id="motorBest">Best: 0 moles</span><span id="motorLevelLabel">Level 1 of 10</span><span id="motorClock">0:30</span><span id="motorStrikes">Strikes: 0 / 5</span></div></div><p>How to play: whack each mole with your mouse cursor or a screen tap before it disappears. Missing a mole costs one strike, and strikes carry over between levels. Run out of all 5 strikes and the game ends, so clear all 10 levels before that happens.</p><p id="motorPrompt">Press start to begin level 1. Whack moles the moment they appear!</p><div class="motor-board" id="motorBoard"></div><p class="game-feedback" id="motorResult" aria-live="polite"></p><div class="action-row"><button class="primary-button" data-action="start-motor" type="button">Start game</button></div><div class="item-game-over" id="motorGameOver" hidden><strong id="motorGameOverTitle">Round Over</strong><span id="motorGameOverDetail"></span><p id="motorGameOverScore"></p></div></div><div class="tool-card motor-game" id="motorDrawGame" hidden><div class="memory-game-heading"><h4>Precision drawing</h4><div class="memory-game-stats"><span id="drawBest">Best: 0 levels cleared</span><span id="drawLevelLabel">Level 1 of 6</span><span id="drawClock">Study: 10s</span></div></div><p>How to play: study the thick, see-through guide shape, then trace over it as closely as you can with your mouse or a screen tap before time runs out. Press Confirm drawing when you are done. You need 90% accuracy to clear each level. The guide gets thinner, the shapes get longer, and the clocks get shorter as you go.</p><p id="drawPrompt">Press start to see level 1 shape.</p><div class="motor-board draw-board" id="drawBoard"><canvas id="drawCanvas"></canvas><div class="draw-phase-badge" id="drawPhaseBadge"></div><div class="draw-pass-overlay" id="drawPassOverlay" hidden></div></div><p class="game-feedback" id="drawResult" aria-live="polite"></p><div class="action-row"><button class="primary-button" data-action="start-draw" type="button">Start game</button><button class="secondary-button" data-action="clear-draw" type="button">Clear drawing</button><button class="primary-button" data-action="confirm-draw" type="button">Confirm drawing</button></div><div class="item-game-over" id="drawGameOver" hidden><strong id="drawGameOverTitle">Round Over</strong><span id="drawGameOverDetail"></span><p id="drawGameOverScore"></p></div></div>' },
  board: { kicker: 'Speech mode / 02', title: 'Let the app say it for you.', lede: 'Type a message or choose a saved quick response. The browser will read it aloud so you can stay part of the conversation.', body: '<div class="form-stack"><label class="field-label">Your message<textarea id="speechText" placeholder="Type what you want to say..."></textarea></label><div class="action-row"><button class="primary-button" data-action="speak-text" type="button">Speak this aloud</button><button class="secondary-button" data-action="save-phrase" type="button">Save as quick response</button></div><div class="results" id="phraseResults"></div><div class="tool-card voice-picker"><h4>Conversation voice</h4><p>Pick a voice, test how it sounds, then choose it as your conversation board voice. You can change it again at any time, even after choosing one.</p><p class="voice-locked-label" id="voiceLockedLabel"></p><label class="field-label" for="voiceSelect">Voice<select id="voiceSelect"></select></label><div class="action-row"><button class="secondary-button" id="voiceTestButton" type="button">Test voice</button><button class="primary-button" id="voiceChooseButton" type="button">Choose voice</button></div></div></div>' },
  lessons: { kicker: 'Speech mode / 03', title: 'See it. Hear it. Try it.', lede: 'Practice each mouth movement in a word, then listen at a speed that feels comfortable.', body: '<div class="lesson-controls"><label class="field-label" for="lessonSet">Word set<select id="lessonSet"></select></label><label class="field-label" for="lessonSpeed">Playback speed<select id="lessonSpeed"><option value="0.25">0.25x very slow</option><option value="0.5">0.5x slower</option><option value="1" selected>1x normal</option><option value="1.5">1.5x faster</option><option value="2">2x fastest</option></select></label></div><div class="mouth-lesson" aria-live="polite"><div class="mouth-preview"><div class="mouth-demo" id="mouthDemo" aria-label="Mouth formation for the current sound"><span class="mouth-lips"></span><span class="mouth-teeth"></span><span class="mouth-tongue"></span></div><div class="mouth-legend" aria-label="Mouth formation color legend"><span><i class="legend-swatch legend-mouth"></i>Red - mouth</span><span><i class="legend-swatch legend-tongue"></i>Pink - tongue</span><span><i class="legend-swatch legend-lips"></i>Grey - lips</span></div></div><div class="lesson-parts" id="lessonParts"></div></div><div class="tool-card"><div class="memory-game-heading"><h4 id="lessonWord">Mango</h4><span id="lessonProgress">1 of 20</span></div><p id="lessonPartHint">Select a sound part to see how the mouth moves.</p><div class="action-row"><button class="primary-button" data-action="speak-lesson" type="button">Play word aloud</button><button class="secondary-button" data-action="next-lesson" type="button">Next word</button></div></div>' },
  wordBank: { title: 'Collect the words you are learning.', lede: 'Add any word that feels hard or new. Tap a saved word to hear it spoken aloud.', body: '<form class="form-stack" id="wordForm"><label class="field-label" for="wordInput">Hard word<input id="wordInput" name="word" required maxlength="40" autocomplete="off" placeholder="Type a word..." /></label><button class="primary-button" type="submit">Add to word bank</button></form><div class="tool-card word-detail" id="wordDetail" hidden><h4 id="wordDetailTitle"></h4><div class="action-row"><button class="primary-button" data-word-hear="1" type="button">Hear it</button><button class="secondary-button" data-word-hear="0.5" type="button">Hear it slowly</button></div></div><div class="results" id="wordList"></div>' },
};

const cp = (...codes) => codes.map((code) => String.fromCodePoint(code));
// [main picture, banner color, three small accent pictures] for each tool page and button.
const FEATURE_ART = {
  routine: [cp(0x23F0)[0], '#fff0e8', cp(0x1F305, 0x2705, 0x2728)],
  meds: [cp(0x1F48A)[0], '#eafbf3', cp(0x1FA7A, 0x1F4A7, 0x2728)],
  games: [cp(0x1F9E9)[0], '#fff8dc', cp(0x1F9E0, 0x1F3B2, 0x2B50)],
  mood: [cp(0x1F308)[0], '#dcecf0', cp(0x1F60A, 0x2601, 0x1F495)],
  mindfulness: [cp(0x1F33F)[0], '#eafbf3', cp(0x1F338, 0x1F9D8, 0x1F343)],
  body: [cp(0x1F9D8)[0], '#fff0e8', cp(0x1F4AA, 0x1F9B5, 0x2728)],
  large: [cp(0x1F50D)[0], '#dcecf0', cp(0x1F446, 0x2795, 0x2B50)],
  voice: [cp(0x1F3A4)[0], '#fff8dc', cp(0x1F50A, 0x1F4AC, 0x2728)],
  motorGames: [cp(0x1F3AF)[0], '#eafbf3', cp(0x1F528, 0x1F3C6, 0x2B50)],
  board: [cp(0x1F4AC)[0], '#dcecf0', cp(0x1F5E8, 0x1F44B, 0x1F50A)],
  lessons: [cp(0x1F444)[0], '#fff0e8', cp(0x1F442, 0x1F4D6, 0x2728)],
  wordBank: [cp(0x1F4DA)[0], '#fff8dc', cp(0x1F4DD, 0x1F4A1, 0x2B50)],
};
function featureArtHtml(id) { const art = FEATURE_ART[id]; if (!art) return ''; return `<div class="feature-art" style="--art-bg:${art[1]}" aria-hidden="true"><span class="art-accent art-accent-1">${art[2][0]}</span><span class="art-accent art-accent-2">${art[2][1]}</span><span class="art-accent art-accent-3">${art[2][2]}</span><span class="art-main">${art[0]}</span></div>`; }

let activeMode = 'cognitive';
let activeFeature = 'routine';
let gamePattern = [];
let gameLength = 4;
let itemRoundItems = [];
let itemRoundFound = [];
let itemTimer;
let itemGameOver = false;
const HIGH_SCORE_KEYS = { number: 'openpath-highscore-number', items: 'openpath-highscore-items', motor: 'openpath-highscore-motor', draw: 'openpath-highscore-draw' };
let motorLevel = 1;
let motorHits = 0;
let motorLevelHits = 0;
let motorStrikes = 0;
const MOTOR_MAX_STRIKES = 5;
const MOTOR_LEVEL_SECONDS = 30;
const MOTOR_LEVEL_PAUSE_MS = 2600;
let motorGameActive = false;
let motorLevelInterval;
let motorMoleTimer;
const MOTOR_DRAW_LEVELS = 6;
let motorDrawActive = false;
let motorDrawLevel = 1;
let motorDrawPhase = 'idle';
let motorDrawTargetPath = [];
let motorDrawUserPoints = [];
let motorDrawDrawing = false;
let motorDrawLastPixel = null;
let motorDrawPhaseInterval;
let motorDrawPhaseTimer;
const LOSE_ENCOURAGEMENTS = ['Nice effort!', 'Good try!', 'So close!', 'Keep going!', 'Great attempt!'];
const GAME_SUCCESS_MESSAGES = {
  number: ['Correct! You got it. Now try {count} numbers.', 'Nice work! The next round has {count} numbers.', 'That is right! Ready for {count} numbers?', 'Great recall! Keep going with {count} numbers.'],
  items: ['Correct! Name another item when you are ready.', 'You remembered it! What other item can you find?', 'Nice recall! Keep searching your memory.', 'That one is in the chest. Try to remember another.'],
};
const lastGameSuccessMessage = new Map();
function getHighScore(game) { return Number(localStorage.getItem(HIGH_SCORE_KEYS[game])) || 0; }
function setHighScore(game, score) { localStorage.setItem(HIGH_SCORE_KEYS[game], String(score)); }
function pluralize(count, word) { return `${count} ${word}${count === 1 ? '' : 's'}`; }
function randomFrom(list) { return list[Math.floor(Math.random() * list.length)]; }
function nextGameSuccessMessage(game, values = {}) { const messages = GAME_SUCCESS_MESSAGES[game]; const previous = lastGameSuccessMessage.get(game); const choices = messages.length > 1 ? messages.filter((message) => message !== previous) : messages; const template = randomFrom(choices); lastGameSuccessMessage.set(game, template); return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? ''); }
function buildScoreOutcome(game, score, unitWord) {
  const previousBest = getHighScore(game);
  if (score > previousBest) {
    const gap = score - previousBest;
    setHighScore(game, score);
    return { headline: 'New high score!', detail: previousBest === 0 ? `You set your first high score: ${pluralize(score, unitWord)}.` : `You beat your old best by ${pluralize(gap, unitWord)}. New high score: ${pluralize(score, unitWord)}!`, previousBest };
  }
  const gap = previousBest - score;
  return { headline: randomFrom(LOSE_ENCOURAGEMENTS), detail: gap === 0 ? `You matched your best score of ${pluralize(previousBest, unitWord)}. One more try could set a new record!` : `You were ${pluralize(gap, unitWord)} away from your best score of ${pluralize(previousBest, unitWord)}. You can beat it next round!`, previousBest };
}
function updateGameBestDisplay() { const el = $('#gameBest'); if (el) el.textContent = `Best: ${pluralize(getHighScore('number'), 'digit')}`; }
function updateItemBestDisplay() { const el = $('#itemBest'); if (el) el.textContent = `Best: ${getHighScore('items')} / 10`; }
function updateMotorBestDisplay() { const el = $('#motorBest'); if (el) el.textContent = `Best: ${pluralize(getHighScore('motor'), 'mole')}`; }
function updateMotorStrikeDisplay() { const el = $('#motorStrikes'); if (el) el.textContent = `Strikes: ${motorStrikes} / ${MOTOR_MAX_STRIKES}`; }
// Moles show for less time each level: level 1 gives almost 1.5s, level 10 drops to under half a second.
function motorMoleDurationForLevel(level) { return Math.max(450, 1450 - (level - 1) * 110); }
function clearMotorTimers() { window.clearInterval(motorLevelInterval); window.clearTimeout(motorMoleTimer); motorLevelInterval = undefined; motorMoleTimer = undefined; }
function updateMotorHud(secondsLeft) { const levelLabel = $('#motorLevelLabel'); if (levelLabel) levelLabel.textContent = `Level ${motorLevel} of 10`; const clock = $('#motorClock'); if (clock) clock.textContent = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`; }
function spawnMotorMole() {
  const board = $('#motorBoard');
  if (!board || !motorGameActive) return;
  board.innerHTML = '';
  const mole = document.createElement('button');
  mole.type = 'button';
  mole.className = 'mole';
  mole.setAttribute('aria-label', 'Whack the mole');
  mole.textContent = '\u{1F439}';
  mole.style.left = `${6 + Math.random() * 82}%`;
  mole.style.top = `${6 + Math.random() * 70}%`;
  board.appendChild(mole);
  requestAnimationFrame(() => mole.classList.add('is-visible'));
  motorMoleTimer = window.setTimeout(() => { if (mole.isConnected) mole.remove(); registerMotorMiss(); }, motorMoleDurationForLevel(motorLevel));
}
function registerMotorMiss() {
  if (!motorGameActive) return;
  motorStrikes += 1;
  updateMotorStrikeDisplay();
  if (motorStrikes >= MOTOR_MAX_STRIKES) { endMotorGame(false); return; }
  setFeedback('#motorResult', `Missed! That's strike ${motorStrikes} of ${MOTOR_MAX_STRIKES}.`, 'is-warning');
  spawnMotorMole();
}
function handleMotorBoardPointerDown(event) {
  if (!motorGameActive) return;
  const mole = event.target.closest('.mole');
  if (!mole) return;
  event.preventDefault();
  motorHits += 1;
  motorLevelHits += 1;
  window.clearTimeout(motorMoleTimer);
  mole.remove();
  setFeedback('#motorResult', 'Whacked!', 'is-success');
  spawnMotorMole();
}
function startMotorLevel() {
  clearMotorTimers();
  motorLevelHits = 0;
  const board = $('#motorBoard'); if (board) board.innerHTML = '';
  updateMotorHud(MOTOR_LEVEL_SECONDS);
  setFeedback('#motorResult', '');
  runMotorCountdown(3);
}
// Counts 3, 2, 1, Go! before moles start spawning so the player isn't caught off guard on the first mole.
function runMotorCountdown(remaining) {
  if (!motorGameActive) return;
  const prompt = $('#motorPrompt');
  if (remaining > 0) {
    if (prompt) prompt.textContent = `Level ${motorLevel} starts in ${remaining}...`;
    showMotorCountdownOverlay(String(remaining), false);
    motorMoleTimer = window.setTimeout(() => runMotorCountdown(remaining - 1), 800);
    return;
  }
  if (prompt) prompt.textContent = `Level ${motorLevel}: get ready!`;
  showMotorCountdownOverlay('Go!', true);
  motorMoleTimer = window.setTimeout(beginMotorLevelPlay, 500);
}
// Replaces the board with a large, animated number/word so the countdown is impossible to miss.
function showMotorCountdownOverlay(text, isGo) {
  const board = $('#motorBoard');
  if (!board) return;
  board.innerHTML = `<div class="motor-countdown ${isGo ? 'is-go' : ''}">${text}</div>`;
}
function beginMotorLevelPlay() {
  if (!motorGameActive) return;
  let secondsLeft = MOTOR_LEVEL_SECONDS;
  updateMotorHud(secondsLeft);
  const prompt = $('#motorPrompt'); if (prompt) prompt.textContent = `Level ${motorLevel}: whack as many moles as you can in 30 seconds.`;
  spawnMotorMole();
  motorLevelInterval = window.setInterval(() => {
    secondsLeft -= 1;
    updateMotorHud(secondsLeft);
    if (secondsLeft <= 0) advanceMotorLevel();
  }, 1000);
}
function advanceMotorLevel() {
  clearMotorTimers();
  const board = $('#motorBoard'); if (board) board.innerHTML = '';
  if (motorLevel >= 10) { endMotorGame(true); return; }
  const levelJustFinished = motorLevel;
  const levelHits = motorLevelHits;
  setFeedback('#motorResult', '', '');
  const prompt = $('#motorPrompt'); if (prompt) prompt.textContent = `Level ${levelJustFinished} complete! You whacked ${pluralize(levelHits, 'mole')} this level (${pluralize(motorHits, 'mole')} total). Get ready for level ${levelJustFinished + 1}...`;
  motorMoleTimer = window.setTimeout(() => { motorLevel = levelJustFinished + 1; startMotorLevel(); }, MOTOR_LEVEL_PAUSE_MS);
}
function startMotorGame() {
  motorLevel = 1;
  motorHits = 0;
  motorLevelHits = 0;
  motorStrikes = 0;
  motorGameActive = true;
  updateMotorStrikeDisplay();
  const gameOver = $('#motorGameOver'); if (gameOver) { gameOver.hidden = true; gameOver.classList.remove('is-celebration'); }
  setFeedback('#motorResult', '');
  startMotorLevel();
}
function endMotorGame(completedAllLevels) {
  motorGameActive = false;
  clearMotorTimers();
  const board = $('#motorBoard'); if (board) board.innerHTML = '';
  const outcome = buildScoreOutcome('motor', motorHits, 'mole');
  updateMotorBestDisplay();
  const panel = $('#motorGameOver'); if (!panel) return;
  panel.classList.toggle('is-celebration', completedAllLevels || outcome.headline === 'New high score!');
  const titleEl = $('#motorGameOverTitle'); const detailEl = $('#motorGameOverDetail'); const scoreEl = $('#motorGameOverScore');
  if (titleEl) titleEl.textContent = completedAllLevels ? 'All levels complete!' : 'Game Over';
  if (detailEl) detailEl.textContent = completedAllLevels ? `You cleared all 10 levels and whacked ${pluralize(motorHits, 'mole')}.` : `You ran out of strikes on level ${motorLevel}. You whacked ${pluralize(motorHits, 'mole')} before running out.`;
  if (scoreEl) scoreEl.innerHTML = `<strong>${outcome.headline}</strong> ${outcome.detail}`;
  panel.hidden = false;
  const prompt = $('#motorPrompt'); if (prompt) prompt.textContent = 'Your run has ended.';
  setFeedback('#motorResult', '');
}
// Motor game 2: Precision drawing. Study a randomized guide shape, then trace over it from memory of its exact path within a shrinking window.
function drawStudySeconds(level) { return Math.max(5, 10 - (level - 1)); }
function drawTimeSeconds(level) { return Math.max(12, 30 - (level - 1) * 4); }
function drawToleranceRatio(level) { return Math.max(0.028, 0.065 - (level - 1) * 0.008); }
function drawGuideWidth(level) { return Math.max(10, 26 - (level - 1) * 3); }
// Builds a random polyline of straight segments between random control points, so every attempt is a new scribble shape.
function generateDrawingPath(level) {
  const controlCount = 3 + level;
  const controls = Array.from({ length: controlCount }, () => ({ x: 12 + Math.random() * 76, y: 12 + Math.random() * 76 }));
  const path = [];
  const segments = 16;
  for (let i = 0; i < controls.length - 1; i += 1) {
    const a = controls[i]; const b = controls[i + 1];
    for (let s = 0; s <= segments; s += 1) { const t = s / segments; path.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }); }
  }
  return path;
}
function sizeDrawCanvas() {
  const canvas = $('#drawCanvas');
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.round(rect.width));
  canvas.height = Math.max(1, Math.round(rect.height));
  return canvas;
}
function pctToPxPath(path, canvas) { return path.map((p) => ({ x: (p.x / 100) * canvas.width, y: (p.y / 100) * canvas.height })); }
function drawPolyline(ctx, points, color, width) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}
function renderDrawBoard() {
  const canvas = $('#drawCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPolyline(ctx, pctToPxPath(motorDrawTargetPath, canvas), 'rgba(22, 125, 120, 0.35)', drawGuideWidth(motorDrawLevel));
  drawPolyline(ctx, pctToPxPath(motorDrawUserPoints, canvas), '#e2735b', 4);
}
// Scores accuracy as the average of recall (how much of the guide got traced) and precision (how much of the trace stayed on the guide).
function computeDrawingAccuracy(userPoints, targetPoints, toleranceRadius) {
  if (!userPoints.length || !targetPoints.length || toleranceRadius <= 0) return 0;
  const covered = targetPoints.filter((t) => userPoints.some((u) => Math.hypot(u.x - t.x, u.y - t.y) <= toleranceRadius)).length;
  const recall = covered / targetPoints.length;
  const onTarget = userPoints.filter((u) => targetPoints.some((t) => Math.hypot(u.x - t.x, u.y - t.y) <= toleranceRadius)).length;
  const precision = onTarget / userPoints.length;
  return Math.round(((recall + precision) / 2) * 100);
}
function updateDrawBestDisplay() { const el = $('#drawBest'); if (el) el.textContent = `Best: ${pluralize(getHighScore('draw'), 'level')} cleared`; }
function updateDrawHud(phaseLabel, secondsLeft) {
  const levelLabel = $('#drawLevelLabel'); if (levelLabel) levelLabel.textContent = `Level ${motorDrawLevel} of ${MOTOR_DRAW_LEVELS}`;
  const clock = $('#drawClock'); if (clock) clock.textContent = `${phaseLabel}: ${Math.max(0, secondsLeft)}s`;
  const badge = $('#drawPhaseBadge'); if (badge) badge.textContent = phaseLabel === 'Study' ? `Study the shape - ${Math.max(0, secondsLeft)}s left` : `Trace it now! - ${Math.max(0, secondsLeft)}s left`;
}
// Restarts the badge pop animation only when the phase itself changes, not on every countdown tick.
function setDrawPhaseBadge(tone) {
  const badge = $('#drawPhaseBadge');
  if (!badge) return;
  badge.classList.remove('is-study', 'is-draw', 'is-pop');
  void badge.offsetWidth;
  badge.classList.add(tone, 'is-pop');
}
function showDrawPassOverlay(level, accuracy) { const overlay = $('#drawPassOverlay'); if (!overlay) return; overlay.innerHTML = `<strong>Level ${level} passed!</strong><span>Accuracy: ${accuracy}%</span>`; overlay.hidden = false; }
function hideDrawPassOverlay() { const overlay = $('#drawPassOverlay'); if (overlay) overlay.hidden = true; }
function clearDrawTimers() { window.clearInterval(motorDrawPhaseInterval); window.clearTimeout(motorDrawPhaseTimer); motorDrawPhaseInterval = undefined; motorDrawPhaseTimer = undefined; }
function startDrawGame() {
  motorDrawLevel = 1;
  motorDrawActive = true;
  const gameOver = $('#drawGameOver'); if (gameOver) { gameOver.hidden = true; gameOver.classList.remove('is-celebration'); }
  setFeedback('#drawResult', '');
  startDrawLevel();
}
function startDrawLevel() {
  clearDrawTimers();
  hideDrawPassOverlay();
  motorDrawUserPoints = [];
  motorDrawLastPixel = null;
  motorDrawDrawing = false;
  motorDrawPhase = 'study';
  motorDrawTargetPath = generateDrawingPath(motorDrawLevel);
  sizeDrawCanvas();
  renderDrawBoard();
  setDrawPhaseBadge('is-study');
  const prompt = $('#drawPrompt'); if (prompt) prompt.textContent = `Level ${motorDrawLevel}: study the shape.`;
  let secondsLeft = drawStudySeconds(motorDrawLevel);
  updateDrawHud('Study', secondsLeft);
  motorDrawPhaseInterval = window.setInterval(() => {
    secondsLeft -= 1;
    updateDrawHud('Study', secondsLeft);
    if (secondsLeft <= 0) { clearDrawTimers(); beginDrawPhase(); }
  }, 1000);
}
function beginDrawPhase() {
  if (!motorDrawActive) return;
  motorDrawPhase = 'draw';
  setDrawPhaseBadge('is-draw');
  const prompt = $('#drawPrompt'); if (prompt) prompt.textContent = `Level ${motorDrawLevel}: trace the shape now!`;
  let secondsLeft = drawTimeSeconds(motorDrawLevel);
  updateDrawHud('Draw', secondsLeft);
  motorDrawPhaseInterval = window.setInterval(() => {
    secondsLeft -= 1;
    updateDrawHud('Draw', secondsLeft);
    if (secondsLeft <= 0) { clearDrawTimers(); confirmDrawing(); }
  }, 1000);
}
function handleDrawPointerDown(event) {
  if (!motorDrawActive || motorDrawPhase !== 'draw') return;
  const canvas = $('#drawCanvas'); if (!canvas) return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  motorDrawDrawing = true;
  motorDrawLastPixel = null;
  addDrawPoint(event, canvas);
}
function handleDrawPointerMove(event) { if (!motorDrawDrawing) return; const canvas = $('#drawCanvas'); if (!canvas) return; addDrawPoint(event, canvas); }
function handleDrawPointerUp() { motorDrawDrawing = false; motorDrawLastPixel = null; }
// Interpolates between recorded pointer positions so fast strokes still produce enough sample points for accurate scoring.
function addDrawPoint(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const xPx = event.clientX - rect.left;
  const yPx = event.clientY - rect.top;
  if (motorDrawLastPixel) {
    const steps = Math.max(1, Math.ceil(Math.hypot(xPx - motorDrawLastPixel.x, yPx - motorDrawLastPixel.y) / 4));
    for (let i = 1; i <= steps; i += 1) {
      const t = i / steps;
      const stepX = motorDrawLastPixel.x + (xPx - motorDrawLastPixel.x) * t;
      const stepY = motorDrawLastPixel.y + (yPx - motorDrawLastPixel.y) * t;
      motorDrawUserPoints.push({ x: (stepX / canvas.width) * 100, y: (stepY / canvas.height) * 100 });
    }
  } else {
    motorDrawUserPoints.push({ x: (xPx / canvas.width) * 100, y: (yPx / canvas.height) * 100 });
  }
  motorDrawLastPixel = { x: xPx, y: yPx };
  renderDrawBoard();
}
function clearDrawStroke() {
  if (!motorDrawActive || motorDrawPhase !== 'draw') { setFeedback('#drawResult', 'Wait for the drawing phase to start.', 'is-warning'); return; }
  motorDrawUserPoints = [];
  motorDrawLastPixel = null;
  renderDrawBoard();
  setFeedback('#drawResult', 'Drawing cleared. Try again!', '');
}
function confirmDrawing() {
  if (!motorDrawActive) return;
  if (motorDrawPhase !== 'draw') { setFeedback('#drawResult', 'Wait for the drawing phase to start.', 'is-warning'); return; }
  clearDrawTimers();
  motorDrawDrawing = false;
  motorDrawPhase = 'result';
  const canvas = $('#drawCanvas');
  const targetPx = canvas ? pctToPxPath(motorDrawTargetPath, canvas) : [];
  const userPx = canvas ? pctToPxPath(motorDrawUserPoints, canvas) : [];
  const tolerancePx = canvas ? drawToleranceRatio(motorDrawLevel) * Math.min(canvas.width, canvas.height) : 0;
  const accuracy = computeDrawingAccuracy(userPx, targetPx, tolerancePx);
  if (accuracy >= 90) {
    if (motorDrawLevel >= MOTOR_DRAW_LEVELS) { endDrawGame(true, accuracy); return; }
    const clearedLevel = motorDrawLevel;
    setFeedback('#drawResult', '', '');
    showDrawPassOverlay(clearedLevel, accuracy);
    const prompt = $('#drawPrompt'); if (prompt) prompt.textContent = `Level ${clearedLevel} complete! Accuracy: ${accuracy}%. Get ready for level ${clearedLevel + 1}...`;
    motorDrawPhaseTimer = window.setTimeout(() => { motorDrawLevel = clearedLevel + 1; startDrawLevel(); }, MOTOR_LEVEL_PAUSE_MS);
  } else {
    endDrawGame(false, accuracy);
  }
}
function endDrawGame(completedAll, finalAccuracy) {
  motorDrawActive = false;
  clearDrawTimers();
  const levelsCleared = completedAll ? MOTOR_DRAW_LEVELS : motorDrawLevel - 1;
  const outcome = buildScoreOutcome('draw', levelsCleared, 'level');
  updateDrawBestDisplay();
  const panel = $('#drawGameOver'); if (!panel) return;
  panel.classList.toggle('is-celebration', completedAll || outcome.headline === 'New high score!');
  const titleEl = $('#drawGameOverTitle'); const detailEl = $('#drawGameOverDetail'); const scoreEl = $('#drawGameOverScore');
  if (titleEl) titleEl.textContent = completedAll ? 'All levels complete!' : 'Round Over';
  if (detailEl) detailEl.textContent = completedAll ? `You cleared all ${MOTOR_DRAW_LEVELS} levels with a final accuracy of ${finalAccuracy}%.` : `You reached level ${motorDrawLevel} with ${finalAccuracy}% accuracy (90% needed to advance). You cleared ${pluralize(levelsCleared, 'level')} in total.`;
  if (scoreEl) scoreEl.innerHTML = `<strong>${outcome.headline}</strong> ${outcome.detail}`;
  panel.hidden = false;
  const prompt = $('#drawPrompt'); if (prompt) prompt.textContent = 'Your run has ended.';
  setFeedback('#drawResult', '');
  const badge = $('#drawPhaseBadge'); if (badge) { badge.textContent = ''; badge.className = 'draw-phase-badge'; }
}
function selectMotorGame(game) {
  if (motorGameActive) { motorGameActive = false; clearMotorTimers(); }
  if (motorDrawActive) { motorDrawActive = false; clearDrawTimers(); }
  document.querySelectorAll('[data-motor-game]').forEach((button) => button.classList.toggle('is-selected', button.dataset.motorGame === game));
  const whackGame = $('#motorWhackGame'); const drawGame = $('#motorDrawGame');
  if (!whackGame || !drawGame) return;
  whackGame.hidden = game !== 'whack';
  drawGame.hidden = game !== 'draw';
}
const reminderTimers = new Map();
let alarmInterval;
let alarmTimeout;
let activeLessonSet = 0;
let activeLessonIndex = 0;
let activeLessonPart = 0;
// Openers and closers combine with mood-specific cores to generate a large pool of non-repeating suggestions.
const moodOpeners = ['Right now,', 'In this moment,', 'Take a small beat —', 'Before doing anything else,', 'Quick idea:', 'Try this next:'];
const moodClosers = ['You are allowed to go at your own pace.', 'Small steps still count.', 'Be gentle with yourself here.', 'This is just for you, no pressure.', 'One moment at a time.', 'You do not have to get it perfect.'];
const moodCores = {
  happy: ['savor what helped this feeling show up', 'share this moment with someone or write it down to remember later', 'use this energy on a task you have been putting off', 'let yourself enjoy it without rushing to the next thing', 'notice what led here so you can find it again', 'do something kind for someone else while you feel good', 'capture this mood in a photo, note, or playlist'],
  sad: ['let yourself feel it for a moment before doing anything else', 'reach for a small comfort like a blanket or warm drink', 'message someone safe and let them know how you are feeling', 'try one gentle, low-effort action like water or fresh air', 'put on something familiar and comforting', 'give yourself permission to rest instead of pushing through', 'write down what is weighing on you, even briefly'],
  calm: ['notice what is helping right now and protect it', 'use this steadiness for a task that needs focus', 'take a slow breath and enjoy it while it lasts', 'stay here a little longer before moving to the next task', 'let this be a checkpoint, not just a passing moment', 'do something small that keeps this feeling going'],
  overwhelmed: ['name five things you can see, then take three slow breaths', 'pick just the next single step, not the whole list', 'step away for two minutes before returning to the task', 'write down everything on your mind, then circle only one item', 'lower the bar for what counts as done right now', 'ask for help with one piece instead of carrying it all'],
  tired: ['rest for a few minutes before deciding what is next', 'drink some water and stretch gently', 'lower your expectations for this hour to only what is essential', 'take a short break away from screens', 'consider whether this can wait until you have more energy', 'do the smallest version of the task instead of the whole thing'],
  angry: ['take three slow breaths before responding to anything', 'step away from the situation for a few minutes if you can', 'write down what is bothering you instead of saying it right away', 'name what boundary feels crossed right now', 'move your body for a minute to release some tension', 'wait until you feel steadier before deciding what to do next'],
  stressed: ['break the task into one small, doable piece', 'take a short walk or stretch to release tension', 'try box breathing: in for four, hold for four, out for four', 'write a short list and cross off just one thing', 'ask what actually needs to happen today versus later', 'give yourself a two-minute pause before continuing'],
  excited: ['channel this energy into something you care about right now', 'share the excitement with someone who will enjoy it too', 'take a breath and enjoy the feeling before the next thing', 'jot down the idea so you can return to it later', 'let yourself be a little louder about it if that feels good', 'use this momentum to start the thing you have been putting off'],
  nervous: ['take three slow breaths and take this one step at a time', 'ground yourself by naming what you can see, hear, and feel', 'prepare one small thing that will help you feel more ready', 'remind yourself of a time you handled something similar', 'lower the stakes by focusing on just the next five minutes', 'let yourself double-check the one thing that is worrying you most'],
};
const moodComboCache = new Map();
const moodOrder = new Map();
const moodPointer = new Map();
function buildMoodCombos(mood) { const combos = []; moodOpeners.forEach((opener) => moodCores[mood].forEach((core) => moodClosers.forEach((closer) => combos.push(`${opener} ${core}. ${closer}`)))); return combos; }
function shuffle(array) { const copy = array.slice(); for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function nextMoodSuggestion(mood) { if (!moodComboCache.has(mood)) moodComboCache.set(mood, buildMoodCombos(mood)); const combos = moodComboCache.get(mood); let order = moodOrder.get(mood); let pointer = moodPointer.get(mood) || 0; if (!order || pointer >= order.length) { order = shuffle(combos.map((_, i) => i)); pointer = 0; moodOrder.set(mood, order); } moodPointer.set(mood, pointer + 1); return combos[order[pointer]]; }

// Openers and closers combine with body-part-specific real exercises/stretches so repeated check-ins for the same area feel varied rather than repetitive.
const bodyOpeners = ['Here is one option:', 'Try this:', 'A gentle starting point:', 'One idea:', 'Give this a try:', 'Consider this:', 'Something to explore:', 'A small next step:'];
const bodyClosers = ['Stop if pain increases and rest instead.', 'Move slowly and stay within a comfortable range.', 'A qualified professional can help tailor this safely.', 'Only do what feels manageable today.', 'Breathe steadily as you move.', 'Ease off if anything feels sharp or wrong.', 'There is no rush — a few repetitions is enough.', 'Skip it today if it does not feel right.'];
const bodyCores = {
  Neck: ['gently draw your chin straight back to make a "double chin," hold for 3 seconds, then release, repeating 5 times', 'slowly turn your head to look over one shoulder, hold briefly, then turn to look over the other shoulder, repeating 5 times each side', 'tilt your head so your ear moves toward your shoulder without lifting the shoulder, hold for 15-20 seconds, then repeat on the other side', 'slowly drop your chin toward your chest, hold for a few seconds, then gently tilt your head back to look slightly upward', 'sit tall, tilt your head to one side, and use your hand to add light pressure for a deeper stretch, holding 15-20 seconds each side', 'lower your chin toward your chest and hold for 15-20 seconds, feeling a stretch along the back of your neck', 'slowly roll your head in a half-circle from one shoulder to the other, passing through a chin-down position and avoiding tilting straight backward'],
  Shoulders: ['roll both shoulders up, back, and down in a slow circle for 8-10 reps, then reverse the direction', 'stand in a doorway, place your forearms on the frame at shoulder height, and gently lean forward until you feel a stretch across your chest, holding 20 seconds', 'bring one arm across your chest and use your other hand to gently pull it closer, holding 20 seconds, then switch arms', 'stand with your back against a wall, arms bent in a goalpost position, and slowly slide your arms up and back down while keeping contact with the wall, repeating 8-10 times', 'extend your arms out to the sides and make slow, small circles, gradually increasing the size for 10 reps, then reverse direction', 'pull your shoulder blades together as if pinching a pencil between them, hold for 5 seconds, then relax, repeating 8-10 times', 'lean forward slightly, let one arm hang loosely, and gently swing it forward and back like a pendulum for 10-15 reps', 'reach one arm straight overhead, lean slightly to the opposite side, and hold for 15-20 seconds, then switch arms'],
  Elbows: ['slowly bend your elbow to bring your hand toward your shoulder, then straighten it back out, repeating 10 times', 'hold your elbow bent at your side and slowly rotate your forearm to turn your palm up, then down, repeating 10 times', 'raise one arm overhead, bend the elbow to reach your hand down your back, and gently guide the elbow with your other hand, holding 15-20 seconds', 'let your arms rest at your sides or on a table and make small circles with your forearms at the elbow, 10 reps each direction', 'extend your arm straight out, gently pull your fingers back with the other hand, and hold for 15-20 seconds to feel the stretch through the forearm and elbow', 'extend your arm behind you at a comfortable height and gently rotate away to feel a stretch along the front of the arm, holding 15-20 seconds', 'using a light weight or resistance band, slowly bend and straighten your elbow through a comfortable range, repeating 8-10 times'],
  Wrists: ['rotate your wrist in slow circles for 10 reps, then reverse direction', 'press your palms together in front of your chest with fingers pointing up, then slowly lower your hands toward your waist while keeping palms together, holding 15-20 seconds', 'extend one arm with your palm facing up, gently pull your fingers back and down with your other hand, holding 15-20 seconds', 'extend one arm with your palm facing down, gently press your fingers down and toward you with your other hand, holding 15-20 seconds', 'slowly bend your wrist up and then down like waving, repeating 10 times in each direction', 'keep your forearm still and gently tilt your wrist side to side toward your thumb and then your pinky, repeating 10 times', 'let your hands hang loosely and gently shake them out for 10-15 seconds to release tension'],
  Hands: ['spread your fingers as wide as you comfortably can, hold for a few seconds, then make a soft fist and release, repeating 8-10 times', 'gently pull your thumb back and away from your palm, hold for 10-15 seconds, then switch hands', 'straighten your fingers, then form a hook shape, a full fist, and a straight fist, holding each briefly, repeating the sequence 5 times', 'squeeze a soft ball or rolled towel in your palm, hold for 5 seconds, then release, repeating 10 times', 'touch each fingertip to your thumb one at a time, moving from index to pinky and back, repeating the sequence 5 times', 'rest your hand flat on a table and lift each finger individually off the surface, holding briefly before lowering', 'let your hands hang loosely at your sides and gently shake them for 10-15 seconds'],
  Back: ['on hands and knees, arch your back and drop your belly while lifting your head, then round your spine and tuck your chin, moving slowly between the two for 8-10 reps', 'sit tall, place one hand on the opposite knee, and gently twist your torso toward the back of your chair, holding 15-20 seconds, then switch sides', 'kneel and sit back onto your heels, reaching your arms forward on the floor and lowering your chest toward your thighs, holding for 20-30 seconds', 'lying on your back, pull one knee gently toward your chest with both hands, holding 15-20 seconds, then switch legs', 'stand tall, raise one arm overhead, and gently lean to the opposite side, holding 10-15 seconds before switching', 'lying face down, gently press your chest up a few inches using your arms while keeping your hips on the floor, holding 5 seconds and repeating 8-10 times', 'sit with legs extended and slowly reach toward your feet while keeping your back long, holding for 20 seconds', 'lying on your back with knees bent, gently lift your hips a few inches off the floor, hold for 5 seconds, then lower, repeating 8-10 times'],
  Hips: ['stand with hands on your hips and make slow, wide circles with your hips, 8 reps each direction', 'sit and cross one ankle over the opposite knee, then gently lean forward until you feel a stretch in the outer hip, holding 20 seconds, then switch sides', 'step one foot forward into a gentle lunge, keeping your back straight, and hold 15-20 seconds to feel a stretch in the front of the back hip, then switch sides', 'standing or seated, alternate slowly lifting each knee toward your chest for 10 reps per side', 'lying on your side with knees bent and feet together, lift your top knee like an opening clamshell, then lower, repeating 10-12 times per side', 'with support from a chair or wall, bring one shin forward at an angle and gently fold toward it, holding 15-20 seconds if that range feels available', 'lying on your side with legs straight, lift your top leg up and slowly lower it back down, repeating 10-12 times per side', 'sit with the soles of your feet together and gently press your knees toward the floor with your hands, holding 20 seconds'],
  Knees: ['sit in a chair and slowly straighten one knee until your leg is extended, hold briefly, then lower, repeating 10 times per leg', 'holding onto a chair or counter for balance, slowly bend your knees into a small squat and straighten back up, repeating 8-10 times', 'sit or stand and gently reach toward your toes with a slight bend in the knees, holding 15-20 seconds', 'holding onto support if needed, slowly rise onto your toes and lower back down, repeating 10-12 times', 'lying down, keep one leg straight and slowly lift it a few inches off the floor, hold briefly, then lower, repeating 10 times per leg', 'holding onto a wall or chair for balance, bend one knee to bring your heel toward your glutes, holding 15-20 seconds, then switch sides', 'holding onto support, bend your knees and hips into a small, comfortable squat, then return to standing, repeating 8-10 times', 'sit and lift one foot slightly off the floor, making slow circles with the lower leg from the knee, 8 reps each direction'],
  Ankles: ['lift one foot slightly and rotate your ankle in slow circles, 10 reps each direction, then switch feet', 'lift one foot and slowly trace the letters of the alphabet in the air using your big toe as the pointer', 'place your hands on a wall, step one foot back with the heel flat on the floor, and lean forward gently until you feel a stretch in the calf, holding 20 seconds', 'keeping your heels on the floor, lift the front of your feet up toward your shins, hold briefly, then lower, repeating 10-12 times', 'holding onto support if needed, rise up onto your toes, hold briefly, then lower your heels back down, repeating 10-12 times', 'point your toes forward and then flex them back toward you, repeating 10-15 times to help circulation and mobility', 'keeping your heel still, gently tilt your foot inward and then outward, repeating 10 times in each direction'],
  Feet: ['place a small towel flat on the floor and use your toes to scrunch it toward you, then release, repeating 8-10 times', 'using your toes, pick up small objects like marbles or pebbles one at a time and place them in a small bowl', 'roll the sole of your foot slowly back and forth over a ball or rolling pin for 30-60 seconds', 'spread your toes apart as wide as you can, hold for a few seconds, then relax, repeating 8-10 times', 'point and flex your feet slowly and repeatedly for about 30 seconds to warm up before other foot exercises', 'keeping your heels on the floor, alternate tapping your toes up and down quickly for 20-30 seconds', 'roll a bottle or ball under the arch of your foot with gentle pressure for 30-60 seconds to ease tension'],
};
const bodyComboCache = new Map();
const bodyOrder = new Map();
const bodyPointer = new Map();
function buildBodyCombos(part) { const combos = []; bodyOpeners.forEach((opener) => bodyCores[part].forEach((core, coreIndex) => bodyClosers.forEach((closer) => combos.push({ text: `${opener} ${core}. ${closer}`, coreIndex })))); return combos; }
function nextBodySuggestion(part) { if (!bodyComboCache.has(part)) bodyComboCache.set(part, buildBodyCombos(part)); const combos = bodyComboCache.get(part); let order = bodyOrder.get(part); let pointer = bodyPointer.get(part) || 0; if (!order || pointer >= order.length) { order = shuffle(combos.map((_, i) => i)); pointer = 0; bodyOrder.set(part, order); } bodyPointer.set(part, pointer + 1); return combos[order[pointer]]; }

// Stick-figure joint name suffixes, shorthand transform builders, and a per-stretch animation for every entry in bodyCores.
const FIG = { head: 'head-group', torso: 'torso', shL: 'shoulderL', shR: 'shoulderR', elL: 'elbowL', elR: 'elbowR', haL: 'handL', haR: 'handR', hipL: 'hipL', hipR: 'hipR', knL: 'kneeL', knR: 'kneeR', foL: 'footL', foR: 'footR', root: 'root' };
// Each joint's pivot point in the shared viewBox's coordinate space, used to keep rotated limbs attached to their parent instead of swinging around a stale origin.
const FIG_PIVOT = { 'head-group': [100, 58], shoulderL: [100, 70], shoulderR: [100, 70], elbowL: [72, 95], elbowR: [128, 95], handL: [58, 125], handR: [142, 125], torso: [100, 150], hipL: [100, 150], hipR: [100, 150], kneeL: [85, 195], kneeR: [115, 195], footL: [80, 240], footR: [120, 240], root: [100, 150] };
const r = (deg) => `rotate(${deg}deg)`;
const sc = (v) => `scale(${v})`;
const sx = (v) => `scaleX(${v})`;
const tr = (x, y) => `translate(${x}px, ${y}px)`;
// Rotate/scale transforms are wrapped with translate-to-pivot / translate-back so a joint always spins around its own attachment point, even after an ancestor joint has already rotated. Plain translates (from tr()) pass through untouched.
function keyMove(part, transforms, duration = 1600, iterations = 3, easing = 'ease-in-out') { const pivot = FIG_PIVOT[part]; const wrapped = transforms.map((value) => { if (pivot && (value.startsWith('rotate') || value.startsWith('scale'))) { const [px, py] = pivot; return `translate(${px}px, ${py}px) ${value} translate(${-px}px, ${-py}px)`; } return value; }); return { part, keyframes: wrapped.map((value) => ({ transform: value })), options: { duration, iterations, easing } }; }
const exerciseAnimations = {
  Neck: [
    [keyMove(FIG.head, [r(0), r(8), r(0), r(8), r(0)], 1200, 3)],
    [keyMove(FIG.head, [r(0), r(25), r(0), r(-25), r(0)], 1600, 3)],
    [keyMove(FIG.head, [r(0), r(20), r(20), r(0), r(-20), r(-20), r(0)], 2400, 2)],
    [keyMove(FIG.head, [r(0), r(15), r(0), r(-12), r(0)], 1500, 3)],
    [keyMove(FIG.head, [r(0), r(24), r(24), r(0)], 2000, 2)],
    [keyMove(FIG.head, [r(0), r(30), r(30), r(0)], 2000, 2)],
    [keyMove(FIG.head, [r(0), r(15), r(25), r(15), r(0), r(-15), r(-25), r(-15), r(0)], 2600, 2)],
  ],
  Shoulders: [
    [keyMove(FIG.shL, [r(0), r(-15), r(0), r(15), r(0)], 1600, 3), keyMove(FIG.shR, [r(0), r(15), r(0), r(-15), r(0)], 1600, 3)],
    [keyMove(FIG.shL, [r(0), r(-45), r(-45), r(0)], 2200, 2), keyMove(FIG.shR, [r(0), r(45), r(45), r(0)], 2200, 2)],
    [keyMove(FIG.shL, [r(0), r(80), r(80), r(0)], 2000, 2), keyMove(FIG.elL, [r(0), r(15), r(15), r(0)], 2000, 2)],
    [keyMove(FIG.shL, [r(0), r(-140), r(0)], 2400, 3), keyMove(FIG.shR, [r(0), r(140), r(0)], 2400, 3)],
    [keyMove(FIG.shL, [r(0), r(60), r(120), r(180), r(120), r(60), r(0)], 2600, 2), keyMove(FIG.shR, [r(0), r(-60), r(-120), r(-180), r(-120), r(-60), r(0)], 2600, 2)],
    [keyMove(FIG.shL, [tr(0, 0), tr(5, -2), tr(0, 0)], 1500, 3), keyMove(FIG.shR, [tr(0, 0), tr(-5, -2), tr(0, 0)], 1500, 3)],
    [keyMove(FIG.shL, [r(0), r(18), r(-18), r(0)], 1800, 4)],
    [keyMove(FIG.shL, [r(0), r(-165), r(-165), r(0)], 2200, 2)],
  ],
  Elbows: [
    [keyMove(FIG.elL, [r(0), r(120), r(0)], 1400, 4)],
    [keyMove(FIG.haL, [sx(1), sx(-1), sx(1)], 1800, 3)],
    [keyMove(FIG.shL, [r(0), r(-170), r(-170), r(0)], 2200, 2), keyMove(FIG.elL, [r(0), r(140), r(140), r(0)], 2200, 2)],
    [keyMove(FIG.elL, [r(0), r(20), r(40), r(20), r(0), r(-20), r(-40), r(-20), r(0)], 2200, 2)],
    [keyMove(FIG.elL, [r(0), r(10), r(10), r(0)], 1800, 2), keyMove(FIG.haL, [r(0), r(-30), r(-30), r(0)], 1800, 2)],
    [keyMove(FIG.shL, [r(0), r(-60), r(-60), r(0)], 2000, 2)],
    [keyMove(FIG.elL, [r(0), r(100), r(0), r(100), r(0)], 1800, 3)],
  ],
  Wrists: [
    [keyMove(FIG.haL, [r(0), r(30), r(60), r(30), r(0), r(-30), r(-60), r(-30), r(0)], 2000, 3)],
    [keyMove(FIG.elL, [r(0), r(90), r(90), r(0)], 2000, 2), keyMove(FIG.elR, [r(0), r(90), r(90), r(0)], 2000, 2)],
    [keyMove(FIG.haL, [r(0), r(-45), r(-45), r(0)], 1800, 2)],
    [keyMove(FIG.haL, [r(0), r(45), r(45), r(0)], 1800, 2)],
    [keyMove(FIG.haL, [r(0), r(30), r(-30), r(0)], 1400, 4)],
    [keyMove(FIG.haL, [r(0), r(20), r(0), r(-20), r(0)], 1400, 4)],
    [keyMove(FIG.haL, [r(0), r(15), r(-15), r(15), r(-15), r(0)], 1000, 4)],
  ],
  Hands: [
    [keyMove(FIG.haL, [sc(1), sc(1.5), sc(1), sc(0.7), sc(1)], 1600, 3)],
    [keyMove(FIG.haL, [r(0), r(25), r(25), r(0)], 1600, 3)],
    [keyMove(FIG.haL, [sc(1), sc(0.8), sc(1.3), sc(1)], 1800, 2)],
    [keyMove(FIG.haL, [sc(1), sc(0.6), sc(1)], 1200, 4)],
    [keyMove(FIG.haL, [sc(1), sc(1.15), sc(1), sc(1.15), sc(1)], 900, 4)],
    [keyMove(FIG.haL, [r(0), r(-15), r(0), r(15), r(0)], 1200, 3)],
    [keyMove(FIG.haL, [tr(0, 0), tr(3, 0), tr(-3, 0), tr(0, 0)], 900, 4)],
  ],
  Back: [
    [keyMove(FIG.torso, [r(0), r(-10), r(0), r(10), r(0)], 2000, 3), keyMove(FIG.head, [r(0), r(10), r(0), r(-10), r(0)], 2000, 3)],
    [keyMove(FIG.torso, [r(0), r(20), r(0), r(-20), r(0)], 2000, 2)],
    [keyMove(FIG.torso, [r(0), r(45), r(45), r(0)], 2400, 2), keyMove(FIG.shL, [r(0), r(-150), r(-150), r(0)], 2400, 2), keyMove(FIG.shR, [r(0), r(150), r(150), r(0)], 2400, 2)],
    [keyMove(FIG.hipL, [r(0), r(90), r(90), r(0)], 2000, 2)],
    [keyMove(FIG.torso, [r(0), r(18), r(0), r(-18), r(0)], 1800, 3)],
    [keyMove(FIG.torso, [r(0), r(-15), r(-15), r(0)], 1800, 2)],
    [keyMove(FIG.torso, [r(0), r(50), r(50), r(0)], 2200, 2)],
    [keyMove(FIG.root, [tr(0, 0), tr(0, -8), tr(0, 0)], 1800, 3)],
  ],
  Hips: [
    [keyMove(FIG.hipL, [r(0), r(15), r(25), r(15), r(0), r(-15), r(-25), r(-15), r(0)], 2400, 2)],
    [keyMove(FIG.hipL, [r(0), r(-35), r(-35), r(0)], 2000, 2)],
    [keyMove(FIG.hipL, [r(0), r(30), r(30), r(0)], 2000, 2), keyMove(FIG.hipR, [r(0), r(-20), r(-20), r(0)], 2000, 2)],
    [keyMove(FIG.hipL, [r(0), r(60), r(0)], 1400, 3), keyMove(FIG.hipR, [r(0), r(-60), r(0)], 1400, 3)],
    [keyMove(FIG.knL, [r(0), r(-40), r(0)], 1600, 4)],
    [keyMove(FIG.hipL, [r(0), r(-50), r(-50), r(0)], 2200, 2)],
    [keyMove(FIG.hipL, [tr(0, 0), tr(-15, 0), tr(0, 0)], 1800, 3)],
    [keyMove(FIG.hipL, [r(0), r(-45), r(-45), r(0)], 2000, 2), keyMove(FIG.hipR, [r(0), r(45), r(45), r(0)], 2000, 2)],
  ],
  Knees: [
    [keyMove(FIG.knL, [r(0), r(-90), r(0)], 1600, 3)],
    [keyMove(FIG.knL, [r(0), r(40), r(0)], 1600, 3)],
    [keyMove(FIG.torso, [r(0), r(30), r(30), r(0)], 2200, 2), keyMove(FIG.knL, [r(0), r(-20), r(-20), r(0)], 2200, 2)],
    [keyMove(FIG.root, [tr(0, 0), tr(0, -6), tr(0, 0)], 1400, 4)],
    [keyMove(FIG.hipL, [r(0), r(45), r(0)], 1600, 3)],
    [keyMove(FIG.knL, [r(0), r(120), r(120), r(0)], 2000, 2)],
    [keyMove(FIG.hipL, [r(0), r(35), r(0)], 1600, 3), keyMove(FIG.knL, [r(0), r(50), r(0)], 1600, 3)],
    [keyMove(FIG.knL, [r(0), r(15), r(0), r(-15), r(0)], 1400, 4)],
  ],
  Ankles: [
    [keyMove(FIG.foL, [r(0), r(20), r(35), r(20), r(0), r(-20), r(-35), r(-20), r(0)], 2200, 2)],
    [keyMove(FIG.foL, [r(0), r(15), r(-10), r(20), r(-15), r(0)], 2400, 2)],
    [keyMove(FIG.foL, [r(0), r(-25), r(-25), r(0)], 2000, 2)],
    [keyMove(FIG.foL, [r(0), r(-30), r(0)], 1400, 4)],
    [keyMove(FIG.root, [tr(0, 0), tr(0, -6), tr(0, 0)], 1400, 4)],
    [keyMove(FIG.foL, [r(0), r(-20), r(0), r(20), r(0)], 1200, 4)],
    [keyMove(FIG.foL, [r(0), r(18), r(0), r(-18), r(0)], 1400, 4)],
  ],
  Feet: [
    [keyMove(FIG.foL, [sc(1), sc(0.75), sc(1)], 1200, 4)],
    [keyMove(FIG.foL, [sc(1), sc(0.7), sc(1), sc(0.7), sc(1)], 1400, 3)],
    [keyMove(FIG.foL, [r(0), r(15), r(0), r(-10), r(0)], 1800, 3)],
    [keyMove(FIG.foL, [sc(1), sc(1.3), sc(1)], 1400, 3)],
    [keyMove(FIG.foL, [r(0), r(-20), r(0), r(20), r(0)], 1200, 4)],
    [keyMove(FIG.foL, [r(0), r(-15), r(0)], 900, 5)],
    [keyMove(FIG.foL, [r(0), r(-25), r(-25), r(0)], 2000, 2)],
  ],
};
const stretchAnimations = new Map();
// Animations are created paused and looped, so nothing races to finish while the user is still scrolling to see it.
function createStretchAnimation(moves, containerEl, suffix) { const animations = moves.map((move) => { const el = containerEl.querySelector(`#fig-${suffix}-${move.part}`); if (!el) return null; const anim = el.animate(move.keyframes, { ...move.options, iterations: Infinity }); anim.pause(); return anim; }).filter(Boolean); stretchAnimations.set(suffix, animations); return animations; }
// Renders one card per selected body area with its own randomly suggested exercise, a matching stick figure, and its own play/pause control.
function renderMobilitySuggestions(parts) {
  const result = $('#mobilityResult');
  const cards = $('#mobilityCards');
  if (!result || !cards) return;
  result.hidden = false;
  stretchAnimations.clear();
  if (!parts.length) { cards.innerHTML = '<p>Choose one or more body areas first, then we can suggest a gentle starting point.</p>'; return; }
  const picks = parts.map((part, index) => ({ part, suffix: `${part}${index}`, suggestion: nextBodySuggestion(part) }));
  cards.innerHTML = picks.map(({ part, suffix, suggestion }) => `<div class="mobility-card"><h5>${escapeHtml(part)}</h5><p class="mobility-instructions">${escapeHtml(suggestion.text)}</p><div class="stretch-stage" data-suffix="${suffix}">${stickFigureSvg(suffix)}</div><button class="secondary-button stretch-toggle" data-suffix="${suffix}" data-playing="false" type="button">▶ Play animation</button></div>`).join('');
  picks.forEach(({ part, suffix, suggestion }) => { const stage = cards.querySelector(`.stretch-stage[data-suffix="${suffix}"]`); if (stage) createStretchAnimation(exerciseAnimations[part][suggestion.coreIndex], stage, suffix); });
  cards.querySelectorAll('.stretch-toggle').forEach((button) => button.addEventListener('click', () => {
    const suffix = button.dataset.suffix;
    const animations = stretchAnimations.get(suffix) || [];
    const isPlaying = button.dataset.playing === 'true';
    animations.forEach((anim) => (isPlaying ? anim.pause() : anim.play()));
    button.dataset.playing = isPlaying ? 'false' : 'true';
    button.textContent = isPlaying ? '▶ Play animation' : '⏸ Pause animation';
  }));
}

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); window.clearTimeout(showToast.timeout); showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 3200); }
function speak(text, rate = 1, voiceProfileId = null) { if (!('speechSynthesis' in window)) { showToast('Speech output is not supported in this browser.'); return; } window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); const profile = voiceProfileId ? getVoiceProfile(voiceProfileId) : null; const requestedRate = Number(rate) * (profile ? profile.rate : 1); utterance.rate = requestedRate < 1 ? requestedRate * requestedRate : requestedRate; if (profile) { utterance.pitch = profile.pitch; const assignedVoice = voiceRoster && voiceRoster[profile.id]; if (assignedVoice) utterance.voice = assignedVoice; } window.speechSynthesis.speak(utterance); }
function updateVoiceChooseButton() { const select = $('#voiceSelect'); const chooseButton = $('#voiceChooseButton'); if (!select || !chooseButton) return; const isConfirmed = select.value === getLockedVoiceId(); chooseButton.textContent = isConfirmed ? 'Confirmed voice' : 'Choose voice'; chooseButton.disabled = isConfirmed; }
function renderVoicePicker() {
  const select = $('#voiceSelect');
  if (!select) return;
  const lockedId = getLockedVoiceId();
  const lockedProfile = getVoiceProfile(lockedId);
  const lockedLabel = $('#voiceLockedLabel');
  if (lockedLabel) lockedLabel.textContent = lockedProfile ? `Chosen voice: ${lockedProfile.label}` : 'No voice chosen yet. The default browser voice will be used until you choose one.';
  if (!select.options.length) select.innerHTML = VOICE_PROFILES.map((profile) => `<option value="${profile.id}">${profile.label} (${profile.gender === 'feminine' ? 'Feminine' : 'Masculine'})</option>`).join('');
  select.value = lockedId && getVoiceProfile(lockedId) ? lockedId : VOICE_PROFILES[0].id;
  updateVoiceChooseButton();
}
function renderFeatureList() { const list = $('#featureList'); list.innerHTML = modes[activeMode].features.map(([id, label]) => `<button class="feature-button ${id === activeFeature ? 'is-active' : ''}" data-feature="${id}" type="button"><span class="feature-icon" aria-hidden="true">${FEATURE_ART[id] ? FEATURE_ART[id][0] : ''}</span>${label}</button>`).join(''); $('#modeTitle').textContent = modes[activeMode].title; }
function renderMindfulnessMarkup() {
  const controls = $('#mindfulnessExercise')?.closest('.mindfulness-controls');
  const stage = $('#mindfulnessStage');
  const readout = document.querySelector('.mindfulness-readout');
  if (!controls || !stage) return;
  controls.innerHTML = '<label class="field-label" for="mindfulnessExercise">Practice<select id="mindfulnessExercise"><option value="breathing">Guided breathing</option><option value="bodyScan">Body scan</option><option value="focus">Sensory focus</option></select></label><div class="mindfulness-stepper"><span class="field-label">Practice length</span><div class="stepper-control"><button class="stepper-button" data-mindfulness-step="duration" data-step="-1" type="button" aria-label="Shorten practice">−</button><strong id="mindfulnessDuration">5 minutes</strong><button class="stepper-button" data-mindfulness-step="duration" data-step="1" type="button" aria-label="Lengthen practice">+</button></div></div><div class="mindfulness-stepper" id="mindfulnessBreathControl"><span class="field-label">Breath length (inhale and exhale)</span><div class="stepper-control"><button class="stepper-button" data-mindfulness-step="breath" data-step="-1" type="button" aria-label="Shorten breath length">−</button><strong id="mindfulnessBreathLength">4 seconds</strong><button class="stepper-button" data-mindfulness-step="breath" data-step="1" type="button" aria-label="Lengthen breath">+</button></div></div>';
  if (readout) readout.remove();
  stage.innerHTML = '<div class="mindfulness-orbit" aria-hidden="true"></div><div class="mindfulness-core" aria-hidden="true"></div><div class="mindfulness-body-figure" aria-hidden="true"><i class="body-head"></i><i class="body-neck"></i><i class="body-torso"></i><i class="body-arm body-arm-left"></i><i class="body-arm body-arm-right"></i><i class="body-leg body-leg-left"></i><i class="body-leg body-leg-right"></i></div><div class="mindfulness-focus-scene" aria-hidden="true"></div><div class="mindfulness-sparks" aria-hidden="true"><i></i><i></i><i></i></div><div class="mindfulness-guide"><strong id="mindfulnessTime">05:00</strong><span id="mindfulnessPhase">Ready when you are.</span></div><div class="mindfulness-celebration" aria-hidden="true"><span>Practice complete!</span><i></i><i></i><i></i><i></i><i></i></div>';
  renderMindfulnessFocusObjects();
}
function renderMindfulnessFocusObjects() { const scene = $('#mindfulnessStage .mindfulness-focus-scene'); if (!scene) return; const count = 7 + Math.floor(Math.random() * 7); scene.innerHTML = Array.from({ length: count }, (_, index) => `<i class="focus-object focus-object-${index + 1}" style="--object-x:${Math.round(Math.random() * 260 - 130)}px;--object-y:${Math.round(Math.random() * 150 - 75)}px;--object-speed:${(7 + Math.random() * 14).toFixed(1)}s;--object-delay:-${(Math.random() * 12).toFixed(1)}s;--object-scale:${(0.65 + Math.random() * 1.4).toFixed(2)}"></i>`).join(''); }
function updateMindfulnessStepper(target, value) { const element = target === 'duration' ? $('#mindfulnessDuration') : $('#mindfulnessBreathLength'); if (element) element.textContent = target === 'duration' ? `${value} minute${value === 1 ? '' : 's'}` : `${value} second${value === 1 ? '' : 's'}`; document.querySelectorAll(`[data-mindfulness-step="${target}"]`).forEach((button) => { const min = target === 'duration' ? 1 : 3; const max = target === 'duration' ? 30 : 8; button.disabled = (button.dataset.step === '-1' && value <= min) || (button.dataset.step === '1' && value >= max); }); }
function stepMindfulnessValue(target, delta) { const element = target === 'duration' ? $('#mindfulnessDuration') : $('#mindfulnessBreathLength'); if (!element) return; const current = Number.parseInt(element.textContent, 10); const min = target === 'duration' ? 1 : 3; const max = target === 'duration' ? 30 : 8; const next = Math.min(max, Math.max(min, current + delta)); updateMindfulnessStepper(target, next); resetMindfulnessTimer(); }
function renderContent() { const feature = featureContent[activeFeature]; const position = modes[activeMode].features.findIndex(([id]) => id === activeFeature) + 1; const kicker = `${modes[activeMode].title} / ${String(position).padStart(2, '0')}`; $('#featureContent').innerHTML = `${featureArtHtml(activeFeature)}<p class="feature-kicker">${kicker}</p><h3>${feature.title}</h3><p class="feature-lede">${feature.lede}</p>${feature.body}`; if (activeFeature === 'mindfulness') renderMindfulnessMarkup(); bindFeatureEvents(); }
function showScreen(name) { document.querySelectorAll('.screen').forEach((screen) => { screen.hidden = screen.id !== `screen${name}`; }); window.scrollTo(0, 0); }
function openApp() { showScreen('Modes'); }
function backToModes() { showScreen('Modes'); }
function backToFeatures() { showScreen('Features'); }
function selectMode(mode) { activeMode = mode; activeFeature = modes[mode].features[0][0]; document.querySelectorAll('.mode-button').forEach((button) => button.classList.toggle('is-active', button.dataset.mode === mode)); renderFeatureList(); showScreen('Features'); }
function selectFeature(feature) { activeFeature = feature; renderFeatureList(); renderContent(); showScreen('Content'); }
const WORD_BANK_KEY = 'openpath-wordbank';
function renderWordBank() {
  const list = $('#wordList'); if (!list) return;
  const words = getStoredItems(WORD_BANK_KEY);
  list.innerHTML = words.length ? words.map((item) => `<div class="result"><button class="word-chip" data-word-open="${escapeHtml(item.name)}" type="button">${escapeHtml(item.name)}</button><button class="secondary-button" data-word-remove="${escapeHtml(item.id)}" type="button" aria-label="Remove ${escapeHtml(item.name)}">Remove</button></div>`).join('') : '<p class="feature-lede">No words yet. Add a hard word above.</p>';
}
function showWordDetail(word) {
  const panel = $('#wordDetail'); if (!panel) return;
  panel.hidden = false; panel.dataset.word = word;
  $('#wordDetailTitle').textContent = word;
  speak(word, 1, getLockedVoiceId());
}
function bindWordBank() {
  const form = $('#wordForm'); if (!form) return;
  renderWordBank();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const word = new FormData(form).get('word').trim();
    if (!word) return;
    if (getStoredItems(WORD_BANK_KEY).some((item) => item.name.toLowerCase() === word.toLowerCase())) { showToast('That word is already in your word bank.'); return; }
    saveStored(WORD_BANK_KEY, word, '');
    form.reset(); renderWordBank(); showToast('Word added to your word bank.');
  });
  $('#wordList').addEventListener('click', (event) => {
    const open = event.target.closest('[data-word-open]');
    if (open) { showWordDetail(open.dataset.wordOpen); return; }
    const remove = event.target.closest('[data-word-remove]');
    if (remove) { localStorage.setItem(WORD_BANK_KEY, JSON.stringify(getStoredItems(WORD_BANK_KEY).filter((item) => item.id !== remove.dataset.wordRemove))); renderWordBank(); }
  });
  document.querySelectorAll('[data-word-hear]').forEach((button) => button.addEventListener('click', () => speak($('#wordDetail').dataset.word, button.dataset.wordHear, getLockedVoiceId())));
}
function getStoredItems(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function renderStoredList(key, target, emptyText) { const items = getStoredItems(key); const element = $(target); if (!element) return; element.innerHTML = items.length ? items.map((item) => { const phraseButton = key === 'openpath-phrases' ? `<button class="quick-response saved-quick-response" data-speak-saved="${escapeHtml(item.name)}" type="button">${escapeHtml(item.name)}</button>` : `<strong>${escapeHtml(item.name)}</strong>`; return `<div class="result"><span>${phraseButton}<small>${escapeHtml(item.detail)}</small></span><button class="secondary-button" data-remove="${key}:${item.id}" type="button">Remove</button></div>`; }).join('') : `<p class="feature-lede">${emptyText}</p>`; }
function saveStored(key, name, detail, time, dose) { const items = getStoredItems(key); items.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name, detail, time, dose }); localStorage.setItem(key, JSON.stringify(items)); }
// One shared, reused AudioContext instead of creating a new one per beep: mobile browsers cap how many
// contexts can exist, and a fresh context created outside a user gesture is born suspended (silent) on phones.
let sharedAudioContext;
function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioContext) sharedAudioContext = new AudioContextClass();
  return sharedAudioContext;
}
// Mobile browsers block audio playback until a real tap unlocks it; unlock our shared context on the user's first tap anywhere in the app.
function unlockAudioContext() { const ctx = getAudioContext(); if (ctx && ctx.state === 'suspended') ctx.resume(); }
document.addEventListener('pointerdown', unlockAudioContext, { once: true });
function playAlarmSound() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') ctx.resume();
  if (ctx) {
    const beepCount = 3;
    for (let i = 0; i < beepCount; i += 1) {
      const start = ctx.currentTime + i * 0.5;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.35);
    }
  }
  // Vibration works even when a phone is on silent or audio playback is still blocked.
  if ('vibrate' in navigator) navigator.vibrate([300, 150, 300, 150, 300]);
}
function showAlarmBanner(message) { const banner = $('#alarmBanner'); if (!banner) return; $('#alarmMessage').textContent = message; banner.hidden = false; }
function hideAlarmBanner() { const banner = $('#alarmBanner'); if (banner) banner.hidden = true; }
function stopAlarm() { window.clearInterval(alarmInterval); window.clearTimeout(alarmTimeout); alarmInterval = undefined; alarmTimeout = undefined; hideAlarmBanner(); }
function startAlarm(message) { stopAlarm(); playAlarmSound(); alarmInterval = window.setInterval(playAlarmSound, 2000); alarmTimeout = window.setTimeout(stopAlarm, 10 * 60 * 1000); showAlarmBanner(message); }
function notifyReminder(reminder) { const doseText = reminder.dose ? ` (${reminder.dose})` : ''; const message = `${reminder.name}${doseText} is due now.`; startAlarm(message); showToast(message); if ('Notification' in window && Notification.permission === 'granted') new Notification('Stability reminder', { body: message, silent: true }); }
function scheduleReminder(key, reminder) { if (!reminder.time) return; const timerKey = `${key}:${reminder.id}`; window.clearTimeout(reminderTimers.get(timerKey)); const [hours, minutes] = reminder.time.split(':').map(Number); const now = new Date(); const next = new Date(now); next.setHours(hours, minutes, 0, 0); if (next <= now) next.setDate(next.getDate() + 1); const timer = window.setTimeout(() => { notifyReminder(reminder); markReminderFiredToday(key, reminder.id); scheduleReminder(key, reminder); }, next.getTime() - now.getTime()); reminderTimers.set(timerKey, timer); }
function scheduleStoredReminders() { ['openpath-routines', 'openpath-meds'].forEach((key) => getStoredItems(key).forEach((reminder) => scheduleReminder(key, reminder))); }
async function requestReminderPermission() { if (!('Notification' in window)) return; if (Notification.permission === 'default') await Notification.requestPermission(); }
// Phones frequently suspend background timers while the screen is locked or the app is minimized, so a setTimeout
// scheduled for the exact due time can be delayed or dropped. As a safety net, re-check every reminder against the
// clock whenever the page becomes visible again (or first loads), and fire any reminder that is due but was not
// already fired today.
function todayStamp() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }
function reminderFiredKey(key, id) { return `openpath-fired-${key}-${id}`; }
function markReminderFiredToday(key, id) { localStorage.setItem(reminderFiredKey(key, id), todayStamp()); }
function wasReminderFiredToday(key, id) { return localStorage.getItem(reminderFiredKey(key, id)) === todayStamp(); }
function checkDueReminders() {
  ['openpath-routines', 'openpath-meds'].forEach((key) => {
    getStoredItems(key).forEach((reminder) => {
      if (!reminder.time || wasReminderFiredToday(key, reminder.id)) return;
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const now = new Date();
      const scheduledToday = new Date(now); scheduledToday.setHours(hours, minutes, 0, 0);
      if (now >= scheduledToday) { notifyReminder(reminder); markReminderFiredToday(key, reminder.id); scheduleReminder(key, reminder); }
    });
  });
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkDueReminders(); });
window.addEventListener('pageshow', checkDueReminders);
const TOUCH_SCALE_KEY = 'openpath-touch-scale';
const TOUCH_SCALE_MIN = 100;
const TOUCH_SCALE_MAX = 160;
const TOUCH_SCALE_STEP = 10;
function getTouchScale() { const stored = Number(localStorage.getItem(TOUCH_SCALE_KEY)); return stored >= TOUCH_SCALE_MIN && stored <= TOUCH_SCALE_MAX ? stored : TOUCH_SCALE_MIN; }
function applyTouchScale(percent) { document.documentElement.style.setProperty('--touch-scale', percent / 100); localStorage.setItem(TOUCH_SCALE_KEY, String(percent)); }
function bindFeatureEvents() {
  if (activeFeature !== 'motorGames' && motorGameActive) { motorGameActive = false; clearMotorTimers(); }
  if (activeFeature !== 'motorGames' && motorDrawActive) { motorDrawActive = false; clearDrawTimers(); }
  bindWordBank();
  const routineForm = $('#routineForm'); if (routineForm) { renderStoredList('openpath-routines', '#routineResults', 'No routines yet. Add one above to keep the next step visible.'); routineForm.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(routineForm); const time = data.get('time'); saveStored('openpath-routines', data.get('name'), `Reminder at ${time}`, time); scheduleStoredReminders(); await requestReminderPermission(); renderStoredList('openpath-routines', '#routineResults', 'No routines yet.'); showToast('Routine reminder saved on this device.'); }); }
  const medForm = $('#medForm'); if (medForm) { renderStoredList('openpath-meds', '#medResults', 'No medication reminders yet.'); medForm.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(medForm); const time = data.get('time'); const dose = data.get('dose') || 'Dose reminder'; saveStored('openpath-meds', data.get('name'), `${dose} at ${time}`, time, dose); scheduleStoredReminders(); await requestReminderPermission(); renderStoredList('openpath-meds', '#medResults', 'No medication reminders yet.'); showToast('Medication reminder saved on this device.'); }); }
  document.querySelectorAll('[data-mood]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-mood]').forEach((item) => item.classList.remove('is-selected')); button.classList.add('is-selected'); const result = $('#moodResult'); result.hidden = false; result.querySelector('p').textContent = nextMoodSuggestion(button.dataset.mood); }));
  document.querySelectorAll('[data-body]').forEach((button) => button.addEventListener('click', () => button.classList.toggle('is-selected')));
  document.querySelectorAll('[data-action="mobility"]').forEach((button) => button.addEventListener('click', () => { const chosen = [...document.querySelectorAll('[data-body].is-selected')].map((item) => item.dataset.body); renderMobilitySuggestions(chosen); }));
  const touchMinus = $('#touchScaleMinus');
  const touchPlus = $('#touchScalePlus');
  if (touchMinus && touchPlus) {
    const updateTouchDisplay = (percent) => {
      const label = $('#touchScaleLabel'); const meterSpan = $('#touchScaleMeter');
      if (label) label.textContent = `Touch target size: ${percent}%${percent === TOUCH_SCALE_MIN ? ' (default)' : ''}`;
      if (meterSpan) meterSpan.style.width = `${((percent - TOUCH_SCALE_MIN) / (TOUCH_SCALE_MAX - TOUCH_SCALE_MIN)) * 100}%`;
      touchMinus.disabled = percent <= TOUCH_SCALE_MIN;
      touchPlus.disabled = percent >= TOUCH_SCALE_MAX;
    };
    updateTouchDisplay(getTouchScale());
    const step = (direction) => { const percent = Math.min(TOUCH_SCALE_MAX, Math.max(TOUCH_SCALE_MIN, getTouchScale() + direction * TOUCH_SCALE_STEP)); applyTouchScale(percent); updateTouchDisplay(percent); };
    touchMinus.addEventListener('click', () => step(-1));
    touchPlus.addEventListener('click', () => step(1));
  }
  const mindfulnessStart = $('#mindfulnessStart');
  const mindfulnessReset = $('#mindfulnessReset');
  const mindfulnessExercise = $('#mindfulnessExercise');
  const mindfulnessDuration = $('#mindfulnessDuration');
  const mindfulnessBreathLength = $('#mindfulnessBreathLength');
  if (mindfulnessStart && mindfulnessReset && mindfulnessExercise && mindfulnessDuration && mindfulnessBreathLength) {
    resetMindfulnessTimer();
    mindfulnessStart.addEventListener('click', () => {
      if (mindfulnessRunning) pauseMindfulnessPractice();
      else startMindfulnessPractice();
    });
    mindfulnessReset.addEventListener('click', resetMindfulnessTimer);
    mindfulnessExercise.addEventListener('change', resetMindfulnessTimer);
    document.querySelectorAll('[data-mindfulness-step]').forEach((button) => button.addEventListener('click', () => stepMindfulnessValue(button.dataset.mindfulnessStep, Number(button.dataset.step))));
  }
  updateGameBestDisplay();
  updateItemBestDisplay();
  updateMotorBestDisplay();
  document.querySelectorAll('[data-motor-game]').forEach((button) => button.addEventListener('click', () => selectMotorGame(button.dataset.motorGame)));
  const motorBoard = $('#motorBoard');
  if (motorBoard) {
    motorBoard.addEventListener('pointerdown', handleMotorBoardPointerDown);
    document.querySelectorAll('[data-action="start-motor"]').forEach((button) => button.addEventListener('click', startMotorGame));
  }
  const drawCanvas = $('#drawCanvas');
  if (drawCanvas) {
    updateDrawBestDisplay();
    drawCanvas.addEventListener('pointerdown', handleDrawPointerDown);
    drawCanvas.addEventListener('pointermove', handleDrawPointerMove);
    drawCanvas.addEventListener('pointerup', handleDrawPointerUp);
    drawCanvas.addEventListener('pointercancel', handleDrawPointerUp);
    document.querySelectorAll('[data-action="start-draw"]').forEach((button) => button.addEventListener('click', startDrawGame));
    document.querySelectorAll('[data-action="clear-draw"]').forEach((button) => button.addEventListener('click', clearDrawStroke));
    document.querySelectorAll('[data-action="confirm-draw"]').forEach((button) => button.addEventListener('click', confirmDrawing));
  }
  document.querySelectorAll('[data-action="start-game"]').forEach((button) => button.addEventListener('click', () => { gameLength = 4; startMemoryRound(); }));
  const gameAnswer = $('#gameAnswer'); if (gameAnswer) { gameAnswer.addEventListener('input', () => { if (!gamePattern.length) return; hideMemorySequence(); const answer = gameAnswer.value.replace(/\D/g, '').slice(0, gamePattern.length); gameAnswer.value = answer; if (answer.length !== gamePattern.length) return; if (answer === gamePattern.join('')) { gameLength += 1; startMemoryRound(nextGameSuccessMessage('number', { count: gameLength }), 'is-success'); } else { const achieved = gameLength > 4 ? gameLength - 1 : 0; endNumberRound(achieved); gameLength = 4; } }); }
  document.querySelectorAll('[data-game]').forEach((button) => button.addEventListener('click', () => selectGame(button.dataset.game)));
  document.querySelectorAll('[data-action="start-items"]').forEach((button) => button.addEventListener('click', startItemRecallRound));
  const itemRecallForm = $('#itemRecallForm'); if (itemRecallForm) itemRecallForm.addEventListener('submit', submitItemRecall);
  document.querySelectorAll('.quick-response').forEach((button) => button.addEventListener('click', () => { $('#speechText').value = button.dataset.phrase; }));
  document.querySelectorAll('[data-action="speak-text"]').forEach((button) => button.addEventListener('click', () => speak($('#speechText').value.trim() || 'Please give me a moment.', 1, getLockedVoiceId())));
  document.querySelectorAll('[data-action="save-phrase"]').forEach((button) => button.addEventListener('click', () => { const text = $('#speechText').value.trim(); if (!text) { showToast('Type a phrase before saving it.'); return; } saveStored('openpath-phrases', text, 'Custom quick response'); showToast('Quick response saved on this device.'); renderStoredList('openpath-phrases', '#phraseResults', 'Your saved responses will appear here.'); }));
  if ($('#phraseResults')) renderStoredList('openpath-phrases', '#phraseResults', 'Your saved responses will appear here.');
  if ($('#voiceSelect')) {
    renderVoicePicker();
    $('#voiceSelect').addEventListener('change', updateVoiceChooseButton);
    $('#voiceTestButton').addEventListener('click', () => speak('Hi, this is how I sound when I speak for you.', 1, $('#voiceSelect').value));
    $('#voiceChooseButton').addEventListener('click', () => { setLockedVoiceId($('#voiceSelect').value); renderVoicePicker(); const profile = getVoiceProfile($('#voiceSelect').value); showToast(profile ? `${profile.label} chosen as your conversation voice.` : 'Voice chosen.'); });
  }
  if ($('#lessonSet')) renderLesson();
  document.querySelectorAll('[data-action="speak-lesson"]').forEach((button) => button.addEventListener('click', () => speak(getCurrentLessonWord()[0], $('#lessonSpeed').value)));
  document.querySelectorAll('[data-action="next-lesson"]').forEach((button) => button.addEventListener('click', () => { activeLessonIndex = (activeLessonIndex + 1) % speechLessonSets[activeLessonSet].words.length; activeLessonPart = 0; renderLesson(); showToast('Next practice word loaded.'); }));
  if ($('#lessonSet')) $('#lessonSet').addEventListener('change', (event) => { activeLessonSet = Number(event.target.value); activeLessonIndex = 0; activeLessonPart = 0; renderLesson(); });
  document.querySelectorAll('[data-action="listen"]').forEach((button) => button.addEventListener('click', startVoiceControl));
}
function getCurrentLessonWord() { return speechLessonSets[activeLessonSet].words[activeLessonIndex]; }
function mouthShapeFor(part) { if (/^[bmp]/i.test(part)) return 'closed'; if (/^[fv]/i.test(part)) return 'teeth-lip'; if (/^[ou]/i.test(part)) return 'round'; if (/^[aiye]/i.test(part)) return 'wide'; if (/^[tdnlr]/i.test(part)) return 'tongue'; return 'open'; }
function renderLesson() { const setSelect = $('#lessonSet'); const wordElement = $('#lessonWord'); const partsElement = $('#lessonParts'); const demo = $('#mouthDemo'); const hint = $('#lessonPartHint'); const progress = $('#lessonProgress'); if (!setSelect || !wordElement || !partsElement || !demo || !hint || !progress) return; if (!setSelect.options.length) setSelect.innerHTML = speechLessonSets.map((set, index) => `<option value="${index}">${set.name}</option>`).join(''); setSelect.value = String(activeLessonSet); const [word, parts] = getCurrentLessonWord(); wordElement.textContent = word; progress.textContent = `${activeLessonIndex + 1} of ${speechLessonSets[activeLessonSet].words.length}`; partsElement.innerHTML = parts.map((part, index) => `<button class="lesson-part ${index === activeLessonPart ? 'is-active' : ''}" data-lesson-part="${index}" type="button"><span class="mouth-mini" data-shape="${mouthShapeFor(part)}"><span></span></span><strong>${escapeHtml(part)}</strong><small>Part ${index + 1}</small></button>`).join(''); const shape = mouthShapeFor(parts[activeLessonPart]); demo.dataset.shape = shape; demo.setAttribute('aria-label', `Mouth formation for ${parts[activeLessonPart]}`); hint.textContent = `Part ${activeLessonPart + 1}: ${parts[activeLessonPart]}. Select another part to see its mouth movement.`; }
function selectGame(game) { clearInterval(itemTimer); document.querySelectorAll('[data-game]').forEach((button) => button.classList.toggle('is-selected', button.dataset.game === game)); const numberGame = $('#numberGame'); const itemGame = $('#itemGame'); if (!numberGame || !itemGame) return; numberGame.hidden = game !== 'number'; itemGame.hidden = game !== 'items'; }
function setFeedback(selector, text, tone = '') { const el = $(selector); if (!el) return; el.textContent = text; el.classList.remove('is-success', 'is-warning'); if (text && tone) el.classList.add(tone); }
function formatMindfulnessTime(seconds) { const minutes = Math.floor(seconds / 60).toString().padStart(2, '0'); const remainder = (seconds % 60).toString().padStart(2, '0'); return `${minutes}:${remainder}`; }
function mindfulnessDurationSeconds() { const requested = Number.parseInt($('#mindfulnessDuration')?.textContent || '5', 10) * 60; const exerciseKey = $('#mindfulnessExercise')?.value || 'breathing'; if (exerciseKey !== 'breathing') return requested; const breathCycle = mindfulnessBreathSeconds() * 2; return Math.ceil(requested / breathCycle) * breathCycle; }
function mindfulnessBreathSeconds() { return Number.parseInt($('#mindfulnessBreathLength')?.textContent || '4', 10); }
function updateMindfulnessDisplay() {
  const exerciseKey = $('#mindfulnessExercise')?.value || 'breathing';
  const exercise = mindfulnessExercises[exerciseKey];
  const total = mindfulnessDurationSeconds();
  const elapsed = Math.max(0, total - mindfulnessRemaining);
  const phaseSets = {
    breathing: ['Breathe in', 'Breathe out'],
    bodyScan: ['Notice your feet and legs', 'Notice your middle body', 'Notice your chest and shoulders', 'Notice your face and head'],
    focus: ['Notice what you can see', 'Notice what you can hear', 'Notice what you can feel'],
  };
  const cycle = phaseSets[exerciseKey];
  const phase = mindfulnessFinishing || mindfulnessComplete ? '' : mindfulnessRunning || elapsed ? cycle[Math.floor(elapsed / (exerciseKey === 'breathing' ? mindfulnessBreathSeconds() : 8)) % cycle.length] : 'Ready when you are.';
  const time = $('#mindfulnessTime'); const phaseElement = $('#mindfulnessPhase'); const stage = $('#mindfulnessStage');
  if (time) time.textContent = formatMindfulnessTime(mindfulnessRemaining);
  if (phaseElement) phaseElement.textContent = phase;
  const breathControl = $('#mindfulnessBreathControl');
  if (breathControl) breathControl.hidden = exerciseKey !== 'breathing';
  if (stage) { stage.dataset.exercise = exerciseKey; stage.dataset.running = String(mindfulnessRunning); stage.dataset.finishing = String(mindfulnessFinishing); stage.dataset.complete = String(mindfulnessComplete); stage.style.setProperty('--breath-cycle', `${mindfulnessBreathSeconds() * 2}s`); stage.setAttribute('aria-label', `${exercise.name} animation${mindfulnessRunning ? ' in progress' : mindfulnessFinishing ? ' settling after exhale' : mindfulnessComplete ? ' complete' : ''}`); }
}
function resetMindfulnessTimer() { window.clearInterval(mindfulnessTimer); window.clearTimeout(mindfulnessFinishTimeout); mindfulnessTimer = undefined; mindfulnessFinishTimeout = undefined; mindfulnessRunning = false; mindfulnessFinishing = false; mindfulnessComplete = false; mindfulnessRemaining = mindfulnessDurationSeconds(); const start = $('#mindfulnessStart'); const status = $('#mindfulnessStatus'); if (start) { start.textContent = 'Start practice'; start.disabled = false; } if (status) status.textContent = 'Choose start when you feel ready.'; updateMindfulnessDisplay(); }
function finishMindfulnessPractice() { window.clearInterval(mindfulnessTimer); mindfulnessTimer = undefined; mindfulnessRunning = false; mindfulnessFinishing = true; mindfulnessRemaining = 0; const phaseElement = $('#mindfulnessPhase'); if (phaseElement) phaseElement.textContent = ''; const start = $('#mindfulnessStart'); const status = $('#mindfulnessStatus'); if (start) { start.textContent = 'Settling'; start.disabled = true; } if (status) status.textContent = ''; updateMindfulnessDisplay(); mindfulnessFinishTimeout = window.setTimeout(() => { mindfulnessFinishing = false; mindfulnessComplete = true; if (start) { start.textContent = 'Practice complete'; start.disabled = false; } if (status) status.textContent = 'You made time for yourself. Reset whenever you are ready for another practice.'; updateMindfulnessDisplay(); }, 2200); }
function pauseMindfulnessPractice() { window.clearInterval(mindfulnessTimer); mindfulnessTimer = undefined; mindfulnessRunning = false; const start = $('#mindfulnessStart'); const status = $('#mindfulnessStatus'); if (start) start.textContent = 'Resume practice'; if (status) status.textContent = 'Paused. Return whenever you feel ready.'; updateMindfulnessDisplay(); }
function startMindfulnessPractice() { if (mindfulnessFinishing) return; if (mindfulnessRemaining <= 0) resetMindfulnessTimer(); window.clearInterval(mindfulnessTimer); mindfulnessComplete = false; mindfulnessRunning = true; const start = $('#mindfulnessStart'); const status = $('#mindfulnessStatus'); if (start) { start.textContent = 'Pause practice'; start.disabled = false; } if (status) status.textContent = 'Stay with the practice for as long as it feels helpful.'; updateMindfulnessDisplay(); mindfulnessTimer = window.setInterval(() => { mindfulnessRemaining -= 1; if (mindfulnessRemaining <= 0) finishMindfulnessPractice(); else updateMindfulnessDisplay(); }, 1000); }
function startMemoryRound(message = '', tone = '') { gamePattern = Array.from({ length: gameLength }, () => Math.floor(Math.random() * 10)); const sequence = $('#gameSequence'); const answer = $('#gameAnswer'); if (!sequence || !answer) return; const gameOver = $('#numberGameOver'); if (gameOver) { gameOver.hidden = true; gameOver.classList.remove('is-celebration'); } sequence.innerHTML = gamePattern.map((number) => `<span class="number-bubble">${number}</span>`).join(''); sequence.classList.remove('is-hidden'); $('#gameLevel').textContent = `${gameLength} numbers`; $('#gamePrompt').textContent = 'Look at the numbers, then type them in the same order.'; setFeedback('#gameResult', message, tone); answer.value = ''; answer.disabled = false; answer.focus(); }
function endNumberRound(achieved) {
  const outcome = buildScoreOutcome('number', achieved, 'digit');
  updateGameBestDisplay();
  const panel = $('#numberGameOver'); if (!panel) return;
  panel.classList.toggle('is-celebration', outcome.headline === 'New high score!');
  const titleEl = $('#numberGameOverTitle'); const detailEl = $('#numberGameOverDetail'); const scoreEl = $('#numberGameOverScore');
  if (titleEl) titleEl.textContent = 'Round Over';
  if (detailEl) detailEl.textContent = `You lost. You recalled a sequence of ${pluralize(achieved, 'digit')}.`;
  if (scoreEl) scoreEl.innerHTML = `<strong>${outcome.headline}</strong> ${outcome.detail}`;
  panel.hidden = false;
  $('#gamePrompt').textContent = 'Your round has ended.';
  const answer = $('#gameAnswer'); if (answer) answer.disabled = true;
  setFeedback('#gameResult', '');
}
function resetItemGameOverPanel() { const panel = $('#itemGameOver'); if (!panel) return; panel.classList.remove('is-celebration'); const title = $('#itemGameOverTitle'); const detail = $('#itemGameOverDetail'); const score = $('#itemGameOverScore'); if (title) title.textContent = 'Game Over'; if (detail) detail.textContent = 'That item was not in the chest.'; if (score) score.innerHTML = ''; }
function hideMemorySequence() { const sequence = $('#gameSequence'); if (!sequence || sequence.classList.contains('is-hidden')) return; sequence.classList.add('is-hidden'); sequence.textContent = 'The numbers are hidden. Keep going.'; $('#gamePrompt').textContent = 'The numbers are hidden. Type the sequence from memory.'; }
function startItemRecallRound() { const itemBank = ['apple', 'book', 'key', 'umbrella', 'cup', 'star', 'pencil', 'shoe', 'camera', 'flower', 'ball', 'hat', 'clock', 'guitar', 'bicycle', 'candle', 'shell', 'scarf', 'coin', 'backpack', 'banana', 'bottle', 'bridge', 'cloud', 'drum', 'feather', 'glasses', 'leaf', 'moon', 'orange', 'pillow', 'rainbow', 'ring', 'rocket', 'spoon', 'teddy bear', 'toothbrush', 'train', 'tree', 'watch']; itemRoundItems = itemBank.map((item) => ({ item, sort: Math.random() })).sort((a, b) => a.sort - b.sort).slice(0, 10).map(({ item }) => item); itemRoundFound = []; itemGameOver = false; clearInterval(itemTimer); const itemList = $('#itemList'); const itemForm = $('#itemRecallForm'); const gameOver = $('#itemGameOver'); const itemDisplay = $('#itemDisplay'); if (!itemList || !itemForm || !gameOver || !itemDisplay) return; itemList.innerHTML = itemRoundItems.map((item) => `<li>${item}</li>`).join(''); itemDisplay.classList.remove('is-hidden'); gameOver.hidden = true; resetItemGameOverPanel(); updateItemBestDisplay(); $('#itemCountdown').textContent = '30'; $('#itemPrompt').textContent = 'Study the items before the chest closes.'; $('#itemResult').textContent = ''; $('#itemScore').textContent = '0 / 10 correct'; itemForm.hidden = true; itemForm.reset(); let seconds = 30; itemTimer = window.setInterval(() => { const countdown = $('#itemCountdown'); if (!countdown) { clearInterval(itemTimer); return; } seconds -= 1; countdown.textContent = seconds; if (seconds <= 0) { clearInterval(itemTimer); itemDisplay.classList.add('is-hidden'); itemForm.hidden = false; $('#itemPrompt').textContent = 'The chest is closed. How many items can you remember?'; $('#itemAnswer').focus(); } }, 1000); }
function endItemRound({ celebration, title, detail, score }) {
  itemGameOver = true;
  const itemForm = $('#itemRecallForm'); const panel = $('#itemGameOver');
  if (itemForm) itemForm.hidden = true;
  if (!panel) return;
  panel.classList.toggle('is-celebration', celebration);
  const outcome = buildScoreOutcome('items', score, 'item');
  updateItemBestDisplay();
  const titleEl = $('#itemGameOverTitle'); const detailEl = $('#itemGameOverDetail'); const scoreEl = $('#itemGameOverScore');
  if (titleEl) titleEl.textContent = title;
  if (detailEl) detailEl.textContent = detail;
  if (scoreEl) scoreEl.innerHTML = `<strong>${outcome.headline}</strong> ${outcome.detail}`;
  panel.hidden = false;
  $('#itemPrompt').textContent = 'Your round has ended.';
  setFeedback('#itemResult', '');
}
function submitItemRecall(event) { event.preventDefault(); if (itemGameOver) return; const answer = $('#itemAnswer').value.trim().toLowerCase(); if (!answer) return; if (itemRoundItems.includes(answer) && !itemRoundFound.includes(answer)) { itemRoundFound.push(answer); $('#itemScore').textContent = `${itemRoundFound.length} / 10 correct`; if (itemRoundFound.length === 10) { endItemRound({ celebration: true, title: 'Perfect recall!', detail: 'You named all 10 items. Incredible memory!', score: 10 }); } else { setFeedback('#itemResult', nextGameSuccessMessage('items'), 'is-success'); } } else if (itemRoundFound.includes(answer)) { setFeedback('#itemResult', 'You already named that item. Try another one.', 'is-warning'); } else { endItemRound({ celebration: false, title: 'Game Over', detail: `That item was not in the chest. You lost with ${pluralize(itemRoundFound.length, 'item')} remembered.`, score: itemRoundFound.length }); } $('#itemAnswer').value = ''; }
const VOICE_ERROR_MESSAGES = {
  'not-allowed': 'Microphone access was blocked. Allow microphone access for this site in your browser settings, then try again.',
  'service-not-allowed': 'Microphone access was blocked. Allow microphone access for this site in your browser settings, then try again.',
  'no-speech': 'I did not hear anything. Try again and speak right after the listening sound.',
  network: 'A network problem stopped voice control. Check your internet connection and try again.',
  'audio-capture': 'No microphone was found on this device.',
};
let activeRecognition = null;
function setVoiceButtonsListening(isListening) { document.querySelectorAll('#voiceButton, [data-action="listen"]').forEach((button) => button.classList.toggle('voice-listening', isListening)); }
function startVoiceControl() {
  // Clicking again while listening stops it, so the mic does not keep running unexpectedly.
  if (activeRecognition) { activeRecognition.stop(); return; }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { showToast('This browser cannot listen for voice commands. On iPhone/iPad, no browser supports this yet (Apple\u2019s WebKit engine doesn\u2019t support it); try Chrome or Edge on a computer or an Android phone.'); return; }
  // Browsers only allow microphone access on HTTPS or localhost, so voice control cannot work when the app is opened from a local file.
  if (!window.isSecureContext) { showToast('Voice control needs the app to be served over https:// (or localhost). It will not work when opened directly from a file.'); return; }
  const recognition = new Recognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  // A blocked or ignored microphone permission prompt is the most common reason voice control silently fails, so remind the user every time.
  showToast('Don\u2019t forget to allow microphone access for this site if your browser asks. Listening now: say "cognitive mode", "motor mode", or "speech mode".');
  recognition.onstart = () => { activeRecognition = recognition; setVoiceButtonsListening(true); };
  recognition.onend = () => { activeRecognition = null; setVoiceButtonsListening(false); };
  recognition.onerror = (event) => { showToast(VOICE_ERROR_MESSAGES[event.error] || 'I could not hear that. Try again.'); };
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    const mode = Object.keys(modes).find((key) => text.includes(key));
    if (mode) { selectMode(mode); showToast(`Opening ${mode} mode.`); } else { showToast(`Heard "${text}". Try saying cognitive, motor, or speech mode.`); }
  };
  try { recognition.start(); } catch (error) { activeRecognition = null; setVoiceButtonsListening(false); showToast('Could not start voice control. Try again.'); }
}

document.querySelectorAll('.mode-button').forEach((button) => button.addEventListener('click', () => selectMode(button.dataset.mode)));
document.addEventListener('click', (event) => { const feature = event.target.closest('[data-feature]'); if (feature) selectFeature(feature.dataset.feature); });
$('#openAppButton').addEventListener('click', openApp);
$('#aboutAppButton').addEventListener('click', () => showScreen('About'));
document.addEventListener('click', (event) => { if (event.target.closest('[data-action="back-to-home"]')) showScreen('Splash'); });
document.addEventListener('click', (event) => { const button = event.target.closest('[data-action="back-to-modes"]'); if (button) backToModes(); });
document.addEventListener('click', (event) => { const button = event.target.closest('[data-action="back-to-features"]'); if (button) backToFeatures(); });
document.addEventListener('click', (event) => { const button = event.target.closest('[data-speak-saved]'); if (!button) return; $('#speechText').value = button.dataset.speakSaved; speak(button.dataset.speakSaved, 1, getLockedVoiceId()); });
document.addEventListener('click', (event) => { const button = event.target.closest('[data-lesson-part]'); if (!button) return; activeLessonPart = Number(button.dataset.lessonPart); renderLesson(); });
document.addEventListener('click', (event) => { const button = event.target.closest('[data-remove]'); if (!button) return; const [key, id] = button.dataset.remove.split(':'); const items = getStoredItems(key).filter((item) => String(item.id) !== id); localStorage.setItem(key, JSON.stringify(items)); window.clearTimeout(reminderTimers.get(`${key}:${id}`)); reminderTimers.delete(`${key}:${id}`); const targets = { 'openpath-routines': ['#routineResults', 'No routines yet. Add one above to keep the next step visible.'], 'openpath-meds': ['#medResults', 'No medication reminders yet.'], 'openpath-phrases': ['#phraseResults', 'Your saved responses will appear here.'] }; const [target, emptyText] = targets[key] || []; if (target) renderStoredList(key, target, emptyText); showToast(key === 'openpath-phrases' ? 'Quick response removed.' : 'Reminder removed.'); });
$('#voiceButton').addEventListener('click', startVoiceControl);
$('#alarmDismiss').addEventListener('click', stopAlarm);
$('#dateLabel').textContent = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date());
applyTouchScale(getTouchScale());
renderFeatureList();
renderContent();
showScreen('Splash');
scheduleStoredReminders();
checkDueReminders();
