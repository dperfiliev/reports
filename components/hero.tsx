import Image from "next/image"

export default function Hero(){
    return(
        <div className="h-full w-full">
            <div className="mt-[25px] sm:mt-[40px] md:mt-[60px] w-full lg:w-4/5">
                <h1 className="font-upper text-[24px] sm:text-[48px] md:text-[54px] leading-none text-nowrap">
                    ОТЧЁТЫ ГУБЕРНАТОРОВ
                </h1>
                <h1 className="font-upper font-bold text-[24px] sm:text-[48px] md:text-[54px] text-blue text-nowrap">
                    ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
                <p className="font-lower text-[10px] sm:text-[16px] md:text-[20px] my-[10px] sm:my-[20px] leading-tight">
                Отчёты военных губернаторов г. Красноярска и гражданских губернаторов
                 Енисейской губернии с момента основания губернии в 1822 году и до революции.
                </p>
            </div>
            <div className="">
                <Image src="/images/hero.jpg" alt="hero" width={1700} height={700} className="h-[150px] w-full md:h-[300px] rounded bg-cover"/>
            </div>
        </div>
    )
}