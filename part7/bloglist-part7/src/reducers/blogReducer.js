import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      const blogs = state.concat(
        action.data.map((blog) => {
          return { ...blog, visibility: false };
        })
      );
      return blogs;
    case "ADD_BLOG":
      return [...state, action.blog];
    case "TOGGLE_VISIBILITY":
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
    return dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "ADD_BLOG",
      blog: newBlog,
    });
  };
};

export default reducer;
