import Image from "next/image"

export default function FindOut(){
    return(
        <div className="mt-3 sm:mt-4 md:mt-6 flex items-center">
                <span className="text-blue text-[10px] sm:text-sm">
                    Узнать больше
                </span>
                <Image src="/images/arrow.svg" alt="img" width={10} height={10} className="ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2"/>
        </div>
    )
}