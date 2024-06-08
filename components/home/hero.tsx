import Image from "next/image"

export default function Hero() {
    return (
        <div className="h-full w-full mt-6 md:mt-8 lg:mt-12">
            <div className="w-full lg:w-4/5">
                <h1 className="custom-text-huge text-nowrap">
                    ОТЧЁТЫ ГУБЕРНАТОРОВ
                </h1>
                <h1 className="sm:mt-[10px] sm:mb-[25px] font-bold text-blue custom-text-huge text-nowrap">
                    ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
                <p className="font-lower custom-text-norm my-3 sm:my-5 leading-tight">
                    Отчёты военных губернаторов г. Красноярска и гражданских губернаторов
                    Енисейской губернии с момента основания губернии в 1822 году и до революции.
                </p>
            </div>
            <div className="relative w-full h-44 sm:h-80 md:h-[350px]">
                <Image src="/images/hero.jpg" alt="hero" fill sizes="100vw" className="rounded-xl object-cover" />
            </div>
        </div>
    )
}