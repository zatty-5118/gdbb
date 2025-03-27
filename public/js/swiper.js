import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("mainContent");
    if (!content) return;

    const images = Array.from(content.querySelectorAll("img"));
    let imageGroup = [];

    images.forEach((img, index) => {
        const prev = images[index - 1];
        const next = images[index + 1];

        if (!prev || prev.nextElementSibling !== img) {
            imageGroup = [img];
        } else {
            imageGroup.push(img);
        }

        if (!next || img.nextElementSibling !== next) {
            if (imageGroup.length > 1) {
                const swiperWrapper = document.createElement("div");
                swiperWrapper.className = "swiper-wrapper";
                const swiperDiv = document.createElement("div");
                swiperDiv.className = "swiper main-swiper";

                // メイン画像をスライドとして追加
                imageGroup.forEach(image => {
                    const slideDiv = document.createElement("div");
                    slideDiv.className = "swiper-slide";
                    slideDiv.appendChild(image.cloneNode(true));
                    swiperWrapper.appendChild(slideDiv);
                });

                swiperDiv.appendChild(swiperWrapper);
                imageGroup[0].parentNode.replaceChild(swiperDiv, imageGroup[0]);
                imageGroup.slice(1).forEach(image => image.remove());

                // サムネイル用 Swiper の作成
                const thumbnailWrapper = document.createElement("div");
                thumbnailWrapper.className = "swiper-wrapper";
                const thumbnailSwiperDiv = document.createElement("div");
                thumbnailSwiperDiv.className = "swiper thumbnail-swiper";

                imageGroup.forEach(image => {
                    const thumbDiv = document.createElement("div");
                    thumbDiv.className = "swiper-slide";
                    const thumbImage = image.cloneNode(true);
                    thumbDiv.appendChild(thumbImage);
                    thumbnailWrapper.appendChild(thumbDiv);
                });

                thumbnailSwiperDiv.appendChild(thumbnailWrapper);
                swiperDiv.parentNode.appendChild(thumbnailSwiperDiv);

                // **サムネイル Swiper の初期化**
                const thumbnailSwiper = new Swiper(thumbnailSwiperDiv, {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    breakpoints: {
                        768: {
                            spaceBetween: 0,
                            slidesPerView: imageGroup.length,
                        }
                    },
                    watchSlidesProgress: true, 
                    watchSlidesVisibility: true,
                    slideToClickedSlide: true,
                });

                // **メイン Swiper の初期化**
                const mainSwiper = new Swiper(swiperDiv, {
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    speed: 1500,
                    loop: false,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    thumbs: {
                        swiper: thumbnailSwiper,
                    },
                });

                // Swiper のナビゲーション要素を追加
                const pagination = document.createElement("div");
                pagination.className = "swiper-pagination";
                swiperDiv.appendChild(pagination);

                const prevButton = document.createElement("div");
                prevButton.className = "swiper-button-prev";
                swiperDiv.appendChild(prevButton);

                const nextButton = document.createElement("div");
                nextButton.className = "swiper-button-next";
                swiperDiv.appendChild(nextButton);
            }
        }
    });
});
