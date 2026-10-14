# Archery Vengeance — Claude Code Project Instructions

## 1. Project Overview

Build **Archery Vengeance**, a simple, fun 2D browser archery game suitable for a Grade 10 student learning web development.

The game must run in a modern browser and be developed locally in Visual Studio Code. Keep the code beginner-friendly, well-commented, and easy to understand.

## 2. Technology Requirements

Use only:
- HTML5 for the page structure
- CSS3 for styling and responsive layout
- Vanilla JavaScript for game logic
- HTML Canvas API for drawing and animation

Do **not** use React, TypeScript, Node.js, a database, a backend, a build tool, or a paid game engine for the first version. The game should work by opening `index.html` in a browser. A local development server may be used if helpful.

## 3. Core Game Concept

The player controls an archer on the left side of the screen and shoots arrows at targets on the right.

### First playable version must include
1. A start screen with the title **Archery Vengeance** and a Start button.
2. A game canvas with a simple background, ground, archer, bow, and target.
3. Mouse-based aiming.
4. Click-to-shoot arrow controls.
5. Visible arrow movement and basic arrow-target collision detection.
6. Score display.
7. Three lives or misses allowed.
8. A game-over screen and Restart button.
9. Increasing difficulty, such as targets moving faster or appearing at different positions.
10. A layout that works on desktop and is usable on mobile.

### Nice-to-have features — only after the core game works
- Sound effects with a mute toggle
- Multiple levels
- Moving targets
- A simple power-up or different arrow type
- Best score saved using `localStorage`
- Touch aiming and shooting
- Pause button and instructions screen

Do not build optional features before the core game is playable.

## 4. Folder and File Structure

Create this structure:

```text
Archery-Vengeance/
├── index.html
├── style.css
├── game.js
├── README.md
└── assets/
    ├── images/
    └── sounds/
```

Keep the first version playable even if the `assets` folders are empty. Use Canvas-drawn shapes as placeholders so the project does not depend on missing image files.

## 5. Gameplay and Controls

- Move the mouse to aim the bow toward the cursor.
- Click or tap the game area to shoot.
- Show the arrow travelling in the direction aimed.
- Use a simple, understandable trajectory; realistic physics can be added later.
- Award points when an arrow hits the target.
- Remove arrows after a hit or when they leave the play area.
- Update the score and lives clearly.
- When the player runs out of lives, stop active gameplay and show Game Over.
- Restart must reset the score, lives, arrows, targets, and game state correctly.
- Prevent rapid repeated clicks from creating broken or unlimited game states.

## 6. Code Quality Rules

- Write readable code suitable for a beginner.
- Use clear variable and function names.
- Add comments explaining important logic.
- Avoid unnecessary abstractions and overly complicated patterns.
- Keep HTML, CSS, and JavaScript in their respective files.
- Use `requestAnimationFrame` for the game loop.
- Keep game state explicit, for example: `start`, `playing`, and `gameOver`.
- Handle canvas resizing without stretching gameplay objects incorrectly.
- Avoid console errors and broken buttons.
- Do not add external libraries unless explicitly requested.
- Do not use external images or sounds without checking that they are accessible and appropriately licensed.
- Never expose secrets, API keys, or personal information; this game should not need any secrets.

## 7. Suggested JavaScript Components

Organize `game.js` into simple functions such as:
- `initGame()`
- `startGame()`
- `resetGame()`
- `updateGame()`
- `drawGame()`
- `drawArcher()`
- `drawTarget()`
- `drawArrows()`
- `aimBow()`
- `shootArrow()`
- `checkCollisions()`
- `endGame()`

These are suggestions, not a requirement to create a complex architecture. Keep the implementation straightforward.

## 8. Visual Direction

Use a polished but simple 2D cartoon style:
- Sky and distant hills or trees in the background
- Ground along the bottom
- A clearly visible archer and bow on the left
- A target with a contrasting bullseye on the right
- Large, readable score and lives indicators
- A clear Start, Restart, and optional Pause button
- Consistent colors, spacing, and typography

Prioritize smooth gameplay and readability over complex graphics.

## 9. Development Roadmap

Build in this order:

### Milestone 1 — Project Setup
- Create the four main files and folders.
- Add the HTML page and a responsive canvas.
- Confirm the page loads without errors.

### Milestone 2 — Static Scene
- Draw the background, ground, archer, bow, and target.
- Add the game title and instructions.

### Milestone 3 — Aiming and Shooting
- Calculate the angle between the archer and the mouse pointer.
- Rotate the bow toward the pointer.
- Shoot arrows and animate them across the canvas.

### Milestone 4 — Collisions and Scoring
- Detect arrow-target hits.
- Increase the score on a hit.
- Remove used arrows and reset or reposition the target.

### Milestone 5 — Lives and Game States
- Add lives or misses.
- Implement start, playing, and game-over states.
- Make Restart reset everything.

### Milestone 6 — Difficulty and Polish
- Gradually increase target speed or movement.
- Improve visual feedback and animations.
- Add sound and mute controls only if the core game is stable.

### Milestone 7 — Testing and Publishing
- Test aiming, shooting, collisions, scoring, lives, and restart.
- Test different browser-window sizes.
- Check keyboard and touch accessibility where practical.
- Write a README with instructions to run the game.
- Prepare for free static hosting, such as GitHub Pages, when requested.

## 10. Testing Checklist

Before declaring the game complete, verify:
- The game loads with no console errors.
- Start begins a fresh game.
- The bow follows the mouse aim.
- Clicking shoots an arrow in the expected direction.
- Hits increase the score exactly once.
- Misses and lives behave consistently.
- Game Over stops active gameplay.
- Restart resets all relevant state.
- Targets and arrows do not accumulate endlessly.
- Resizing the window does not break the game.
- The game remains playable without optional assets.

## 11. How Claude Should Work

- Work one milestone at a time.
- Explain each milestone in simple language appropriate for a Grade 10 student.
- Before editing files, inspect the existing project and preserve working code where possible.
- When implementing a milestone, provide complete contents for the files that need to change.
- Clearly state which files were created or modified.
- Give exact steps to run and test the result in VS Code.
- If an error occurs, diagnose it before rewriting the whole project.
- Do not claim something has been tested unless it actually has been tested.
- Ask a question only if an essential decision is missing; otherwise choose a sensible beginner-friendly default.
- Keep the game functional after each milestone.

## 12. First Task

Start with **Milestone 1 and Milestone 2 only**.

Create `index.html`, `style.css`, and `game.js` with a responsive Canvas-based game screen that draws a simple background, ground, archer, bow, and target. Include a title and brief controls/instructions area. Do not implement shooting or scoring yet.

After providing the code, explain how to open and test the project in VS Code. Wait for the student to confirm it works before moving to the next milestone.
