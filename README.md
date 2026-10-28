# Animal Party (refreshed)

A local browser party game based on the original Animal Party project.

## Run with XAMPP

1. Copy the `AnimalParty` folder into `C:\\xampp\\htdocs`.
2. Start Apache in XAMPP.
3. Open `http://localhost/AnimalParty/`.

## Minigame library

The active games are Monkey Bash, Sky Jump, Card Match, Memory Mix, Rock Paper Scissors, Red Light Green Light, Find The Strawberry, Speed Sprint, Math Quiz, and Sheep Census. Cooking Party and Number Organizer are not included.

## Project notes

- Read `CODE_MEMORY.md` before continuing development.
- `party-theme.css` contains shared visual styling for the intro, lobby, library, and minigames.
- The minigame library uses `home-park-bg.png`; it is a castle garden scene with no character art.
- Card Match and Memory Mix each have two rounds. Returning to the library after a launched minigame adds 10 coins.
- Background music restores its playback position as the game moves between pages.
- Random Match filters and ban controls are preserved.
- This refresh is a separate copy; it does not overwrite the original XAMPP project.
