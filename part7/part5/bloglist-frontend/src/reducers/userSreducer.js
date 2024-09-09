import { createSlice } from "@reduxjs/toolkit";
import userServices from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser(state, action) {
      const userExists = state.some((user) => user.id === action.payload.id);
      if (!userExists) {
        state.push(action.payload);
      }
    },
  },
});

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAll();
    console.log("users from server", users);
    users.forEach((user) => {
      dispatch(addUser(user));
    });
  };
};

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
