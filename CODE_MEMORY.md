# AnimalParty code memory

## Source of truth

This refresh is based on the original files from `C:\xampp\htdocs\AnimalParty`. The original XAMPP folder was read only and was not modified. Keep this directory as the reference when making future updates.

## Run locally

Copy the `AnimalParty` folder into XAMPP `htdocs`, start Apache, and open `http://localhost/AnimalParty/`.

## Main flow

- `index.html` + `script.js`: intro, guest/player choice, loading, character selection.
- `auth.js`, `firebase-login.js`, `firebase-config.js`, `firebase.js`, and `save.js`: account sign-in and saved progress.
- `lobby.html` + `lobby.js` + `lobby.css`: player lobby, mode selection, settings, and profile features.
- `home.html` + `home.js` + `home.css`: minigame library, random match, filters/ban controls, and minigame launch flow.
- `audio.js` + `animal-party-theme-v2.mp3`: shared music and audio settings.

## Minigames

The active library has 11 minigames: `cardmatch`, `colourstack`, `mathquiz`, `memorygame`, `minigame`, `racegame`, `redlight`, `rpsgame`, `sheepcount`, `skyjump`, and `strawberry`. Cooking Party (`cookinggame`) and Number Organizer (`numbergame`) were removed from this refreshed package. Sheep Census is rated Impossible and runs for three rounds. Colour Stack is an Easy timed sorting game with a 60-second timer and a progress bar based on grouped block runs. A three-second 3–2–1 countdown precedes the timer; fixed-height blocks leave visible empty slots in short stacks, and each move has a landing animation. The screen pulses red when 10 seconds remain. Blocks may move to any stack with room; matching colors are not required for a move. A win is recognized once every nonempty stack contains one color and all four colors are represented. Winning increments the same `playerStars` progression used by other minigames. Its instruction and loss dialogs follow the shared minigame style. Two disabled future slots remain in the All filter.

`party-theme.css` is the shared visual layer. It aligns the intro, library, lobby, and minigame pages with crisp controls and shared action buttons. The transparent intro/loading wrappers no longer cast faint box shadows, lobby dialogs use a centered viewport overlay, and the lobby-to-library loader uses the same blue gradient as the intro loader. The minigame library background uses `home-park-bg.png`, a generated castle garden park background. Keep each minigame's own mechanics and layout in its existing files; use this shared stylesheet for cross-page styling.

The initial mode-to-character loading animation runs for about two seconds. The `PLAY AS …` character-screen button must retain its `translateX(-50%)` positioning during hover and press so it cannot jump off-center. The first intro screen no longer shows the WELCOME TO pill.

Card Match and Memory Mix each have two rounds. Completing a game launched from the library adds 10 coins when the player returns to the library. `audio.js` saves and restores the music position across the game's page navigation.

## World mode

`world-select.html/js/css` and `world-loading.html/css` are the original world-mode flow. `skyjump.html/js/css` is also included as a minigame. Mario and Luigi image assets are present in the source package.

## Important notes for future edits

- Preserve the original gameplay flow and existing Random Match ban/filter behavior unless the user explicitly requests a change.
- The minigame ban controls are intentional and remain available in the home library.
- Check all HTML links, script tags, and CSS references after edits. The delivered source listing did not contain `index.js`, although some original HTML pages refer to it; verify whether that file exists in the user's current source before relying on it.
- `image/` and `audio/` hold project assets; keep asset paths relative so the site works under XAMPP and GitHub Pages.
- Keep `firebase-config.js` aligned with the user's Firebase project if changing sign-in or save behavior.
