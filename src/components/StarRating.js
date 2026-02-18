import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const starComponent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  message: PropTypes.array,
};

export default function StarRating({
  maxRating = 5,
  color = "rgb(255, 229, 34)",
  size = 28,
  message = [],
  defaultRating = 0,
  onSetRating,
}) {
  const textStyle = {
    fontSize: `${size / 1.5}px`,
    color,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleSetRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  return (
    <div style={starComponent}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            color={color}
            size={size}
            key={i}
            onRate={() => {
              handleSetRating(i + 1);
            }}
            onHoverIn={() => {
              setTempRating(i + 1);
            }}
            onHoverOut={() => {
              setTempRating(0);
            }}
            index={i + 1}
            full={tempRating ? tempRating > i : rating > i}
          />
        ))}
      </div>
      <p style={textStyle}>
        {maxRating === message.length
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating}
      </p>
    </div>
  );
}
