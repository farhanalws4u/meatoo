import * as api from "../api/index.js";

export const signUp = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", data });

    navigation.navigate("gettingStarted");
  } catch (e) {
    console.log(e);
  }
};
