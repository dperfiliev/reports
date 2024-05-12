"use client"

import React, { useEffect, useState } from 'react'
import type { CarouselApi } from '../../ui/carousel'
import { Carousel} from '../../ui/carousel'
//import { Carousel, CarouselContent, CarouselItem} from './ui/carousel'

import { Progress } from '../../ui/progress'



export default function CarouselBlock({children}) {
    
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

    return (
    <>
        <Carousel 
            setApi={setApi} 
            opts={{
               dragThreshold: 20,
               dragFree: false,
               skipSnaps: ((typeof window !== "undefined") && (window.innerWidth > 768)) ? true : false
            }}
            className='mx-auto'
        >
            {children}
            
        </Carousel>
        
        <Progress value={(current/count) * 100} className="mt-3" />
    </>
    )
}

