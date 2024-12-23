
"use client"

import { useState, useEffect } from "react";
import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { EffectFade } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade"; // Стили для эффекта исчезновения

export default function Hero() {

    const images = [
        "/images/hero_1.jpg",
        "/images/hero_2.jpg",
        "/images/hero_3.jpg",
    ];

    return (
        <div className="h-full w-full mt-8 md:mt-16">
            <div className="w-full lg:w-4/5">
                <h1 className="custom-text-huge text-nowrap">
                    ОТЧЁТЫ ГУБЕРНАТОРОВ
                </h1>
                <h1 className="sm:mt-[10px] sm:mb-[25px] font-bold text-blue custom-text-huge text-nowrap">
                    ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
                <p className="font-lower custom-text-norm my-4 leading-tight">
                    Отчёты военных губернаторов г. Красноярска и гражданских губернаторов
                    Енисейской губернии с момента основания губернии в 1822 году и до революции
                </p>
            </div>
            <div className="relative w-full h-44 sm:h-80 md:h-[350px]">

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    slidesPerView={1}
                   
                    effect="fade" 
                    fadeEffect={{ crossFade: true }} 
                    
                    pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet', bulletActiveClass: 'swiper-pagination-bullet-active', }}
                    navigation={{
                        nextEl: '.swiper-next',
                        prevEl: '.swiper-prev',
                    }}

                    autoplay={{ delay: 5000 }}
                    speed={1000}
                    loop={true}
                    className="rounded-xl w-full h-full"
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={src}
                                alt=""
                                fill
                                sizes="100vw"
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="swiper-prev hidden md:block"></div>
                <div className="swiper-next hidden md:block"></div>

            </div>
        </div>
    )
}

/*

 <button
                    className="absolute left-0 top-0 h-full w-1/2 bg-transparent z-10"
                    onClick={handlePrevClick}

                ></button>
                <button
                    className="absolute right-0 top-0 h-full w-1/2 bg-transparent z-10"
                    onClick={handleNextClick}

                ></button>
                <div className="relative w-full h-full">
                    {images.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt="hero"
                            fill
                            sizes="100vw"
                            className={`absolute rounded-xl top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
                <div className="absolute z-20 bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue' : 'bg-white'
                                }`}
                            onClick={() => handleIndicatorClick(index)}
                        ></div>
                    ))}
                </div>


*/