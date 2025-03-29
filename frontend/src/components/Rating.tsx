import React from 'react';
import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  caption?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount, caption }) => {
  return (
    <>
      <div className="rating flex ">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {rating >= star ? (
              <FaStar className="text-[#edcf5d]" />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfStroke className="text-[#edcf5d]" />
            ) : (
              <FaRegStar className="text-[#edcf5d]" />
            )}
          </span>
        ))}
        {caption ? (
          <span className="mb-2 ml-1 text-[.8rem] text-[#a4a4a4]">
            {caption}
          </span>
        ) : (
          <span className="mb-2 ml-1 text-[.8rem] text-[#a4a4a4]">
            {'(' + reviewCount + ')'}
          </span>
        )}
      </div>
    </>
  );
};

export default Rating;
