import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Heading, Stack, Text, PseudoBox } from "@chakra-ui/core";

const Navigation = ({ user, handleLogout }) => {
  return (
    <Flex
      as="nav"
      align="center"
      p={6}
      bg="gray.500"
      wrap="wrap"
      justify="space-between"
      color="white">
      <Heading
        as="h2"
        mr={10}
        display={["none", "none", "inline-block", "inline-block"]}>
        Blog App
      </Heading>
      <Stack isInline spacing={3} flex="1">
        <Flex>
          <PseudoBox as={Link} to="/blogs" _hover={{ color: "gray.600" }}>
            Blogs
          </PseudoBox>
        </Flex>
        <Flex>
          <PseudoBox as={Link} to="/users" _hover={{ color: "gray.600" }}>
            Users
          </PseudoBox>
        </Flex>
      </Stack>
      <Flex align="center" wrap="wrap">
        {user ? (
          <Text as={"i"} mr={5}>
            {user.username} logged In
          </Text>
        ) : (
          ""
        )}{" "}
        <Button onClick={handleLogout} variantColor={"red"}>
          logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navigation;
