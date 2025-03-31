import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

interface CardProps {
  pid: number;
  title: string;
  image: string;
  description: string;
  uid?: number; // Current user's ID (optional; if undefined, we assume not logged in)
  isFavourited?: boolean; // Indicates if item is already in favourites (initial value)
  showFavourite?: boolean; // Controls whether to display the heart (default true)
  className?: string;
  onFavourite?: (liked: boolean) => void;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  pid,
  title,
  image,
  description,
  uid,
  isFavourited = false,
  showFavourite = true,
  className,
  onFavourite,
  onClick,
}) => {
  const [liked, setLiked] = useState(isFavourited);

  useEffect(() => {
    setLiked(isFavourited);
  }, [isFavourited]);

  const handleFavouriteClick = async (e: React.MouseEvent) => {
    console.log('Card click initiated');
    e.stopPropagation(); // Prevent card onClick from firing
    e.preventDefault();
    const newLikedState = !liked;
    try { // TODO: Single call to toggle favourite using transaction in backend
      const token = localStorage.getItem("authToken");
      if (newLikedState) {
        // Add favourite via POST
        await axios.post(`http://localhost:3000/api/favourites/${uid}`, { pid }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Favourite added successfully");
      } else {
        // Remove favourite via DELETE
        //problem starts here
        await axios.delete(`http://localhost:3000/api/favourites/${uid}/${pid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Favourite removed successfully");
      }
      setLiked(newLikedState);
      if (onFavourite){
        onFavourite(newLikedState);
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
      // Optionally, revert the state on error
      setLiked(liked);
    }
    if (onFavourite) {
      onFavourite(newLikedState);
    }
  };

  return (
    <div
      className={`card relative border rounded-lg overflow-hidden shadow-md bg-white cursor-pointer ${className || ''}`}
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <p>{description}</p>
      </div>
      {(uid && uid !== 0 && showFavourite) && (
        <button
          onClick={handleFavouriteClick}
          className="absolute top-2 right-2 focus:outline-none"
        >
          {liked ? (
            <FaHeart size={24} className="text-red-500" />
          ) : (
            <FaRegHeart size={24} className="text-gray-300" />
          )}
        </button>
      )}
    </div>
  );
};

export default Card;
