import React, { useState } from 'react';

interface RatingProps {
  maxRating: number;
}

const Rating: React.FC<RatingProps> = ({ maxRating }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (newRating: number) => {
    setRating(newRating);
  };

  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? 'filled' : ''}`}
        onClick={() => handleClick(i)}
      >
        &#9733;
      </span>
    );
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;