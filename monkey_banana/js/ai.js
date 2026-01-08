function solveWithAI() {
  const steps = [
    goToRightOfBox,
    pushBoxToBanana,
    climbBox,
    grabBanana
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      steps[i++]();
    } else {
      clearInterval(interval);
    }
  }, 800);
}

/* AI steps */

function goToRightOfBox() {
  state.monkeyX = state.boxX + SIZE;
  render();
}

function pushBoxToBanana() {
  while (state.boxX > state.bananaX) {
    state.boxX -= STEP;
  }
  state.monkeyX = state.boxX + SIZE;
  render();
}
function grabBanana() {
  if (
    state.monkeyPos === "onBox" &&
    Math.abs(state.boxX - state.bananaX) <= SIZE
  ) {
    state.hasBanana = true;
    render();
    setStatus("🤖 AI solved the problem! Restarting...");
    refreshGame();
  }
}
