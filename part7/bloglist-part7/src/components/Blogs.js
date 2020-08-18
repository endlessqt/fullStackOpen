import React from "react";
import { Stack, Divider, PseudoBox, Tooltip } from "@chakra-ui/core";
import { Link } from "react-router-dom";
function Blogs({ blogs }) {
  return (
    <>
      <Stack mx={10} mt={5}>
        {blogs.map((blog) => {
          return (
            <Tooltip
              key={blog.id}
              placement="top"
              bg="black"
              label="Click for more info"
              hasArrow>
              <PseudoBox
                fontSize={["base", "lg", "xl", "2xl"]}
                textAlign="center"
                color="black"
                _hover={{ color: "gray.500" }}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                <Divider borderColor="gray.500" my={5} />
              </PseudoBox>
            </Tooltip>
          );
        })}
      </Stack>
    </>
  );
}

export default Blogs;
