import React from "react";
import { Flex } from "@chakra-ui/core";

function Container(props) {
  return (
    <Flex m="0 auto" direction="column" maxW={{ xl: "6xl" }} bg="white">
      {props.children}
    </Flex>
  );
}

export default Container;
