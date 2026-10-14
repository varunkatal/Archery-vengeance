# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Archery Vengeance** is a 2D browser archery game built by a Grade 10 student learning web development. The player aims a bow on the left side of the screen and shoots arrows that fly in a gravity arc at a target on the right.

Explanations and code should suit a beginner. Write readable, well-commented code with clear names, and don't add abstractions or clever patterns.

## Decisions (confirmed by the student)

| Topic | Decision |
|---|---|
| Arrow flight | Curved arc with gravity: fixed launch speed, angle from the aim |
| Lives | 3 lives; every arrow that misses the target costs 1 life |
| Controls | Mouse: move to aim, click to shoot. Touch: drag to aim, lift finger to shoot. Use Pointer Events so one code path handles both |
| Mobile | Must be playable with touch on a phone |
| Art style | Bright cartoon: blue sky, green hills, ground, simple archer, red/white target. Everything drawn with Canvas, no image files |
| Extras | Levels + moving targets, best score (`localStorage`), sounds + mute, Pause + "How to play" screen |
| Sounds | Generated with the Web Audio API (no sound files, so no licensing issues) |
| Files | Directly in this folder (`game A/`), no subfolder |
| Hosting | GitHub Pages. The student already has Git and a GitHub account |

Defaults chosen by Claude (the student can change them):
- Target rings score 10 (bullseye), 5, and 2 (outer ring).
- Every 5 hits moves the player up a level. The target starts moving up and down at level 2 and gets faster each level after that.

## Tech constraints

- HTML5, CSS3, vanilla JavaScript, and the Canvas API only.
- No React, TypeScript, npm, build tools, backend, database, game engine, or external libraries unless the student explicitly asks.
- No external images or sounds.
- Keep HTML, CSS, and JS in their own files.

## Running and deploying

There is no build, lint, or automated test step.

- Run locally by opening `index.html` in a browser, or with `python3 -m http.server 8000` and then http://localhost:8000 (VS Code Live Server also works).
- Testing is manual in the browser, so keep the DevTools console open to catch errors. Check mobile layout with DevTools device mode, then on a real phone.
- Deploy: push to GitHub, then go to Settings → Pages → Deploy from branch `main`, folder `/ (root)`. Pushing to `main` updates the live site.

## Structure

```text
index.html   # canvas, HUD (score/lives/level/best), Start/Restart/Pause/Mute buttons, How-to-play
style.css    # responsive layout, buttons, overlays
game.js      # all game logic
README.md    # how to play, how to run, live link
```

## game.js architecture

- A single `requestAnimationFrame` loop calls `updateGame(dt)` then `drawGame()`. Use delta time so speed is the same on 60 Hz and 120 Hz screens.
- Game state is one explicit variable: `start` | `playing` | `paused` | `gameOver`. Update logic runs only in `playing`.
- Suggested plain functions: `initGame`, `startGame`, `resetGame`, `updateGame`, `drawGame`, `drawBackground`, `drawArcher`, `drawTarget`, `drawArrows`, `aimBow`, `shootArrow`, `checkCollisions`, `nextLevel`, `endGame`, `playSound`.
- Logical size: draw in a fixed coordinate space (for example 960×540) and scale the canvas to fit the window while keeping the aspect ratio. This avoids stretching and keeps collision maths simple. Convert pointer coordinates from screen space into this space.
- Arrows: each has `x, y, vx, vy`. Every frame `vy += gravity * dt` and the arrow is rotated to match its direction of travel. An arrow is removed when it hits the target or leaves the play area or hits the ground, and a miss costs 1 life.
- A hit must score exactly once. Mark the arrow as used immediately.
- Limit shooting to one arrow in flight at a time, or use a short cooldown, so rapid clicks can't break the game.
- `resetGame()` must reset score, lives, level, arrows, target position and speed, and state.
- Best score is read and written through `localStorage` inside `try/catch`, so the game still works if storage is blocked.

## Phases

Work one phase at a time. Keep the game working and deployed after each one, and wait for the student to confirm a phase works before starting the next.

**Current phase: Phase 1.**

1. **Setup + first deploy**: create `index.html`, `style.css`, `game.js` and `README.md`, with a responsive canvas that loads with no console errors. Run `git init`, push to a new GitHub repo, and turn on GitHub Pages so the live link works from day one.
2. **Static scene**: draw the sky, hills, ground, archer, bow, and target. Add the title and the Start screen.
3. **Aiming + shooting**: the bow rotates toward the pointer (mouse and touch). Shoot arrows that fly in a gravity arc, one at a time.
4. **Hits + scoring**: arrow-target collision with ring scores, removing used arrows, and moving the target to a new height after a hit.
5. **Lives + game states**: 3 lives lost on misses, the start/playing/gameOver flow, a Game Over screen, and Restart that fully resets the game.
6. **Levels + moving targets**: level up every 5 hits, with the target moving and getting faster. Show the level in the HUD.
7. **Extras**: best score in `localStorage`, Web Audio sounds (shoot, hit, miss) with a Mute button, a Pause button (plus the P key), and a How-to-play screen.
8. **Testing + final release**: run the full checklist on desktop and a phone, finish the README with the live link, and push the final version.

## Test checklist (run at the end of each relevant phase)

- No console errors on load.
- Start begins a fresh game.
- The bow follows the mouse and touch input.
- The arrow arcs in the aimed direction.
- A hit adds the correct ring score exactly once.
- Each miss removes exactly one life, and at 0 lives the game goes to Game Over.
- Restart resets everything.
- Arrows don't pile up.
- Pause freezes everything.
- Mute works.
- The best score survives a page reload.
- Resizing and rotating the phone don't stretch or break the game.
- The live GitHub Pages site matches local.

## How to work with the student

- Explain each phase in simple language.
- Inspect existing files before editing and preserve working code. When an error occurs, diagnose it before rewriting anything.
- Give the complete contents of each changed file and say which files were created or modified.
- Give exact steps to run and test the change in VS Code, plus the `git add` / `commit` / `push` commands to deploy it.
- Never claim something was tested unless it actually was.
- Ask only when an essential decision is missing. Otherwise pick a sensible beginner-friendly default and say what you chose.
- Update **Current phase** above when a phase is finished.
