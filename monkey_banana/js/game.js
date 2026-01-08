/* ======================
   RESPONSIVE HELPERS
====================== */

function getGameWidth() {
  return document.getElementById("game-area").offsetWidth;
}

function getStep() {
  return Math.max(getGameWidth() * 0.06, 15);
}

function getSize() {
  return Math.max(getGameWidth() * 0.22, 60);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/* ======================
   GLOBALS
====================== */

let STEP = getStep();
let SIZE = getSize();

/* ======================
   RENDER
====================== */

function render() {
  const monkey = document.getElementById("monkey");
  const box = document.getElementById("box");
  const banana = document.getElementById("banana");

  monkey.style.left = state.monkeyX + "px";
  box.style.left = state.boxX + "px";
  banana.style.left = state.bananaX + "px";

  if (state.hasBanana) {
    banana.style.display = "none";
  }
}

/* ======================
   STATUS
====================== */

function setStatus(text) {
  document.getElementById("status").innerText = text;
}

/* ======================
   REFRESH GAME
====================== */

function refreshGame(delay = 2000) {
  setTimeout(() => location.reload(), delay);
}

/* ======================
   MOVEMENT
====================== */

function moveMonkey(direction) {
  if (direction === "right") state.monkeyX += STEP;
  else state.monkeyX -= STEP;

  state.monkeyX = clamp(
    state.monkeyX,
    0,
    getGameWidth() - SIZE
  );

  setStatus("🐒 Monkey is moving...");
  render();
}

/* ======================
   PUSH BOX
====================== */

function pushBox() {
  const dist = state.monkeyX - state.boxX;

  if (dist > 0 && dist <= SIZE) {
    state.boxX -= STEP;
    state.monkeyX -= STEP;
    setStatus("📦 Pushed box left");
  }
  else if (dist < 0 && Math.abs(dist) <= SIZE) {
    state.boxX += STEP;
    state.monkeyX += STEP;
    setStatus("📦 Pushed box right");
  }
  else {
    setStatus("❌ Stand beside the box!");
  }

  state.boxX = clamp(state.boxX, 0, getGameWidth() - SIZE);
  state.monkeyX = clamp(state.monkeyX, 0, getGameWidth() - SIZE);

  render();
}

/* ======================
   CLIMB BOX
====================== */

function climbBox() {
  if (Math.abs(state.monkeyX - state.boxX) <= SIZE) {
    state.monkeyPos = "onBox";
    document.getElementById("monkey").style.bottom = SIZE + "px";
    setStatus("🧗 Monkey climbed the box");
  } else {
    setStatus("❌ Too far to climb");
  }
}

/* ======================
   GRAB BANANA
====================== */

function grabBanana() {
  if (
    state.monkeyPos === "onBox" &&
    Math.abs(state.boxX - state.bananaX) <= SIZE
  ) {
    state.hasBanana = true;
    render();
    setStatus("🎉 Banana grabbed! Restarting...");
    refreshGame();
  } else {
    setStatus("❌ Banana is too far");
  }
}

/* ======================
   RESPONSIVE UPDATE
====================== */

window.addEventListener("resize", () => {
  STEP = getStep();
  SIZE = getSize();

  state.monkeyX = clamp(state.monkeyX, 0, getGameWidth() - SIZE);
  state.boxX = clamp(state.boxX, 0, getGameWidth() - SIZE);

  render();
});

/* ======================
   INITIAL RENDER
====================== */

render();
