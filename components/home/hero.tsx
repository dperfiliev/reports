import Image from "next/image"

export default function Hero(){
    return(
        <div className="h-full w-full mt-3 sm:mt-6 md:mt-8 lg:mt-10">
            <div className="w-full lg:w-4/5">
                <h1 className="font-upper text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-nowrap">
                    ОТЧЁТЫ ГУБЕРНАТОРОВ
                </h1>
                <h1 className="sm:mt-[10px] sm:mb-[25px] font-upper font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-blue text-nowrap">
                    ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
                <p className="font-lower text-xs sm:text-base md:text-lg lg:text-xl my-[10px] sm:my-[20px] leading-tight">
                    Отчёты военных губернаторов г. Красноярска и гражданских губернаторов
                    Енисейской губернии с момента основания губернии в 1822 году и до революции.
                </p>
            </div>
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px]">
                <Image src="/images/hero.jpg" alt="hero" fill sizes="100vw" className="rounded-xl object-cover"/>
            </div>
        </div>
    )
}