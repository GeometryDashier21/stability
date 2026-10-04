# Stability Requirements

## Problem Statement

The application, named Stability, will provide people with disabilities different tools and forms of support to make everyday tasks easier. A single app should provide accessible assistance tailored to the user's needs instead of assuming that one experience works for everyone.

## Goals

- Make everyday life easier for people with disabilities.
- Provide support tailored to different disability-related needs.
- Design the app around accessibility, flexibility, and user independence.

## Target Users

- People with disabilities who need practical support with everyday activities.

## Branding

- The app is named Stability. The name appears prominently in the header brand mark at the top of the app (and in the browser tab title) so it is clearly visible as soon as the app loads.
- The small tagline text shown under the "Stability" brand name, and used alongside the name in the browser tab title, reads "your disability assistant".
- On the splash screen, "Stability" is shown again as a large, centered headline in the middle of the page (distinct from the smaller header brand mark), with the "A calmer way through the day" tagline displayed beneath it in a larger, bolded style so it reads as the app's slogan/catchphrase.
- The splash screen has two buttons: "Open app" and "About the App". "About the App" opens its own full screen (with a "Back to home" button) showing a short "Three modes, one app" section with one card per mode (Cognitive, Motor, Speech), each giving a brief, plain-language description of who the mode is for and the kinds of tools it includes, so a new user understands what each mode offers without scrolling the home page.

## Navigation And Organization

- The app opens on a single splash screen with an "Open app" button; no mode, feature, or tool content is visible until the user taps it. This avoids requiring users to discover content by scrolling.
- After opening the app, the user sees a dedicated screen with only the three mode buttons: Cognitive Mode, Motor Mode, and Speech Mode.
- Selecting a mode navigates to a new screen showing only that mode's feature buttons (a "Back to modes" button returns to mode selection).
- Selecting a feature navigates to a new screen showing only that feature's tool content (a "Back to tools" button returns to the feature list).
- Each step (splash, modes, features, content) is its own full screen; only one is visible at a time, and each screen starts scrolled to the top, so users are never required to scroll to discover that a button worked.
- The mode-and-feature button structure will keep the app organized and make available tools easier to find.

## Supported Disability Categories

The app will initially support needs associated with these categories:

1. Cognitive disorders
2. Motor problems
3. Speech impediments

## Features And Functionalities

### Cognitive Mode

#### Daily Routine Reminders

- The app will let users create reminders for daily routines.
- The app will send notifications to remind users when a routine or task is due.
- Users can remove saved routine reminders.
- Routine reminders repeat daily at the selected time while the app is open.
- The app requests browser notification permission when a reminder is saved and shows an in-app notification when the reminder is due.
- Due reminders play an in-app alarm sound instead of relying on the default system notification sound.
- The alarm also vibrates the device (on phones that support vibration) alongside the sound, so a reminder is still noticeable if the phone is on silent or if audio playback is blocked.
- The alarm reuses a single, shared audio player unlocked by the user's first tap in the app, rather than creating a new one per beep, so alarm sound is not silently blocked by mobile browsers' autoplay restrictions.
- If a reminder's due time passes while the app is in the background, the screen is locked, or the browser tab was suspended, the alarm still fires as soon as the app becomes visible again (or is reopened) on the same day, instead of only relying on a background timer that phones can delay or drop.
- The alarm repeats every few seconds and shows a dismiss banner until the user dismisses it or a safety timeout is reached, so a reminder is not missed after only a few beeps.

#### Medication Tracker

- The app will let users record medications and the times they need to take them.
- The app will send simple notifications to remind users when a medication dose is due.
- Users can remove saved medication reminders.
- Medication reminders repeat daily at the selected time while the app is open.
- The app requests browser notification permission when a reminder is saved and shows an in-app notification when the reminder is due.
- Due medication reminders play an in-app alarm sound instead of relying on the default system notification sound.
- The alarm also vibrates the device (on phones that support vibration) alongside the sound, so a reminder is still noticeable if the phone is on silent or if audio playback is blocked.
- If a reminder's due time passes while the app is in the background, the screen is locked, or the browser tab was suspended, the alarm still fires as soon as the app becomes visible again (or is reopened) on the same day, instead of only relying on a background timer that phones can delay or drop.
- The alarm repeats every few seconds and shows a dismiss banner until the user dismisses it or a safety timeout is reached, so a reminder is not missed after only a few beeps.
- Due medication notifications include the dose note alongside the medication name.
- The feature is intended to help users who forget medication doses, including users with ADHD-related memory challenges.
- Dose tracking, missed-dose handling, medication details, and safety boundaries are to be defined.

#### Cognitive Skills Games

- The app will provide games designed to exercise cognitive skills.
- Games will help users practice skills that may not have been learned or developed previously.
- Games should present learning and practice in an engaging, supportive format.
- Cognitive Skills Games will provide two separate game buttons: Number Memory and Item Recall.
- Only the game selected by the user will be displayed, and the user can switch between the two games by selecting the other button.
- The first game will be a number memory game that starts each round by showing a random sequence of four numbers as large, bubble-style number tiles.
- When the user begins typing their answer, the number sequence will disappear so the user recalls it from memory.
- A correctly completed sequence advances the next round by one number, starting at four numbers and continuing with five, six, seven, and higher, with a visible "Correct!" success banner shown near the answer field.
- An incorrect sequence ends the round immediately: the answer field locks and a Round Over card (matching the Item Recall Game Over card style) reports the score and high-score comparison. The user must press Start Game to begin a new round at four numbers.
- The game will give clear, supportive feedback after each attempt and let the user begin a new round.
- Success feedback in both cognitive skills games will use varied encouraging messages rather than repeating the same sentence after every correct answer.
- The next game will be an item-recall game that displays a chest containing approximately 10 varied, randomly selected items from a broad item bank.
- The chest and its items will remain visible for 30 seconds, with a bubble-style countdown displayed beside the chest.
- While the chest is open, the item-recall text box will remain hidden so the user cannot enter answers during the study period.
- When the 30-second countdown ends, the chest and its items will disappear and the text box will appear for item recall.
- The user will enter one item at a time and press Enter to submit each answer.
- Each correctly recalled item will allow the user to enter another item, and the game will count correct answers out of 10, with a visible "Correct!" success banner (and a warning banner for repeated guesses) shown near the answer field rather than as small text below the Start Game button.
- If the user submits an item that is not in the chest, the round will end immediately and display a Game Over screen.
- If the user correctly names all 10 items, the round ends immediately with a celebratory "Perfect recall!" end message instead of a Game Over screen.
- Each game tracks a separate, persistent high score saved on the device (longest digit sequence recalled for Number Memory; most items recalled for Item Recall), shown live in the game header (e.g. "Best: 6 digits" / "Best: 8 / 10").
- The end-of-round message always states the score and that the round ended (loss), but is framed with encouraging, varied phrasing rather than a flat "Game Over" label alone.
- If the round's score beats the saved high score, the end message announces a new high score and states by how much the previous best was beaten.
- If the round's score does not beat the saved high score, the end message tells the user how close they were (the gap) to their best score, and encourages another attempt.
- The user will be able to start a new item-recall round using the Start Game button.
- Additional game types, target skills, accessibility controls, and the boundaries of any brain-training claims are to be defined.

#### Mood Check-In And Coping Exercises

- The app will send scheduled check-ins at user-defined intervals to ask how the user is feeling.
- Users will be able to respond with a mood or emotional state that reflects how they are feeling.
- The mood check-in offers these mood options: happy, sad, calm, overwhelmed, tired, angry, stressed, excited, and nervous.
- Based on the response, the app will suggest exercises or actions intended to help the user feel better or stay better.
- Each mood draws from a large, locally generated pool of suggestion combinations (well beyond a handful of fixed options) so repeated check-ins for the same mood feel varied rather than repetitive, without requiring an external AI service.
- Selecting the same mood again shows a different suggestion each time until the full pool has been shown, then the pool reshuffles.
- The feature should be supportive, not critical, and should allow the user to choose their own pace.
- The exact interval options, mood categories, exercise library, and response logic are to be defined.

#### Mindfulness Practice

- Cognitive Mode will provide a mindfulness practice tool with selectable practice lengths from 1 to 30 minutes.
- Users will be able to choose guided breathing, body scan, or sensory focus exercises.
- Guided breathing will provide an adjustable pace of 3, 4, 5, 6, or 8 seconds for each inhale and exhale, shown once beside the Breath length title.
- The tool will show an exercise-related calming animation while practice is running.
- Each exercise will use a substantially different visual form and movement so the exercises are easy to distinguish.
- Sensory Focus will display a randomized set of 7 to 13 objects; each object will have its own movement speed, path, delay, and size-pulse behavior.
- Practice length will be adjustable to any whole-minute value from 1 to 30 using plus and minus controls.
- Breath length will be adjustable to any whole-second value from 3 to 8 using plus and minus controls, and the control will only appear for Guided Breathing.
- The current timer and exercise instruction will appear together inside the animation stage.
- Completing a practice will show a positive celebration animation before the user resets or starts again.
- Guided Breathing will round the requested practice duration up to the next complete inhale/exhale cycle so the timer always ends after an exhale.
- Practice completion will ease through a brief settling phase after the final exhale before showing the celebration animation.
- At `00:00`, the breathing instruction and timer text will disappear while the circle holds at its smallest exhale size.
- The smallest circle will cross-fade into the Practice Complete screen rather than disappearing abruptly.
- Users will be able to start, pause, resume, and reset a practice at any time.
- The timer and phase guidance will be visible and announced through an accessible live status.
- The tool is a supportive practice aid and does not make medical or mental-health treatment claims.

### Motor Mode

#### Body Check-In And Mobility Guidance

- The app will prompt users to check in on which parts of their body are not working as well as usual and which parts are working well.
- The check-in will use a multiple-choice format so users can select the areas they are experiencing discomfort, stiffness, weakness, or reduced movement in.
- Body area options include: Neck, Shoulders, Elbows, Wrists, Hands, Back, Hips, Knees, Ankles, and Feet.
- The app will provide recommended mobility exercises or gentle movement routines tailored to the selected body areas and the user's reported pain or strain.
- Each body area draws from a large, locally generated pool of specific, named exercises and stretches for that area (not a generic "range of motion" message) so repeated check-ins for the same area feel varied rather than repetitive, without requiring an external AI service.
- Each exercise/stretch suggestion includes clear, step-by-step instructions (positioning, reps, and hold times) so the user knows exactly how to perform it.
- Selecting the same body area again shows a different suggestion each time until the full pool has been shown, then the pool reshuffles.
- For each selected body area, the app displays only the one randomly suggested exercise, along with an animated illustration of a person performing that exact suggested movement (not a browsable list of every possible stretch).
- The animated illustration is shown on a ground/floor line so the figure appears grounded during the movement.
- Each animation starts paused with its own Play/Pause button, and loops continuously once played, so the user has time to scroll to it and watch without racing a short one-shot clip.
- The goal is to help users manage discomfort, reduce stiffness, and support overall mobility through guided movement.
- The exact pain levels and recommendation logic beyond area selection are to be defined.

#### Large Touch Targets And Expanded Layout

- Motor Mode will use a larger layout and more spacious interface design for users with tremors or reduced fine motor control.
- Buttons, controls, and interactive elements will be intentionally enlarged to improve tap accuracy and reduce accidental presses.
- The interface will prioritize clarity, separation, and accessibility over compact layouts.
- The Large Touch Layout screen provides big, easy-to-press plus and minus buttons (not a slider, since a slider is hard to operate with a motor impairment) that live-resize every button and control across the entire app (not just Motor Mode), with a label showing the current percentage. Sizing is limited to a 100%-160% range in 10% steps, and the plus/minus buttons disable at the max/min so users cannot scale beyond the limit.
- The chosen touch target size is saved on the device and reapplied automatically the next time the app loads.
- The required spacing rules and target-device considerations beyond the size range are to be defined.

#### Persistent Voice Control

- The app will include a persistent voice-control button that remains available across the app at all times.
- The voice-control feature is designed for users with shaky or uncontrollable limbs who may not be able to interact with the interface through touch alone.
- Users will be able to speak commands to trigger core actions without relying on small or precise gestures.
- This feature is intended for broad app interactions and is separate from the dedicated speech support functionality in the speech mode section.
- Tapping the voice button starts listening for a single spoken command using the browser's built-in speech recognition; tapping it again while listening stops it.
- Every time the user taps the voice button (and the browser/context checks pass), the app shows a reminder to allow microphone access for the site if the browser asks, alongside the supported commands, since a blocked or ignored permission prompt is the most common reason voice control silently fails.
- Supported commands currently open a mode by saying its name: "cognitive mode", "motor mode", or "speech mode".
- If the microphone is blocked, no speech is heard, or a command is not recognized, the app shows a specific, plain-language toast explaining what happened and what to do next, instead of failing silently.
- Additional supported commands beyond opening a mode are to be defined.

#### Motor Games

- The app will provide games designed to exercise motor speed and coordination, in the same one-tool-card format used by the Cognitive Skills Games.
- Motor Games provides two separate game buttons, matching the Cognitive Skills Games selector pattern: Whack-a-mole and Precision drawing. Only the game selected by the player is displayed, and the player can switch between the two games by selecting the other button.
- The first game is a whack-a-mole game with no fixed holes: the mole can appear anywhere on the game board rather than only in predefined spots.
- The game has ten levels, and each level lasts 30 seconds.
- After each level, moles stay visible for less time than the previous level, increasing the speed and coordination challenge as the player progresses.
- On-screen instructions explain how to play (whack moles before they disappear, missing costs a strike, and running out of strikes ends the game) so the rules are clear before starting.
- Each level begins with a 3, 2, 1, Go! countdown before any mole appears, so the player is not caught off guard by the first mole of the level.
- The player's cursor acts as the hammer on desktop; a distinct hammer cursor is shown while the mouse is over the game board.
- The game also supports touchscreen devices such as phones: tapping a mole whacks it, using the same pointer-based interaction as the mouse.
- Whacking a mole immediately ends its appearance and spawns a new mole elsewhere on the board.
- Missing a mole (letting its timer expire without whacking it) counts as a strike. A visible strike counter tracks strikes out of a maximum of five for the entire game, and strikes carry over from one level to the next rather than resetting.
- Reaching five strikes ends the game immediately with a Game Over outcome, regardless of which level the player is on.
- When a level's 30 seconds end without reaching five strikes, the game briefly pauses (moles stop spawning) and shows a level-complete message with that level's mole count and the running total score, before automatically continuing to the next level.
- The game tracks a persistent high score on the device: the total number of moles whacked across a full run (whether the run ends by completing level ten or by running out of strikes).
- After completing level ten, or after running out of strikes, the game shows a Round Over-style summary (matching the Cognitive Skills Games end-of-round style) with the total moles whacked and a comparison to the saved high score.
- The game board resizes responsively to the player's screen dimensions rather than using a fixed size.
- The second game is Precision drawing: the app displays a thick, semi-transparent guide shape (a randomized scribble of straight segments between random points) for the player to study, then the player must trace over it as closely as possible with a thin pencil-style cursor within a time limit.
- Precision drawing has six levels. Each level generates a newly randomized shape so no shape repeats between attempts.
- Across the six levels, the study time shrinks (from 10 seconds down to 5 seconds), the draw time shrinks (from 30 seconds down to 12 seconds), the guide line gets visually thinner, and the shapes get longer (more points), increasing the difficulty as the player progresses.
- A distinct pencil cursor is shown while the mouse is over the drawing board, and the game supports touchscreen devices: a finger tap-and-drag traces the shape using the same pointer-based interaction as the mouse.
- A prominent, color-coded badge is shown directly on the game board, next to the shape, stating which phase is active (studying or tracing) along with a live countdown, so the current phase is always clear at a glance.
- The player can clear their in-progress drawing and retry within the same attempt before confirming.
- When the player presses "Confirm drawing" (or the draw timer runs out), an algorithm scores the accuracy of the traced drawing against the guide shape by comparing how much of the guide was covered and how much of the drawn line stayed on the guide, producing an accuracy percentage.
- The player needs at least 90% accuracy to clear a level and advance; reaching 90% or higher shows a completion screen directly on the game board stating the level passed and the accuracy achieved, pausing briefly before the next level begins.
- Falling short of 90% accuracy ends the run immediately with a Round Over-style summary showing the level reached, the final accuracy, and the number of levels cleared.
- The game tracks a persistent high score on the device: the number of levels cleared in a run (out of six).
- Additional motor games, difficulty tuning, and accessibility controls beyond hammer-cursor, pencil-cursor, and touch support are to be defined.

### Speech Mode

#### Text-To-Speech Conversation Board

- The app will provide a conversation interface with a text bubble where users can type what they want to say.
- The interface will display auto-populating response options below the text area so users can answer without speaking or typing every response.
- Users will be able to change, add, and customize the suggested responses at any time.
- The conversation board will not show built-in suggested phrases between the message field and the speak control.
- Users can save a typed response as a quick response on the device.
- Saved quick responses are displayed as selectable buttons. Selecting one fills the conversation text bubble and reads the response aloud.
- Users can remove saved quick responses, and the response disappears from the list immediately.
- Instead of sending a written message, the app will read the selected or typed text aloud so the user can participate in a spoken conversation.
- The feature should support back-and-forth conversations while reducing the need for the user to speak.
- The conversation board offers ten conversation voices in a single dropdown menu: five feminine voices (Feminine One through Five) and five masculine voices (Masculine One through Five).
- A single "Test voice" button plays a short sample sentence using whichever voice is currently selected in the dropdown, so the user can preview any voice before choosing it.
- A single "Choose voice" button sets the selected dropdown voice as the active conversation board voice, saved on the device and used whenever the board speaks typed text or a saved quick response.
- When the dropdown selection matches the currently chosen voice, the button reads "Confirmed voice" instead of "Choose voice" to show the previewed voice is already active.
- The user can change the chosen voice at any time, including after a voice has already been chosen, by selecting a different voice in the dropdown and choosing it.
- The exact response suggestions, text-to-speech controls beyond voice selection, conversation flow, and customization experience are to be defined.


#### Guided Speech Lessons

- The app will provide basic speech lessons for users who want to practice producing words.
- Lessons will provide multiple word sets, with 20 words in each set, and the app will support adding more sets over time.
- Lessons will show a simple, recognizable mouth formation for every sound or mouth-movement part of the selected word at the same time.
- Selecting any word part, including parts after the first, will update the main mouth formation to match that part.
- The mouth formation legend will identify the colors as: Red - mouth; Pink - tongue; Grey - lips.
- The app will play example words aloud so users can hear the target pronunciation.
- Users can choose from five playback speeds for example words: 0.25x, 0.5x, 1x, 1.5x, 2x. Slower speeds are exaggerated (using a non-linear rate curve) so they sound meaningfully slower than 1x, rather than barely different.
- Lessons should support step-by-step practice at a pace chosen by the user.
- The exact mouth-formation visuals, lesson content, word library, progression, and feedback methods are to be defined.

#### Word Bank

- Speech Mode provides a Word bank where users add hard or unfamiliar words they are learning; words are saved on the device, duplicates are rejected, and any word can be removed.
- Tapping a saved word speaks it aloud (using the chosen conversation voice, if any) and shows its phonetic spelling and up to three definitions, looked up from the free Dictionary API (api.dictionaryapi.dev).
- The detail panel offers "Hear it" and "Hear it slowly" buttons to replay the pronunciation.
- If no definition is found or the user is offline, a plain-language message is shown and the word can still be heard.

#### Imagery

- Each mode card (About screen and mode-selection screen) has its own picture; the splash screen has no images under the "Stability" title.
- Every tool button in the feature list has an icon, and every tool page opens with a colored illustrated banner with accent pictures.
- Images are decorative (hidden from screen readers) and use emoji so no extra assets are loaded.

## Technical Considerations

### Deployment & Hosting

- The application is a static client-side web application built with HTML, CSS, and JavaScript.
- The web application is hosted using GitHub Pages directly from the `main` branch root folder (`/`).
- GitHub Pages automatically serves `index.html` as the main entry point.
- Google Analytics 4 is embedded in `index.html` with measurement ID `G-81VPL2W7ZM` and sends the standard page-view event. Analytics requests may be blocked by browser privacy settings, extensions, or network policy.

### Known Limitations: Reminder Alarms On Phones

- Because the app is a static, client-side-only site with no backend or push-notification service, reminder alarms depend on the app being open (even in a background tab) on the device; a fully closed browser tab cannot be woken up to sound an alarm.
- Browser notifications require platform support: iOS Safari does not support web notifications from a regular browser tab, and only supports them for the app when added to the Home Screen (iOS 16.4+). This is a platform restriction outside the app's control.
- The in-app alarm sound and vibration are the most reliable cross-platform fallback, and are designed to still fire (via a visibility-based catch-up check) as soon as the user reopens or returns to the app, even if the exact due-time timer was delayed or dropped while the phone was locked or the app was backgrounded.

### Known Limitations: Voice Control

- Voice control depends on the browser's built-in speech recognition (`SpeechRecognition` / `webkitSpeechRecognition`), which is not a web standard supported everywhere.
- Safari on iPhone and iPad does not support this API at all (no browser on iOS does, since they all use Apple's WebKit engine), so voice control cannot work there; the app detects this and shows a clear message instead of failing silently.
- Microphone access (and therefore voice control) only works when the app is served over `https://` or `localhost`. It will not work when `index.html` is opened directly from a local file, which the app also detects and reports.
- Chrome, Edge, and other Chromium-based browsers on desktop and Android currently have the best support.

