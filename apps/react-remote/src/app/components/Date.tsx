import React from 'react';

const Date = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Date selection question"
        id="dateQuestion"
      />
      <input type="date" name="date" id="date" />
    </div>
  );
};

export default Date;