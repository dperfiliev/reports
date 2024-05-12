import getGubers from "@/lib/queries/getGubers"
import CarouselBlock from "./carouselBlock"
import FindOut from "../findout"
import GuberServer from "./guberServer"


export default async function Gubers(){

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
        <div className="mt-8 md:mt-16">
            <div className="mb-3">
                <h1 className="font-upper text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ГУБЕРНАТОРЫ ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
            </div>
           
                <CarouselBlock>
                    <GuberServer />
                </CarouselBlock>
                
           

            <FindOut />
        </div>
    )
}
