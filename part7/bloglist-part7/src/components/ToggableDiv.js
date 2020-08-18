import React, { useState, useImperativeHandle } from "react";
import { Button, Flex, Collapse } from "@chakra-ui/core";

const ToggableDiv = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      handleVisibility,
    };
  });
  return (
    <>
      <Button size="lg" onClick={handleVisibility} fontSize="2xl">
        {props.btnText}
      </Button>
      <Collapse isOpen={visible}>
        {props.children}
        <Flex justify="center" w="full">
          <Button
            size="lg"
            onClick={handleVisibility}
            variantColor="red"
            variant="outline">
            cancel
          </Button>
        </Flex>
      </Collapse>
    </>
  );
});
ToggableDiv.displayName = "Toggable";

export default ToggableDiv;
