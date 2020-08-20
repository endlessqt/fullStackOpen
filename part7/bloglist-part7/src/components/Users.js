import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heading, Flex, Box, Link as ChakraLink, Text } from "@chakra-ui/core";
const Users = () => {
  const users = useSelector((state) =>
    state.users.sort((a, b) => b.blogs.length - a.blogs.length)
  );
  return (
    <>
      <Heading
        mt={3}
        as="h2"
        fontSize="5xl"
        textAlign="center"
        fontWeight="400"
        letterSpacing={2}>
        Users
      </Heading>
      <Text textAlign="center" fontSize="2xl">
        Blogs by user
        <Text fontSize="md">click on user for more info</Text>
      </Text>
      <Flex
        m={2}
        direction="column"
        fontSize="2xl"
        justify="center"
        align="center">
        {users.map((user) => {
          return (
            <Box key={user.id} fontSize="2xl">
              <ChakraLink
                color="teal.500"
                as={Link}
                to={`users/${user.id}`}
                display="inline-block">
                {user.username}
              </ChakraLink>
              {" — "}
              {user.blogs.length}
            </Box>
          );
        })}
      </Flex>
    </>
  );
};

export default Users;
