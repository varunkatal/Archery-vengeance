// ===== Archery Vengeance - game.js =====
// Phase 2: draw the full scene (sky, hills, ground, archer, bow, target)
// and show a Start screen.

// --- Game size ---
// We always draw the game as if the screen were 960 x 540 (a 16:9 shape).
// Then we scale the whole picture up or down to fit the window.
// This way the archer and target never get squashed or stretched.
const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const BORDER_SIZE = 4; // the black border around the canvas (see style.css)

// The top edge of the grass. Everything stands on this line.
const GROUND_Y = 460;

// --- Page elements ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // "ctx" is the tool we draw with
const gameArea = document.getElementById("gameArea");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

// --- Game state ---
// "start"   = Start screen is showing
// "playing" = the game is running
let gameState = "start";

// How much bigger or smaller the game is shown compared to 960 x 540
let scale = 1;

// --- Game objects ---
// The archer stands on the left. (x, y) is the archer's shoulder,
// which is where the bow is held from.
const archer = {
  x: 130,
  y: 345,
  bowAngle: -0.15 // in radians. 0 = pointing right, negative = pointing up a bit
};

// The target on the right. The ring sizes are used for scoring in Phase 4.
const target = {
  x: 820,
  y: 300,
  outerRadius: 60, // red ring   (2 points)
  middleRadius: 40, // white ring (5 points)
  innerRadius: 20 // gold bullseye (10 points)
};

// =====================================================================
// Screen size
// =====================================================================

// Resize the canvas to fit the screen while keeping the 16:9 shape.
function resizeCanvas() {
  // Space we are allowed to use (minus the border on both sides)
  const availableWidth = gameArea.clientWidth - BORDER_SIZE * 2;
  const spaceAbove = gameArea.getBoundingClientRect().top + window.scrollY;
  const availableHeight = Math.max(200, window.innerHeight - spaceAbove - 16 - BORDER_SIZE * 2);

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

// =====================================================================
// Drawing the scene
// =====================================================================

function drawBackground() {
  // Sky: a gradient from deep blue at the top to pale blue near the ground
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, "#4fa3e0");
  sky.addColorStop(1, "#bfe6ff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, GAME_WIDTH, GROUND_Y);

  // Sun
  ctx.fillStyle = "#ffe066";
  ctx.beginPath();
  ctx.arc(560, 90, 40, 0, Math.PI * 2);
  ctx.fill();

  // Clouds (each cloud is a few white circles squashed together)
  drawCloud(200, 90);
  drawCloud(430, 150);
  drawCloud(760, 70);

  // Far hills (lighter green). An ellipse is a stretched circle;
  // we put its centre below the ground so only the top hump shows.
  ctx.fillStyle = "#8fd27a";
  drawHill(150, GROUND_Y + 40, 260, 150);
  drawHill(600, GROUND_Y + 40, 320, 130);

  // Near hills (darker green)
  ctx.fillStyle = "#5cb85c";
  drawHill(380, GROUND_Y + 30, 280, 100);
  drawHill(900, GROUND_Y + 30, 260, 120);

  // A few trees on the hills
  drawTree(330, GROUND_Y - 55);
  drawTree(470, GROUND_Y - 45);
  drawTree(640, GROUND_Y - 40);

  // Ground: grass on top, brown dirt underneath
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(0, GROUND_Y, GAME_WIDTH, 20);
  ctx.fillStyle = "#8d5a32";
  ctx.fillRect(0, GROUND_Y + 20, GAME_WIDTH, GAME_HEIGHT - GROUND_Y - 20);
}

function drawCloud(x, y) {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.arc(x + 25, y - 12, 28, 0, Math.PI * 2);
  ctx.arc(x + 55, y, 22, 0, Math.PI * 2);
  ctx.fill();
}

function drawHill(x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
  ctx.fill();
}

// (x, y) is the bottom of the trunk
function drawTree(x, y) {
  // Trunk
  ctx.fillStyle = "#7a4a26";
  ctx.fillRect(x - 5, y - 30, 10, 30);
  // Leaves
  ctx.fillStyle = "#2e7d32";
  ctx.beginPath();
  ctx.arc(x, y - 42, 20, 0, Math.PI * 2);
  ctx.fill();
}

function drawArcher() {
  const x = archer.x;
  const y = archer.y; // shoulder height
  const hipY = y + 55;

  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 6;
  ctx.lineCap = "round"; // rounded line ends look friendlier

  // Quiver (arrow holder) on the archer's back
  ctx.fillStyle = "#8d5a32";
  ctx.fillRect(x - 22, y - 10, 12, 45);
  // Feathers of the arrows sticking out of the quiver
  ctx.fillStyle = "#e63946";
  ctx.fillRect(x - 22, y - 20, 4, 12);
  ctx.fillRect(x - 15, y - 22, 4, 14);

  // Legs (from the hip down to the ground)
  ctx.beginPath();
  ctx.moveTo(x, hipY);
  ctx.lineTo(x - 20, GROUND_Y);
  ctx.moveTo(x, hipY);
  ctx.lineTo(x + 20, GROUND_Y);
  ctx.stroke();

  // Body: a green tunic shaped like a triangle
  ctx.fillStyle = "#2e8b57";
  ctx.beginPath();
  ctx.moveTo(x, y - 8);
  ctx.lineTo(x - 18, hipY + 5);
  ctx.lineTo(x + 18, hipY + 5);
  ctx.closePath();
  ctx.fill();

  // Head
  ctx.fillStyle = "#f2c79b";
  ctx.beginPath();
  ctx.arc(x, y - 25, 16, 0, Math.PI * 2);
  ctx.fill();

  // Eye (looking toward the target)
  ctx.fillStyle = "#333333";
  ctx.beginPath();
  ctx.arc(x + 7, y - 28, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Pointy green hat with a red feather
  ctx.fillStyle = "#1f6f43";
  ctx.beginPath();
  ctx.moveTo(x - 18, y - 32);
  ctx.lineTo(x + 18, y - 32);
  ctx.lineTo(x - 12, y - 58);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#e63946";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 4, y - 36);
  ctx.lineTo(x - 22, y - 52);
  ctx.stroke();

  drawBow();
}

// The bow and both arms are drawn rotated to match archer.bowAngle.
// In Phase 3, bowAngle will follow the mouse.
function drawBow() {
  ctx.save(); // remember the current drawing settings
  ctx.translate(archer.x, archer.y); // move the "pen" to the shoulder
  ctx.rotate(archer.bowAngle); // turn so that "right" means "where we aim"

  // From here on, the x-axis points in the aim direction.
  const bowRadius = 50;
  const bowCurve = 1.0; // how far the bow bends around (in radians)
  const stringX = 10 + Math.cos(bowCurve) * bowRadius; // where the string sits
  const stringEnd = Math.sin(bowCurve) * bowRadius; // half the string length

  // Bow string (thin, light grey)
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(stringX, -stringEnd);
  ctx.lineTo(stringX, stringEnd);
  ctx.stroke();

  // Bow (a thick brown curve)
  ctx.strokeStyle = "#8d5a32";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(10, 0, bowRadius, -bowCurve, bowCurve);
  ctx.stroke();

  // Front arm: shoulder to the middle of the bow (the grip)
  ctx.strokeStyle = "#f2c79b";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(10 + bowRadius, 0);
  ctx.stroke();

  // Back arm: bent elbow, hand holding the string
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(18, -12);
  ctx.lineTo(stringX, 0);
  ctx.stroke();

  ctx.restore(); // undo the move and rotate so other drawings aren't affected
}

function drawTarget() {
  const x = target.x;
  const y = target.y;

  // Wooden stand (two legs)
  ctx.strokeStyle = "#7a4a26";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 25, y + 40);
  ctx.lineTo(x - 40, GROUND_Y);
  ctx.moveTo(x + 25, y + 40);
  ctx.lineTo(x + 40, GROUND_Y);
  ctx.stroke();

  // Rings, drawn from biggest to smallest so the small ones sit on top
  drawRing(x, y, target.outerRadius, "#e63946"); // red
  drawRing(x, y, target.middleRadius, "#ffffff"); // white
  drawRing(x, y, target.innerRadius, "#ffd166"); // gold bullseye
}

function drawRing(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

// Draw one whole frame of the game
function drawGame() {
  drawBackground();
  drawTarget();
  drawArcher();

  // Temporary message after pressing Start (shooting arrives in Phase 3)
  if (gameState === "playing") {
    ctx.fillStyle = "#1e3a5f";
    ctx.font = "bold 24px 'Trebuchet MS', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Shooting comes in Phase 3!", GAME_WIDTH / 2, 40);
  }
}

// =====================================================================
// Game flow
// =====================================================================

function startGame() {
  gameState = "playing";
  startScreen.classList.add("hidden"); // hide the Start screen
}

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
  startButton.addEventListener("click", startGame);
  requestAnimationFrame(gameLoop);
}

initGame();
