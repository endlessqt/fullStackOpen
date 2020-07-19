import React, { useState, useImperativeHandle } from "react";

const ToggableDiv = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const showed = { display: visible ? "" : "none" };
  const hidden = { display: visible ? "none" : "" };
  const handleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      handleVisibility,
    };
  });
  return (
    <div>
      <div style={hidden}>
        <button onClick={handleVisibility}>{props.btnText}</button>
      </div>
      <div style={showed}>
        {props.children}
        <button onClick={handleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default ToggableDiv;
