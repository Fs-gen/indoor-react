import React from "react";

const StationDot = (input) => {
  return (
    <div>
      {/* station 1 */}
      <div
        style={{
          padding: 5,
          backgroundColor: "#FA58B6",
          position: "absolute",
          left: input[0][0] * 20,
          top: input[0][1] * 20,
        }}
      ></div>

      {/* station 2 */}
      <div
        style={{
          padding: 5,
          backgroundColor: "#FA58B6",
          position: "absolute",
          left: input[1][0] * 20,
          top: input[1][1] * 20,
        }}
      ></div>

      {/* station 3 */}
      <div
        style={{
          padding: 5,
          backgroundColor: "#FA58B6",
          position: "absolute",
          left: input[2][0] * 20,
          top: input[2][1] * 20,
        }}
      ></div>
    </div>
  );
};

export default StationDot;
