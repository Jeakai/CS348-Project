import React, { useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  title: string;
  items: { title: string; image: string; description: string }[];
  isLandingPage?: boolean; // Add this prop to identify the landing page
}

const Carousel: React.FC<CarouselProps> = ({ title, items, isLandingPage = false }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Render the Splide-based carousel for the landing page
  if (isLandingPage) {
    return (
      <div className="w-full flex flex-col items-center my-10">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>

        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          <Splide
            options={{
              type: "loop", // Enable infinite looping
              autoScroll: {
                pauseOnHover: false, // Do not pause on hover
                pauseOnFocus: false, // Do not pause on focus
                rewind: true, // Rewind to start when the end is reached
                speed: 0.5, // Scrolling speed
              },
              arrows: false, // Hide navigation arrows
              pagination: false, // Hide pagination dots
              fixedWidth: "200px", // Fixed width for each slide
              gap: "16px", // Gap between slides
            }}
            extensions={{ AutoScroll }} // Use the AutoScroll extension
          >
            {items.map((item, index) => (
              <SplideSlide key={index}>
                <Card title={item.title} image={item.image} description={item.description} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    );
  }

  // Render the default scrollable carousel for other pages
  return (
    <div className="w-full flex flex-col items-center my-10">
      <h2 className="text-3xl font-bold mb-5">{title}</h2>

      {/* Scrollable Container */}
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 p-4"
          style={{
            scrollSnapType: "x mandatory",
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            gap: "16px",
            paddingBottom: "10px",
            scrollBehavior: "smooth",
            minWidth: "100%",
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-48">
              <Card title={item.title} image={item.image} description={item.description} />
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
        `}</style>
      </div>
    </div>
  );
};

export default Carousel;