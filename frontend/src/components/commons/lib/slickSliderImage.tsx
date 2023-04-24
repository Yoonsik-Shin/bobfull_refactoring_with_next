import Slider from "react-slick";
import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideImg = styled.img`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
`;

const SlideImgBlank = styled.img`
  width: 45%;
  border-radius: 20px;
  padding: 10px;
`;

const Blanksettings = {
  infinite: true,
  slidesToShow: 3,
  centerMode: true,
  centerPadding: "20px",
  lazyLoad: true,
};

export default function SliderImage({ settings, images }) {
  return (
    <>
      {images.length === 4 ? (
        <Slider {...settings}>
          {images.map((src, idx) => (
            <SlideImg key={idx} src={src.image} />
          ))}
        </Slider>
      ) : (
        <Slider {...Blanksettings}>
          <SlideImgBlank src="https://dummyimage.com/600x400/000/fff" />
          <SlideImgBlank src="https://dummyimage.com/600x400/000/fff" />
          <SlideImgBlank src="https://dummyimage.com/600x400/000/fff" />
          <SlideImgBlank src="https://dummyimage.com/600x400/000/fff" />
        </Slider>
      )}
    </>
  );
}
