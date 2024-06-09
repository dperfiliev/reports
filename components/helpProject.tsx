import Image from "next/image"
import Link from "next/link"

export default function HelpProject() {
    return (
        <div className="relative mt-6 md:mt-8 flex items-center bg-white shadow-gray-200 shadow-md rounded-xl">
            <div className="absolute z-10">
                <div className="px-2 md:p-4">
                    <div>
                        <h1 className="font-bold font-upper text-base sm:text-lg md:text-xl lg:text-2xl">
                            ПОМОЧЬ ПРОЕКТУ
                        </h1>
                        <p className="py-4 custom-text-norm">
                            Работа по распознанию — многоэтапная и медленная. Один человек потратил бы на неё всю жизнь.
                            Проект нуждается в большой команде волонтёров, которые смогут расшифровать рукопись в первом приближении.
                        </p>
                    </div>
                    <Link href="https://fromthepage.sfu-kras.ru/lib/governors-reports">
                        <button className="px-3 py-1 border border-gray-400 rounded-full cursor-pointer hover:shadow-md transition-all">
                            <span className="custom-text-small flex items-center">
                                Перейти к расшифровке
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="relative w-full h-64 sm:h-52 md:h-60 z-0 overflow-hidden rounded-xl">
                <Image src="/images/bg-help.jpg" alt="" fill sizes="100vw" className="object-cover object-[0%_40%] scale-150 opacity-10" />
            </div>
        </div>
    )
}