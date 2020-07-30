export function setComps(state, comps) {
  state.comps = comps;
}

export function setCurrentComp(state, currentComp) {
  state.currentComp = currentComp;
}

export function orderComps(state) {
  state.comps.sort(function(a, b) {
    if (!a.hasOwnProperty("compOrder") || !b.hasOwnProperty("compOrder")) {
      return 0;
    } else {
      return a.compOrder - b.compOrder;
    }
  });
}
