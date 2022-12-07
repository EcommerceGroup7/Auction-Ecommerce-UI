import React from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import auctionImg1 from '../imgs/fishauction.jpg'
import auctionImg2 from '../imgs/dsc_0245.jpg'
import auctionImg3 from '../imgs/IMG_9021.jpg'
import "../App.css"
const Silder = () => {
  return (
    <div className='mt-20 mb-10'>
        <Swiper spaceBetween={30} centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        rewind={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
            <SwiperSlide>
                <Link>
                    <img src={auctionImg1} alt="" />
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link>
                    <img src={auctionImg2} alt="" />
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link>
                    <img src={auctionImg3} alt="" />
                </Link>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Silder