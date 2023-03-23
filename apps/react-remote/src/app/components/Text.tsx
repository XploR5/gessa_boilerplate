import React from "react";

const Text = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Text selection question"
        id="textQuestion"
      />
      <input type="text" name="text" id="text" />
    </div>
  );
};

export default Text