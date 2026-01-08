const STEP = 20;
const SIZE = 70;

/* Render positions */
function render() {
  document.getElementById("monkey").style.left = state.monkeyX + "px";
  document.getElementById("box").style.left = state.boxX + "px";
  document.getElementById("banana").style.left = state.bananaX + "px";

  if (state.hasBanana) {
    document.getElementById("banana").style.display = "none";
  }
}

render();

/* Status text */
function setStatus(text) {
  document.getElementById("status").innerText = text;
}

/* Auto refresh after success */
function refreshGame(delay = 2000) {
  setTimeout(() => {
    location.reload();
  }, delay);
}

/* Move monkey */
function moveMonkey(direction) {
  if (direction === "right") state.monkeyX += STEP;
  else state.monkeyX -= STEP;

  setStatus("🐒 Monkey is moving...");
  render();
}

/* Push box (left or right) */
function pushBox() {
  const distance = state.monkeyX - state.boxX;

  if (distance > 0 && distance <= SIZE) {
    state.boxX -= STEP;
    state.monkeyX -= STEP;
    setStatus("📦 Monkey pushed box left");
  }
  else if (distance < 0 && Math.abs(distance) <= SIZE) {
    state.boxX += STEP;
    state.monkeyX += STEP;
    setStatus("📦 Monkey pushed box right");
  }
  else {
    setStatus("❌ Monkey must stand beside the box!");
  }

  render();
}

/* Climb box */
function climbBox() {
  if (Math.abs(state.monkeyX - state.boxX) <= SIZE) {
    state.monkeyPos = "onBox";
    document.getElementById("monkey").style.bottom = SIZE + "px";
    setStatus("🧗 Monkey climbed the box");
    render();
  } else {
    setStatus("❌ Monkey must be near the box to climb!");
  }
}

/* Grab banana (FINAL GOAL) */
function grabBanana() {
  if (
    state.monkeyPos === "onBox" &&
    Math.abs(state.boxX - state.bananaX) <= SIZE
  ) {
    state.hasBanana = true;
    render();

    setStatus("🎉 Monkey got the banana! Restarting...");
    refreshGame(); // 🔁 AUTO REFRESH
  } else {
    setStatus("❌ Banana is too far!");
  }
}
