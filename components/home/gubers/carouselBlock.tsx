"use client"

import React, { useEffect, useState } from 'react'
import type { CarouselApi } from '../../ui/carousel'
import { Carousel } from '../../ui/carousel'

export default function CarouselBlock({ children }: { children: React.ReactNode }) {

    const [emblaApi, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        setCurrent(emblaApi.selectedScrollSnap() + 1)
        setCount(emblaApi.scrollSnapList().length)

        emblaApi.on("select", () => {
            setCurrent((emblaApi.selectedScrollSnap() + 1))
        })
    }, [emblaApi])

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDotClick = (index: number, emblaApi: CarouselApi) => {
        emblaApi?.scrollTo(index)
        setCurrentIndex(index);
        setCurrent(index)
    };

    const handleScroll = (index: number) => {
        setCurrentIndex(index);
    };

    const dots = [];
    for (let i = 0; i < count; i++) {
        dots.push(
            <span key={i} className={i === currentIndex ? `w-2 h-2 bg-blue rounded-full cursor-pointer` : `w-2 h-2 bg-black rounded-full cursor-pointer`}
                onClick={() => handleDotClick(i, emblaApi)}></span>
        );
    }

    return (
        <>
            <Carousel onMouseMove={() => handleScroll(current - 1)} onTouchMove={() => handleScroll(current - 1)}
                setApi={setApi}
                opts={{
                    dragThreshold: 30,
                    dragFree: false,
                    skipSnaps: ((typeof window !== "undefined") && (window.innerWidth > 768)) ? true : false
                }}
                className='mx-auto'
            >
                {children}

                {/*
                <div className='flex items-center justify-center mt-5'>
                    <CarouselPrevious variant="default" className='flex-shrink-0' />
                    <Progress value={(current / count) * 100} className="mx-3 w-full " />
                    <CarouselNext variant="default" className='flex-shrink-0' />
                </div>
                */}

            </Carousel>

            <div className='mt-8 flex items-center justify-center gap-3'>
                {dots}
            </div>
        </>
    )
}

