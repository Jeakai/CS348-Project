import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

interface CardProps {
  pid: number;
  title: string;
  image: string;
  description: string;
  favCount?: number; // Favourites Count
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
  favCount,
  uid,
  isFavourited = false,
  showFavourite = true,
  className,
  onFavourite,
  onClick,
}) => {
  const [liked, setLiked] = useState(isFavourited);
  const [currCount, setCurrCount] = useState(favCount || 0);

  useEffect(() => {
    setLiked(isFavourited);
  }, [isFavourited]);

  useEffect(() => {
    setCurrCount(favCount || 0);
  }, [favCount]);

  const handleFavouriteClick = async (e: React.MouseEvent) => {
    console.log('Card click initiated');
    e.stopPropagation(); // Prevent card onClick from firing
    e.preventDefault();
    const newLikedState = !liked;
    try {
      await axios.put(`http://localhost:3000/api/favourites/${uid}/toggle`, { pid }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      console.log("Favourite toggled successfully");

      setCurrCount(newLikedState ? currCount + 1 : currCount - 1);
      setLiked(newLikedState);
      if (onFavourite) {
        onFavourite(newLikedState);
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
      // Optionally, revert the state on error
      setLiked(liked);
    }
  };

  return (
    <div
      className={`card relative border rounded-lg overflow-hidden shadow-md bg-white bg-opacity-90 cursor-pointer ${className || ''}`}
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="mt-2 text-ellipsis overflow-hidden whitespace-nowrap" title={description}>{description}</p>
      </div>
      {(uid && uid !== 0 && showFavourite) && (
      <div className="absolute top-2 right-2 bg-gray-200 bg-opacity-80 rounded-full px-3 py-2 text-sm flex items-center space-x-2">
        <span>{currCount}</span>
        <button onClick={handleFavouriteClick} className="flex items-center">
        {liked ? (
          <FaHeart size={20} className="text-red-500" />
        ) : (
          <FaRegHeart size={20} className="text-gray-400" />
        )}
        </button>
      </div>
      )}
    </div>
  );
};

export default Card;
