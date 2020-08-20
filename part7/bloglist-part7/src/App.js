import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import ToggableDiv from "./components/ToggableDiv";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from "react-redux";
import { initBlogs, addBlog } from "./reducers/blogReducer";
import { userLogout, userLogin, setUser } from "./reducers/userReducer";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import {
  Flex,
  Heading,
  FormControl,
  Input,
  FormLabel,
  Stack,
  Button,
} from "@chakra-ui/core";
import { fetchAllUsers } from "./reducers/allUsersReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //blogs fetch
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );
  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  const addNewBlog = (blogObject) => {
    blogFormRef.current.handleVisibility();
    blogService.setToken(user.token);
    dispatch(addBlog(blogObject));
  };
  //blogs

  //user
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(userLogin({ username, password }));
    setUsername("");
    setPassword("");
  };
  const handleLogout = () => {
    dispatch(userLogout());
  };
  //user

  const blogFormRef = useRef();
  if (user === null) {
    return (
      <Container>
        <Notification />
        <Flex
          direction="column"
          justify="center"
          align="center"
          w="100%"
          h="100vh">
          <Heading as="h2" pb={24} fontSize={["2xl", "3xl", "4xl", "5xl"]}>
            Log In Blog App
          </Heading>

          <form onSubmit={handleLogin} id="logInForm">
            <Stack spacing={8} maxW={["2xs", "sm", "sm", "sm"]}>
              <FormControl isRequired w="sm">
                <FormLabel htmlFor="username" fontSize={"xl"}>
                  Username
                </FormLabel>
                <Input
                  variant="flushed"
                  size="lg"
                  id="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </FormControl>
              <FormControl isRequired w="sm">
                <FormLabel htmlFor="password" fontSize={"xl"}>
                  Password
                </FormLabel>
                <Input
                  variant="flushed"
                  size="lg"
                  id="password"
                  type="text"
                  name="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </FormControl>
            </Stack>
            <Flex justify="center" pt={4}>
              <Button
                mt={5}
                size="lg"
                type="submit"
                variant="outline"
                variantColor="green">
                Log In
              </Button>
            </Flex>
          </form>
        </Flex>
      </Container>
    );
  }

  return (
    <>
      <Navigation user={user} handleLogout={handleLogout} />
      <Container>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} user={user} />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <ToggableDiv btnText="Add Blog" ref={blogFormRef}>
              <BlogForm createBlog={addNewBlog} />
            </ToggableDiv>
            <Blogs blogs={blogs} />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
