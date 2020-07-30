// get comp by link string
export function getAllComps(state) {
  return state.comps;
}

export function getComp(state) {
  return compId => {
    for (let comp of state.comps) {
      console.log(comp.comp_id, compId);
      if (comp.comp_id === compId) {
        return comp;
      }
    }
    return null;
  };
}

export function getCurrentComp(state) {
  return state.currentComp;
}
