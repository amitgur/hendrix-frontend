export async function getAllComps(context) {
  // call server
  if (!context.state.comps.length) {
    try {
      const response = await this._vm.$axios.get("https://api.shiru.me/comps");
      context.commit("setComps", response.data);
    } catch {
      return false;
    }
  } else {
    return true;
  }
}
