import {
  Pagination,
  Navigation,
  Autoplay
} from "swiper";

export const InstaSlider = {
  centerMode: true,
  spaceBetween: "5px",
  focusOnSelect: true,
  loop: true,
  slidesPerView: 5,
  speed: 500,
  dots: true,
  responsive: [{
      breakpoint: 1400,
      settings: {
        slidesPerView: 4,
        spaceBetween: "10px",
        slidesToScroll: 4,
        loop: true,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 3,
        slidesToScroll: 3,
        loop: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesPerView: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export const furnitureInstaSlider = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 5,
  slidesToScroll: 2,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 1,
        centerMode: true,
        spaceBetween: "20px",
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const NewArrivalSlider = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 4,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const MainHomeSlider = {
  dots: true,
  loop: true,
  speed: 500,
  arrows: true,
  autoplay: false,
  slidesPerView: 1,
  slidesToScroll: 1,
  nextArrow: '<div class="custom-arrow next"><span>Next</span><i class="fas fa-chevron-right"></i></div>',
  prevArrow: '<div class="custom-arrow prev"><i class="fas fa-chevron-left"></i><span>Prev</span></div>',
};

// ----------------*****************----------------******************------------
export const FlowerBrandSlider = {
  dots: false,
  loop: true,
  autoplay: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const HomePosterSlider = {
  nextArrow: '<div class="custom-arrow next"><span>Next</span><i class="fas fa-chevron-right"></i></div>',
  prevArrow: '<div class="custom-arrow prev"><i class="fas fa-chevron-left"></i><span>Prev</span></div>',
};
// ----------------*****************----------------******************------------
export const FlowerLatestSlider = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesPerView: 5,
  slidesToScroll: 2,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const FlowerOurSlider = {
  dots: false,
  loop: true,
  slidesPerView: 3,
  slidesToScroll: 2,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesPerView: 2,
      slidesToScroll: 2,
    },
  }, ],
};
// ----------------*****************----------------******************------------
export const FlowerProductSlider = {
  dots: false,
  loop: true,
  arrows: true,
  slidesPerView: 1,
  slidesToScroll: 1,
};
// ----------------*****************----------------******************------------
export const FlowerUpdateSlider = {
  dots: false,
  loop: true,
  slidesPerView: 3,
  slidesToScroll: 2,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesPerView: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const CategoryBannerSlider = {
  dots: false,
  loop: true,
  arrows: true,
  slidesPerView: 4,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1425,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesPerView: 1,
      },
    },
  ],
};

export const categorySlider3 = {
  dots: false,
  loop: true,
  autoplay: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 970,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesPerView: 1,
        fade: true,
        speed: 800,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const FurnitureMainSlider = {
  nextArrow: '<div className="custom-arrow next"><span>Next</span><i class="fas fa-chevron-right"></i></div>',
  prevArrow: '<div className="custom-arrow prev"><i class="fas fa-chevron-left"></i><span>Prev</span></div>',
};
// ----------------*****************----------------******************------------
export const furnitureHomeVerticalSlider = {
  centerMode: true,
  spaceBetween: "30px",
  dots: true,
  loop: true,
  slidesPerView: 2,
  slidesToScroll: 2,
  vertical: true,
  verticalSwiping: true,
  swipeToSlide: true,
  arrows: true,
};

// -------------------******************-----------------------*************
export const FurnitureThreeSlider = {
  dots: false,
  loop: true,
  arrows: true,
  slidesPerView: 1,
  slidesToScroll: 1,
};
// ----------------*****************----------------******************------------
export const FurnitureProductSlider = {
  loop: true,
  speed: 500,
  dots: true,
  slidesPerView: 5,
  slidesToScroll: 2,
  responsive: [{
      breakpoint: 1340,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 1030,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesPerView: 2,
      },
    },
    // {
    //   breakpoint: 45,
    //   settings: {
    //     slidesPerView: 3,
    //   },
    // },
    // {
    //   breakpoint: 45,
    //   settings: {
    //     slidesPerView: 2,
    //   },
    // },
    // {
    //   breakpoint: 56,
    //   settings: {
    //     slidesPerView: 2,
    //   },
    // },
  ],
};
// ----------------*****************----------------******************------------
export const ElectronicMainSlider = {
  dots: false,
  loop: true,
  speed: 500,
  autoplay: false,
  slidesPerView: 1,
  slidesToScroll: 1,
  fade: true,
};
// ----------------*****************----------------******************------------
export const ShoesMainSlider = {
  slidesPerView: 1,
  slidesToScroll: 1,
  fade: true,
  arrows: true,
  responsive: [{
    breakpoint: 480,
    settings: {
      infinite: false,
      slidesPerView: 1,
    },
  }, ],
};
// ----------------*****************----------------******************------------
export const ElectronicProductSlider = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 705,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const VRSlider = {
  dots: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 7,
  slidesToScroll: 1,
  speed: 500,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1630: {
      slidesPerView: 7,
    },
    1367: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 5,
    },
    992: {
      slidesPerView: 4,
    },
    740: {
      slidesPerView: 3,
    },
    481: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    }
  },
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 6,
      },
    },
    {
      breakpoint: 1367,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 740,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 481,
      settings: {
        slidesPerView: 1,
      },
    },
  ],
};


export const VRCollectionSlider ={
  modules: [Autoplay, Pagination],
  loop: true,
  pagination: {
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  slidesPerView: 7,
  breakpoints: {
    1630: {
      slidesPerView: 7,
      spaceBetween: 24
    },
    1367: {
      slidesPerView: 7,
      spaceBetween: 24
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24
    },
    705: {
      slidesPerView: 3,
      spaceBetween: 24
    },
    575: {
      spaceBetween: 12
    },
    481: {
      slidesPerView: 1,
      spaceBetween: 12
    },
    0: {
      spaceBetween: 12,
      slidesPerView: 1,
    }
  }
}

// ----------------*****************----------------******************------------
export const ShoesProductSlider = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 705,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const ShoesCategorySlider = {
  dots: false,
  loop: true,
  autoplay: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 970,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesPerView: 1,
        fade: true,
        speed: 800,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const ShoesNewSlider = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 5,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const VegetableMainSlider = {
  slidesPerView: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  // nextArrow:,
  // prevArrow:
};
// ----------------*****************----------------******************------------
export const VegetableNavSlider = {
  slidesPerView: 3,
  slidesToScroll: 1,
  width: "146px",
  dots: true,
  focusOnSelect: true,
  verticalSwiping: true,
  vertical: true,
};
// ----------------*****************----------------******************------------
export const VegetableFreshSlider = {
  loop: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 5,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
        dots: true,
      },
    },
    {
      breakpoint: 705,
      settings: {
        slidesPerView: 2,
        dots: true,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const vegetableProductSection = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 705,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// -------------------******************-----------------------*************

export const FreshFruitsSlider = {
  loop: true,
  speed: 500,
  slidesPerView: 6,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 5,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
        dots: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesPerView: 2,
        dots: true,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const SliderFruit = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 4,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const BottomBanner = {
  dots: false,
  loop: true,
  slidesPerView: 3,
  slidesToScroll: 2,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesPerView: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
// ----------------*****************----------------******************------------
export const searchProductSlider = {
  pagination: true,
  loop: true,
  spaceBetween:20,
  modules:[Pagination],
  slidesPerView: 4,
  breakpoints: {
      991:{
        slidesPerView: 3,
      },
      0:{
        slidesPerView: 2,
      }
    },
};

// ----------------*****************----------------******************------------

export const productPageRelativeProducts = {
  dots: true,
  loop: true,
  speed: 500,
  slidesPerView: 4,
  slidesToScroll: 1,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};

// ----------------*****************----------------******************------------
export const quickViewCarousel = {
  // centerMode: true,
  // spaceBetween: "10px",
  loop: true,
  slidesPerView: 4,
  slidesToScroll: 2,
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 3,
        slidesToScroll: 3,
        loop: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesPerView: 2,
        dots: true,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export const categoryFilterSlider = {
  dots: true,
  infinite: false,
  slidesPerView: 7,
  slidesToScroll: 1,
  speed: 500,
  autoplay: true,
  responsive: [{
      breakpoint: 1630,
      settings: {
        slidesPerView: 6,
      },
    },
    {
      breakpoint: 1367,
      settings: {
        slidesPerView: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 3,
      },
    },
    {
      breakpoint: 740,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};
// ----------------*****************----------------******************------------

export const productPageTopSlider = {
  fade: true,
  loop: true,
  speed: 500,
  slidesPerView: 1,
  slidesToScroll: 1,
};

export const productPageBottomSlider = {
  slidesPerView: 3,
  spaceBetween: "0px",
  slidesToScroll: 1,
  asNavFor: ".details-image",
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 2000,
};

// =========================Blog===============================

export const relatedBlogCarousel = {
  spaceBetween: 10,
  slidesPerView: 4,
  pagination: true
};

// ================= about us page ======================

export const testimonialCarousel = {
  modules: [Pagination],
  loop: true,
  spaceBetween: 30,
  pagination: {
    clickable: true
  },
  clickable: true,
  breakpoints: {
    992: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    }
  },
};

export const teamleadersSlider = {
  dots: true,
  loop: false,
  speed: 500,
  slidesPerView: 5,
  spaceBetween: 30,
  slidesToScroll: 2,
  breakpoints: {
    1200: {
      slidesPerView: 5
    },
    992: {
      slidesPerView: 3
    },
    0: {
      slidesPerView: 2
    },
  },
  responsive: [{
      breakpoint: 1200,
      settings: {
        slidesPerView: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesPerView: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesPerView: 2,
      },
    },
  ],
};