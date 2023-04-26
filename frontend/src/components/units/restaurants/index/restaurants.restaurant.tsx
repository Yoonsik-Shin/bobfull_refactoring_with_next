import SliderImage from "@/components/commons/lib/slickSliderImage";
import { useEffect, useRef } from "react";

export default function Restaurant({
  images,
  id,
  name,
  address,
  isLast,
  newLimit,
}) {
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    // slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    lazyLoad: true,
    swipeToSlide: true,
  };

  const restaurantRef = useRef(null);

  useEffect(() => {
    if (!restaurantRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(restaurantRef.current);
  }, [isLast]);

  return (
    <div ref={restaurantRef}>
      <SliderImage images={images} settings={settings} />
      <div>
        {id} {name}
      </div>
      <div>{address}</div>
      <hr />
    </div>
  );
}
