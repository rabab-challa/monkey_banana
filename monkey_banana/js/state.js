function createInitialState() {
  return {
    monkeyX: 0,        // left side
    boxX: 320,         // right corner
    bananaX: 160,      // center (far from box)
    monkeyPos: "floor",
    hasBanana: false
  };
}

let state = createInitialState();
