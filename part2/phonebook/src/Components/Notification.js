import React from "react";

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
    <div style={notification.status === "error" ? errorStyle : completedStyle}>
      {notification.text}
    </div>
  );
};

export default Notification;
