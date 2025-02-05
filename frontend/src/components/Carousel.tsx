import React, { useRef } from "react";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  title: string;
  items: { title: string; image: string; description: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex flex-col items-center my-10">
      <h2 className="text-3xl font-bold mb-5">{title}</h2>
        
        {/*Scrollable Container */}
        <div className = "relative w-full max-w-5xl mx-auto overflow-hidden">
            <div
            ref={carouselRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 p-4"
            style={{ scrollSnapType: "x mandatory", overflowX: "auto", whiteSpace: "nowrap", display: "flex", gap: "16px", paddingBottom: "10px", scrollBehavior: "smooth", minWidth: "100%" }}
            >
            {items.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                    <Card key={index} title={item.title} image={item.image} description={item.description} />
                </div>
            ))}
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                display: none; /* Chrome, Safari */
                }
                .scrollbar-hide {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
                }
          `}
          </style>
        </div>
      </div>
  );
};

export default Carousel;
