import React from "react";
import { useSelector } from "react-redux";
import { Alert, AlertTitle, AlertIcon } from "@chakra-ui/core";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }
  return (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>{notification.text}</AlertTitle>
    </Alert>
  );
};

export default Notification;
