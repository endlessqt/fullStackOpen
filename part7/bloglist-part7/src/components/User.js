import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Heading, List, ListItem, Flex, Text } from "@chakra-ui/core";
const User = () => {
  const users = useSelector((state) => state.users);
  const params = useParams();
  const user = users.find((user) => params.id === user.id);
  if (!user) {
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
        {user.name}
      </Heading>

      <Flex direction="column">
        {!user.blogs.length ? (
          <></>
        ) : (
          <Heading as="h3" fontSize="xl">
            Added blogs
          </Heading>
        )}
        <List
          p={10}
          spacing="3"
          styleType="decimal"
          fontSize={["lg", "base", "2xl"]}>
          {!user.blogs.length ? (
            <Text
              textAlign="center"
              fontSize="6xl">{`There are no added blogs`}</Text>
          ) : (
            user.blogs.map((blog) => {
              return <ListItem key={blog.id}>{blog.title}</ListItem>;
            })
          )}
        </List>
      </Flex>
    </>
  );
};

export default User;
