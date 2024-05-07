import ReportsContainer from "./reportscontainer"
import Image from "next/image"

export default function Reports(){
    return(
        <div className="mt-[25px] md:mt-[50px]">
            <div className="mb-[15px]">
                <h1 className="font-upper text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ПОСЛЕДНИЕ ОТЧЁТЫ 
                </h1>
            </div>
            <ReportsContainer />
            <div className="mt-3 sm:mt-4 md:mt-6 flex items-center">
                <span className="text-blue text-[10px] sm:text-sm">
                    Узнать больше
                </span>
                <Image src="/images/arrow.svg" alt="img" width={10} height={10} className="ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2"/>
            </div>
        </div>
    )
}