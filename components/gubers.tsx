import CarouselBlock from "./carouselblock"
import FindOut from "./findout"

export default function Gubers(){
    return(
        <div className="mt-8 md:mt-16">
            <div className="mb-3">
                <h1 className="font-upper text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ГУБЕРНАТОРЫ ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
            </div>
            <CarouselBlock />
            <FindOut />
        </div>
    )
}