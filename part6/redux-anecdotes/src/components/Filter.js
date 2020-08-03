import React from "react";
import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const style = { marginBottom: 10 };

  const handleChange = (event) => {
    const filter = event.target.value;
    props.setFilter(filter);
  };
  return (
    <div style={style}>
      <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
