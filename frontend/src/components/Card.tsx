import React from "react";

interface CardProps {
  title: string;
  image: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, image, description }) => {
  return (
    <div className="shadow-lg rounded-xl p-4 w-48 flex flex-col items-center 
                 bg-gray-100 hover:bg-gray-200 transition-all duration-300">
        <div className="w-full h-52 overflow-hidden rounded-lg">
            <img src={image} alt={title} className="w-full h-full object-cover object-top rounded-lg" />
        </div>
        <div className="h-16 w-full flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-semibold w-full truncate overflow-hidden whitespace-normal leading-tight">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
