import React from "react";

interface CardProps {
  title: string;
  image: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps & { className?: string }> = ({ title, image, description, className, onClick }) => {
  return (
    <div className={`shadow-lg rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-200 transition-all duration-300 ${className}`} onClick = {onClick}>
      <div className="w-full h-60 overflow-hidden rounded-lg">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="h-20 w-full flex flex-col justify-center items-center text-center">
        <h3 className="text-lg font-semibold w-full truncate">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};


export default Card;
