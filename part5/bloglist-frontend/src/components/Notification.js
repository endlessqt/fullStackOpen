import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  const errorStyle = {
    color: "red",
    fontSize: 30,
    backgroundColor: "lightgray",
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "red",
    padding: 8,
    marginBottom: 5,
  };
  const completedStyle = {
    color: "green",
    fontSize: 30,
    backgroundColor: "lightgray",
    borderRadius: 5,
    borderColor: "green",
    borderStyle: "solid",
    padding: 8,
    marginBottom: 5,
  };
  if (notification === null) {
    return null;
  }
  return (
    <div id="notification" style={notification.type === "error" ? errorStyle : completedStyle}>
      {notification.message}
    </div>
  );
};
Notification.propTypes = {
  notification: PropTypes.object,
};
export default Notification;
