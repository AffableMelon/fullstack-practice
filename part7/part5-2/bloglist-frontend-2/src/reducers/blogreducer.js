import { createSlice, current } from "@reduxjs/toolkit";
// import blogs from "../services/blogs"
import blogService from "../services/blogs";
import { setNotif } from "./notifreducer";
// import { initializeAnec } from "../../../../part6/redux-anecdotes/src/reducers/anecdoteReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    AddBlog(state, action) {
      const blogExists = state.some((blog) => blog.id === action.payload.id);
      if (!blogExists) {
        state.push(action.payload);
      }
    },
    voteBlog(state, action) {
      console.log(action);
      const updated = action.payload;
      return state.map((blog) => {
        return blog.id === updated.id ? updated : blog;
      });
    },
    remove(state, action) {
      console.log(action);
      const id = action.payload;
      return state.filter((blog) => {
        return blog.id !== id;
      });
    },
  },
});

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("Blogs from server:", blogs);
    blogs.sort((a, b) => b.likes - a.likes);
    blogs.forEach((blog) => {
      dispatch(AddBlog(blog));
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const resp = await blogService.create(blog);
    console.log(resp);
    dispatch(AddBlog({ ...resp, user: blog.user }));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const resp = await blogService.remove(id);
    dispatch(remove(id));
    dispatch(setNotif("succsesfully deleted"), 3);
  };
};

export const vote = (blog) => {
  return async (dispatch) => {
    const resp = await blogService.update(
      { ...blog, likes: blog.likes + 1 },
      blog.id
    );
    console.log(resp);
    dispatch(voteBlog({ ...resp, user: blog.user }));
    dispatch(setNotif(`youve voted for ${resp.title}`, 3));
  };
};

export const { AddBlog, voteBlog, remove } = blogSlice.actions;
export default blogSlice.reducer;
