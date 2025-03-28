import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperArticle = ({ articles }) => {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 4500 }}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={25}
            className="article-swiper"
        >
            {articles.map((article) => (
                <SwiperSlide>
                    <article>
                        <a href={`/gdbb/article/view/${article.slug}`} target="_blank">
                            <div className="thumbnail">
                                <img src={article.thumbnail} alt={article.title} />
                            </div>
                            <div className="title">
                                <h3>{article.title}</h3>
                            </div>
                        </a>
                    </article>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
  
export default SwiperArticle;