import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, EffectFade, Scrollbar } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';

const SwiperGallery = ({ images }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<>
			<div className='swiper-container'>
				<Swiper
					modules={[Navigation, Thumbs, EffectFade]}
					spaceBetween={10}
					effect="fade"
					fadeEffect={{ crossFade: true }}
					thumbs={{ swiper: thumbsSwiper }}
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
					loop = { true }
					className="main-swiper"
				>
					{images.map((url, index) => (
						<SwiperSlide key={index}>
							<img src={url} alt={`Slide ${index + 1}`} width={800} height={600} loading='lazy' decoding='async'/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className='swiper-button-next'></div>
				<div className='swiper-button-prev'></div>
			</div>
			<div className='swiper-container'>
				<Swiper
					modules={[Thumbs, Scrollbar]}
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={4}
					breakpoints={{
						768: {
							slidesPerView: images.length,
						}
					}}
					scrollbar={{
						draggable: true,
						el: ".swiper-scrollbar",
					}}
					watchSlidesProgress
					className="thumbnail-swiper"
				>
					{images.map((url, index) => (
						<SwiperSlide key={index}>
							<img src={url} alt={`Thumbnail ${index + 1}`} width={800} height={600} loading='lazy' decoding='async'/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className='swiper-scrollbar'></div>
			</div>
		</>
	);
};

export default SwiperGallery;
