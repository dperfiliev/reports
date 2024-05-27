import getGubers from "@/lib/queries/getGubers"

import { CarouselContent, CarouselItem } from '../../ui/carousel'
import GuberCard from "./guberCard"



export default async function GuberServer() {
    const [dataResult] = await Promise.allSettled([
        getGubers({ pageSize: 8 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>Информация не найдена</h1>
        } else {
            return <h1>Ошибка обработки запроса</h1>
        }
    }


    return (
        <CarouselContent className="">
            {dataResult.value.map((guber) => (
                <CarouselItem key={guber.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 my-2">
                    <GuberCard id={guber.id}
                        name={guber.attributes.name}
                        rank={guber.attributes.rank}
                        image={guber.attributes.img.data.attributes?.url}
                        service={guber.attributes.service} />
                </CarouselItem>
            ))}
        </CarouselContent>
    )
}