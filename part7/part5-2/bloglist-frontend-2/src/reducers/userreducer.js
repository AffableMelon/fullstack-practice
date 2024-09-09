import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotif } from "./notifreducer";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    password: "",
    token: null,
    name: "",
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.password = "";
      // return(state)
    },
    setUsername(state, action) {
      state.username = action.payload;
      // return(state)
    },
    setPassword(state, action) {
      state.password = action.payload;
      // return(state)
    },
    clearUser(state) {
      state.username = "";
      state.password = "";
      state.token = null;
      state.name = "";
      // return(state)
    },
  },
});

export const login = () => {
  return async (dispatch, getState) => {
    const user = getState().user;
    const username = user.username;
    const password = user.password;
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotif("Login Successful!", 3));
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(setNotif("Wrong credentials", 3));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch(clearUser());
  };
};

export const { setUser, setPassword, clearUser, setUsername } =
  userSlice.actions;
export default userSlice.reducer;
