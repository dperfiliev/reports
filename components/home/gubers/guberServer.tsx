import getGubers from "@/lib/queries/getGubers"

import {CarouselContent, CarouselItem} from '../../ui/carousel'
import GuberCard from "./guberCard"



export default async function GuberServer(){
    const [ dataResult ] = await Promise.allSettled([ 
        getGubers({ pageSize: 8 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>NOT_FOUND</h1>
        } else {
            return <h1>ОЩИБКА!!!!!!!!!!!!!!!!</h1>
        }
    }

   
    return(
        <CarouselContent>
            {dataResult.value.map((guber)=>(

            <CarouselItem key={guber.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 my-2">
                
                    <GuberCard name={guber.attributes.name} description={guber.attributes.description} link={guber.attributes.img.data.attributes?.url} period={guber.attributes.period}/>
                    <div>
            </div>
            </CarouselItem>

            ))}
        </CarouselContent>
        
        
    )
}