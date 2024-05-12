import Image from "next/image"

export default function HelpProject(){
    return(
        <div className="mt-4 md:mt-8 flex items-center bg-white shadow-gray-200 shadow-md rounded-xl">
            <div className="absolute z-10">
                <div className="px-2 md:p-4">
                    <div>
                        <h1 className="font-bold font-upper text-base sm:text-lg md:text-xl lg:text-2xl">
                            ПОМОЧЬ ПРОЕКТУ
                        </h1>
                        <p className="py-4 font-lower text-[10px] sm:text-xs md:text-sm lg:text-base">
                            Работа по распознанию — многоэтапная и медленная. Один человек потратил бы на неё всю жизнь.
                            Проект нуждается в большой команде волонтёров, которые смогут расшифровать рукопись в первом приближении.
                        </p>
                    </div>
                    <button className="px-3 py-1 border-2 border-blue rounded-xl cursor-pointer">
                        <span className="font-upper text-[10px] sm:text-xs md:text-sm lg:text-base flex items-center">
                            Перейти к расшифровке 
                        </span>
                    </button>
                </div>
            </div>
            <div className="relative w-full h-44 md:h-56 z-0 overflow-hidden rounded-xl">
                <Image src="/images/bg-help.jpg" alt="" fill sizes="100vw" className="object-cover object-[0%_40%] scale-150 opacity-10"/>
            </div>
        </div>
    )
}