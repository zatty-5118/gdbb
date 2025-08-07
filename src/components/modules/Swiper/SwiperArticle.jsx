import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperArticle = ({ articles }) => {
    const [paginationEl, setPaginationEl] = useState(null);
    const paginationRef = useRef(null);

    useEffect(() => {
        if (paginationRef.current) {
            setPaginationEl(paginationRef.current);
        }
    }, []);

    return (
        <div className="swiper-container">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 4500 }}
                navigation
                pagination={{
                    el: paginationEl,
                    clickable: true,
                }}
                slidesPerView={2}
                spaceBetween={15}
                breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 25
                    }
                }}        
                className="article-swiper"
            >
                {articles.map((article, index) => (
                    <SwiperSlide key={index}>
                                                    <a href={`/gdbb/article/view/${article.slug}`} target="_blank">
                                <div className="thumbnail">
                                    <img src={article.thumbnail} alt={article.title} width={800} height={600} loading="lazy" decoding="async"/>
                                </div>
                                <div className="title">
                                    <h3>{article.title}</h3>
                                </div>
                            </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div ref={paginationRef} className="swiper-pagination"></div>
        </div>
    );
};

export default SwiperArticle;
