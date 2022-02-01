import React from "react";

const StationDot = (props) => {
  return (
    <div
      style={{
        padding: 5,
        backgroundColor: "#FA58B6",
        position: "absolute",
        left: props.x * 20,
        top: props.y * 20,
      }}
    ></div>
  );
};

export default StationDot;
