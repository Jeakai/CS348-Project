import React, { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import Card from "./Card";

interface CarouselItem {
  pid: number;
  title: string;
  image: string;
  description: string;
  isFavourited?: boolean;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  uid: number; 
  isLandingPage?: boolean;
  onClick?: (item: CarouselItem) => void;
  showFavourite?: boolean; 
  onFavouriteToggle?: (pid: number, liked: boolean) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  items,
  uid,
  isLandingPage = false,
  showFavourite = true,
  onClick = () => {},
  onFavouriteToggle,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Carousel mounted, checking for unwanted elements...");
  }, []);

  if (isLandingPage) {
    return (
      <div className="w-full flex flex-col items-center my-10">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          <Splide
            options={{
              type: "loop",
              autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false,
                rewind: true,
                speed: 0.5,
              },
              accessibility: false,
              arrows: false,
              pagination: false,
              fixedWidth: "200px",
              gap: "16px",
              arrowPath: "",
              i18n: {
                next: "",
                prev: "",
                slideX: "",
              },
            }}
            extensions={{ AutoScroll }}
            onMounted={(splide) => {
              console.log("Splide mounted, removing unwanted elements...");
              
              // Remove arrow / screenreader elements
              const unwantedElements = splide.root.querySelectorAll(
                ".splide__arrow, .splide__arrow--prev, .splide__arrow--next, .splide__sr"
              );
              unwantedElements.forEach((el) => {
                el.parentNode?.removeChild(el);
              });

              // Remove aria attributes that might contain "0"
              const ariaElements = splide.root.querySelectorAll(
                "[aria-label], [aria-roledescription], [aria-valuenow]"
              );
              ariaElements.forEach((el) => {
                el.removeAttribute("aria-label");
                el.removeAttribute("aria-roledescription");
                el.removeAttribute("aria-valuenow");
              });
            }}
          >
            {items.map((item, index) => (
              <SplideSlide key={index}>
                <Card
                  pid={item.pid}
                  uid={uid}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  isFavourited={item.isFavourited}
                  showFavourite={showFavourite}
                  onClick={() => onClick(item)}
                  onFavourite={onFavouriteToggle? (liked) => onFavouriteToggle(item.pid, liked): undefined}
                />
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
              <div onClick={() => onClick(item)} style={{ cursor: "pointer" }}>
                <Card
                  pid={item.pid}
                  uid={uid}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  isFavourited={item.isFavourited}
                  showFavourite={showFavourite}
                  onFavourite={onFavouriteToggle?(liked) => onFavouriteToggle(item.pid, liked):undefined}
                />
              </div>
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
