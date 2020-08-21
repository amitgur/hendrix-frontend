export async function signOut({ commit }) {
  this._vm.$axios
    .post("/apiV1/sign_out")
    .then(() => {
      commit("setName", "");
      commit("setSignIn", false);
      commit("setProfile", null);
    })
    .catch(e => {
      console.error(e);
    });
}

export async function checkSignIn(context) {
  if (!context.getters["getSignIn"]) {
    // call server
    try {
      const response = await this._vm.$axios.get("/apiV1/get_user");
      context.commit("setName", response.data.name);
      context.commit("setSignIn", true);
      context.commit("setProfile", response.data.profile);
      return true;
    } catch {
      context.commit("setName", null);
      context.commit("setSignIn", false);
      context.commit("setProfile", null);
      return false;
    }
  } else {
    return true;
  }
}
