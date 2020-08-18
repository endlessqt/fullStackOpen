import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Button,
  Stack,
} from "@chakra-ui/core";

const BlogForm = ({ createBlog, ref }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addNewBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      url,
      author,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };
  return (
    <Flex direction="column" justify="center" align="center">
      <Heading as="h2" size="xl" my={8}>
        New Blog
      </Heading>
      <form onSubmit={addNewBlog} style={{ width: "100%" }}>
        <Stack spacing={3} m={3}>
          <FormControl>
            <FormLabel fontSize="xl" htmlFor="title">
              Title
            </FormLabel>
            <Input
              variant="flushed"
              size="lg"
              id="title"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xl" htmlFor="author">
              Author
            </FormLabel>
            <Input
              variant="flushed"
              size="lg"
              id="author"
              type="text"
              value={author}
              name="title"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xl" htmlFor="url">
              URL
            </FormLabel>
            <Input
              variant="flushed"
              size="lg"
              id="url"
              type="text"
              value={url}
              name="title"
              onChange={({ target }) => setUrl(target.value)}
            />
          </FormControl>
        </Stack>
        <Flex justify="center">
          <Button
            variantColor="teal"
            size="lg"
            m={1}
            id="buttonSubmit"
            type="submit"
            variant="outline">
            create
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default BlogForm;
