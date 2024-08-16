import React from "react";

const Firefly = ({ quantity }) => {
  const fireflies = Array.from({ length: quantity }, (_, i) => i + 1);

  return (
    <div className="fireflies-container">
      {fireflies.map((firefly) => (
        <div key={firefly} className="firefly">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      ))}
    </div>
  );
};

export default Firefly;
