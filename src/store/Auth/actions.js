export async function signOut({ commit }) {
  this._vm.$axios
    .post("/api/sign_out")
    .then(() => {
      commit("setName", "");
      commit("setSignIn", false);
    })
    .catch(e => {
      console.error(e);
    });
}

export async function checkSignIn(context) {
  if (!context.getters["getSignIn"]) {
    // call server
    try {
      const response = await this._vm.$axios.get("/api/get_user");
      context.commit("setName", response.data.name);
      context.commit("setSignIn", true);
      return true;
    } catch {
      context.commit("setName", null);
      context.commit("setSignIn", false);
      return false;
    }
  } else {
    return true;
  }
}
