import React from 'react';
import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';

interface RatingProps {
  rating: number;
  reviewCount: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount }) => {
  return (
    <>
      <div className="rating flex mx-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {/* <i
          className={
            rating >= star
              ? 'fas fa-star'
              : rating >= star - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        /> */}
            {rating >= star ? (
              <FaStar className="text-yellow-600" />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfStroke className="text-yellow-600" />
            ) : (
              <FaRegStar className="text-yellow-600" />
            )}
          </span>
        ))}
        <span className="mb-2 ml-1 text-[.75rem]"> ({reviewCount})</span>
      </div>
    </>
  );
};

export default Rating;
