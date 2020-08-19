import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";

import {
  Flex,
  List,
  ListItem,
  Heading,
  Link,
  Button,
  Textarea,
  Icon,
  Text,
  Divider,
} from "@chakra-ui/core";
const Blog = ({ blogs, user }) => {
  const [comment, setComment] = useState("");
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const blog = blogs.find((blog) => blog.id === params.id);
  const updateLikes = (id) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(id, newBlog));
  };
  const deletePost = (id) => {
    blogService.setToken(user.token);
    if (
      window.confirm(
        `Do you really wish to delete ${blog.title} by ${blog.author}`
      )
    ) {
      dispatch(deleteBlog(id));
      history.push("/");
    }
  };
  const commentPost = (id, comment) => {
    if (!comment.length) {
      setComment("");
      return;
    }
    const newBlog = {
      ...blog,
      user: blog.user.id,
      comment: comment,
    };
    dispatch(commentBlog(id, newBlog));
    setComment("");
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <Heading
        mt={3}
        as="h2"
        fontSize="5xl"
        textAlign="center"
        fontWeight="400"
        letterSpacing={2}>
        {blog.title}
      </Heading>
      <Flex direction="column" h="80vh" m={3} fontSize="xl">
        <Link
          fontSize="2xl"
          color="teal.600"
          isExternal
          href={`${blog.url}`}
          mb={5}
          textAlign="center">
          {blog.url}
          <Icon name="external-link" mx={1} />
        </Link>

        <Text textAlign="center">
          Blog added by {blog.user.username} has{" "}
          <Text as={"span"} color="pink.500">
            {blog.likes}
          </Text>{" "}
          {blog.likes > 1 ? "likes" : "like"}
          <br />
          <Button
            size="lg"
            my={2}
            variant="outline"
            variantColor="pink"
            onClick={() => updateLikes(blog.id)}>
            like that blog
          </Button>
          <br />
          <Button
            size="md"
            rightIcon={"delete"}
            variant="solid"
            variantColor="red"
            display={{
              display: blog.user.username === user.username ? "" : "none",
            }}
            onClick={() => deletePost(blog.id)}>
            delete
          </Button>
        </Text>
        <Divider borderColor="black" mt={5} />
        <div>
          <Heading as="h3" my={10} textAlign="center" textTransform="uppercase">
            Comments
          </Heading>
          <Textarea
            m={3}
            color="black"
            placeholder="Leave your comment here"
            value={comment}
            resize="vertical"
            onChange={({ target }) => setComment(target.value)}
          />
          <Flex justify="flex-end">
            <Button
              onClick={() => commentPost(blog.id, comment)}
              size="lg"
              variant="outline"
              variantColor="gray">
              Add Comment
            </Button>
          </Flex>
          {blog.comments.length !== 0 ? (
            <List
              p={10}
              spacing="3"
              styleType="decimal"
              fontSize={["lg", "base", "2xl"]}>
              {blog.comments.map((comment, index) => {
                /*I know that indexies as key is bad idea, but there is no possible problems with that implementation 
            because we have no delete functionality on comments, so it's not gonna cause any problems in that app.
            Possible solution is save generated ids to db and use them, i know i'm sorry and lazy to implement it just now */
                return <ListItem key={index}>{comment}</ListItem>;
              })}
            </List>
          ) : (
            <Text textAlign="center" fontSize="3xl" mt={8}>
              {"Be the very first commentator of that blog!"}
            </Text>
          )}
        </div>
      </Flex>
    </>
  );
};
export default Blog;
