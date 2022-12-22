import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Recommend from './Recommend'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from '@apollo/client';
import {getAuctioningProduct} from '../graphql/queries'
const Recommends = () => {
  const {loading, error,data} = useQuery(getAuctioningProduct)
  return (
    <div className='mb-10'>
        <div className='flex items-baseline h-max'>
            <h1 className='mb-3 font-bold text-2xl h-fit mr-4'>Recommand for you</h1>
            <Link className='text-lg hover:text-link' to='/categories/all'>See all <AiOutlineArrowRight className='inline w-4 h-4'/></Link>
        </div>
        {/* <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center '>
            <Recommend/>
            <Recommend/>
            <Recommend/>
            <Recommend/>
            <Recommend/>
            <Recommend/>
        </div> */}
        <Swiper centeredSlides={true}
        slidesPerView={1}
        // spaceBetween={30}
        loop={true}
        rewind={true}
      
        navigation={true}
        breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 200,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        modules={[Autoplay, Navigation]}
        className="mySwiper ">
          {!loading && data.getAuctioningProduct.slice(0,6).map((item,index)=>(
              <SwiperSlide key={item.Product_Auction_ID}>
                  <Recommend img={item.Product_ID.Product_Image[0].Product_Image_Url} price={item.Current_Price}/>
              </SwiperSlide>
          ))}
            {/* <SwiperSlide>
                <Recommend/>
            </SwiperSlide>
            <SwiperSlide>
                <Recommend/> 
            </SwiperSlide>
            <SwiperSlide>
                <Recommend/> 
            </SwiperSlide>
            <SwiperSlide>
                <Recommend/> 
            </SwiperSlide>
            <SwiperSlide>
                <Recommend/> 
            </SwiperSlide> */}
        </Swiper>
    </div>
  )
}

export default Recommends