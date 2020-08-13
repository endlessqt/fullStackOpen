import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return state.concat(
        action.data.map((blog) => {
          return { ...blog, visibility: false };
        })
      );
    case "ADD_BLOG":
      return [...state, action.blog];
    case "DELETE_BLOG": {
      const id = action.id;
      return state.filter((blog) => blog.id !== id);
    }
    case "LIKE_BLOG": {
      const id = action.id;
      const updatedBlog = action.blog;
      const newState = state.map((blog) =>
        blog.id === id
          ? { ...updatedBlog, user: blog.user, visibility: true }
          : blog
      );
      return newState;
    }
    case "TOGGLE_VISIBILITY": {
      const id = action.id;
      const blogToChange = state.find((blog) => blog.id === id);
      const changedBlog = {
        ...blogToChange,
        visibility: !blogToChange.visibility,
      };
      const newState = state.map((blog) => {
        return blog.id === id ? changedBlog : blog;
      });
      return newState;
    }
    default:
      return state;
  }
};

export const toggleVisibility = (id) => {
  return {
    type: "TOGGLE_VISIBILITY",
    id,
  };
};
export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({
        type: "ADD_BLOG",
        blog: newBlog,
      });
      dispatch(
        showNotification(
          `New blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      );
    } catch (error) {
      dispatch(showNotification(`${error.response.data.error}`, 5));
    }
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.del(id);
      dispatch({
        type: "DELETE_BLOG",
        id,
      });
      dispatch(showNotification(`Successful deletion`, 3));
    } catch (error) {
      dispatch({
        type: "DELETE_BLOG",
        id,
      });
      dispatch(showNotification(`Blog already deleted`, 5));
    }
  };
};
export const likeBlog = (id, blogObj) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, blogObj);
      dispatch({
        type: "LIKE_BLOG",
        id,
        blog: updatedBlog,
      });
    } catch (error) {
      dispatch({
        type: "DELETE_BLOG",
        id,
      });
      dispatch(showNotification(`Blog was deleted`, 5));
    }
  };
};

export default reducer;
