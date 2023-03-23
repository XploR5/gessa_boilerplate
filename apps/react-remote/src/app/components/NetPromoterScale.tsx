import React, { useState } from 'react';

const NetPromoterScale = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value: React.SetStateAction<number>) => {
    setRating(value);
  };

  return (
    <div>
      <h2>
        How likely are you to recommend our product/service to a friend or
        colleague?
      </h2>
      <div className="net-promoter-scale">
        <div
          className={`rating ${rating >= 9 ? 'active' : ''}`}
          onClick={() => handleClick(9)}
        >
          <span>9</span>
        </div>
        <div
          className={`rating ${rating >= 8 ? 'active' : ''}`}
          onClick={() => handleClick(8)}
        >
          <span>8</span>
        </div>
        <div
          className={`rating ${rating >= 7 ? 'active' : ''}`}
          onClick={() => handleClick(7)}
        >
          <span>7</span>
        </div>
        <div
          className={`rating ${rating >= 6 ? 'active' : ''}`}
          onClick={() => handleClick(6)}
        >
          <span>6</span>
        </div>
        <div
          className={`rating ${rating >= 5 ? 'active' : ''}`}
          onClick={() => handleClick(5)}
        >
          <span>5</span>
        </div>
        <div
          className={`rating ${rating >= 4 ? 'active' : ''}`}
          onClick={() => handleClick(4)}
        >
          <span>4</span>
        </div>
        <div
          className={`rating ${rating >= 3 ? 'active' : ''}`}
          onClick={() => handleClick(3)}
        >
          <span>3</span>
        </div>
        <div
          className={`rating ${rating >= 2 ? 'active' : ''}`}
          onClick={() => handleClick(2)}
        >
          <span>2</span>
        </div>
        <div
          className={`rating ${rating >= 1 ? 'active' : ''}`}
          onClick={() => handleClick(1)}
        >
          <span>1</span>
        </div>
      </div>
      <p>Your rating: {rating}</p>
    </div>
  );
};

export default NetPromoterScale;