"use client"

import React, { useEffect, useState } from 'react'
import type { CarouselApi } from './ui/carousel'
import { Carousel, CarouselContent, CarouselItem} from './ui/carousel'
//import { CarouselNext, CarouselPrevious} from './ui/carousel'
import GuberCard from './gubercard'
import { Progress } from './ui/progress'

const cards = [
    {
        link: "/images/img1.jpg",
        title: "Отчет губернатора за 1823 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img2.jpg",
        title: "Отчет губернатора за 1828 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img3.jpg",
        title: "Отчет губернатора за 1851 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img4.jpg",
        title: "Отчет губернатора за 1852 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img5.jpg",
        title: "Отчет губернатора за 1823 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img1.jpg",
        title: "Отчет губернатора за 1823 г.",
        description: "Российский государственный исторический архив"
    },
    {
        link: "/images/img2.jpg",
        title: "Отчет губернатора за 1828 г.",
        description: "Российский государственный исторический архив"
    },
]


export default function CarouselBlock() {
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
               //dragFree: true
               skipSnaps: true
            }}
            className='mx-auto'
        >
            <CarouselContent>
                {cards.map((item, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div>
                        <GuberCard  link={item.link} title={item.title} description={item.description}>
                        </GuberCard>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
        {/*
        <CarouselPrevious />
        <CarouselNext />
            */}

        </Carousel>

        <Progress value={(current/count) * 100} className="mt-3" />

        <h2>
            {(current/count) * 100}
        </h2>
    </>
    )
}