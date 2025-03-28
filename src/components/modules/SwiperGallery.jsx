import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, EffectFade } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

const SwiperGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <>
      <Swiper
            spaceBetween={10}
            navigation
            effect="fade"
            fadeEffect={{ crossFade: true }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, EffectFade]}
            className="main-swiper"
        >
            {images.map((url, index) => (
                <SwiperSlide key={index}>
                    <img src={url} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
            ))}
      </Swiper>

      <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            modules={[Thumbs]}
            className="thumbnail-swiper"
        >
            {images.map((url, index) => (
                <SwiperSlide key={index}>
                    <img src={url} alt={`Thumbnail ${index + 1}`} />
                </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
};

export default SwiperGallery;