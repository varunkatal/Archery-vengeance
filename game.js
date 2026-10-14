// ===== Archery Vengeance - game.js =====
// Phase 1: a canvas that fits any screen without stretching.

// --- Game size ---
// We always draw the game as if the screen were 960 x 540 (a 16:9 shape).
// Then we scale the whole picture up or down to fit the window.
// This way the archer and target never get squashed or stretched.
const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

// --- Canvas setup ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // "ctx" is the tool we draw with
const gameContainer = document.getElementById("gameContainer");

// How much bigger or smaller the game is shown compared to 960 x 540
let scale = 1;

// Resize the canvas to fit the screen while keeping the 16:9 shape.
function resizeCanvas() {
  // Space we are allowed to use
  const availableWidth = gameContainer.clientWidth;
  const spaceAbove = gameContainer.getBoundingClientRect().top + window.scrollY;
  const availableHeight = Math.max(200, window.innerHeight - spaceAbove - 16);

  // Pick the smaller scale so the game fits both across and down
  scale = Math.min(availableWidth / GAME_WIDTH, availableHeight / GAME_HEIGHT);

  // The size the canvas appears on the page
  const displayWidth = Math.floor(GAME_WIDTH * scale);
  const displayHeight = Math.floor(GAME_HEIGHT * scale);
  canvas.style.width = displayWidth + "px";
  canvas.style.height = displayHeight + "px";

  // Phones and some laptops have extra-sharp screens (pixelRatio of 2 or 3).
  // Giving the canvas more real pixels keeps the drawing crisp instead of blurry.
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(displayWidth * pixelRatio);
  canvas.height = Math.floor(displayHeight * pixelRatio);

  // After this line, drawing at (960, 540) always means the bottom-right corner,
  // no matter how big the canvas really is.
  ctx.setTransform(scale * pixelRatio, 0, 0, scale * pixelRatio, 0, 0);
}

// --- Drawing ---
// For now we just draw a sky and a message to prove the canvas works.
// Phase 2 will replace this with the real scene (hills, ground, archer, target).
function drawGame() {
  // Sky
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Message in the middle
  ctx.fillStyle = "#1e3a5f";
  ctx.font = "bold 40px 'Trebuchet MS', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Canvas ready!", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);

  ctx.font = "20px 'Trebuchet MS', Arial, sans-serif";
  ctx.fillText("Resize the window - this box keeps its shape.", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 25);

  // Small squares in the corners. If you can see all four,
  // the scaling is working and nothing is cut off.
  ctx.fillStyle = "#e63946";
  const size = 20;
  ctx.fillRect(0, 0, size, size);
  ctx.fillRect(GAME_WIDTH - size, 0, size, size);
  ctx.fillRect(0, GAME_HEIGHT - size, size, size);
  ctx.fillRect(GAME_WIDTH - size, GAME_HEIGHT - size, size, size);
}

// --- Game loop ---
// requestAnimationFrame asks the browser to call gameLoop again before the
// next screen refresh (about 60 times every second).
function gameLoop() {
  drawGame();
  requestAnimationFrame(gameLoop);
}

// --- Start everything ---
function initGame() {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas); // refit when the window changes size
  requestAnimationFrame(gameLoop);
}

initGame();
