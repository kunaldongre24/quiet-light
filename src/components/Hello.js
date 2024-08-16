import React from "react";

function Hello({ isVisible }) {
  return (
    <div className="center-flex">
      <div className={`fixed invisible ${isVisible ? "visible" : null}`}>
        <h1 className="message">
          Quiet light
          <h3>Your mental wellbeing partner</h3>
        </h1>
      </div>
    </div>
  );
}

export default Hello;
