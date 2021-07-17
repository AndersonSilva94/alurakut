import React from "react";

const Input = ({ placeholder, name }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={ placeholder }
        name={ name }
        aria-label={ placeholder }
      />
    </div>
  );
};

export default Input;
