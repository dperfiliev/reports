import Link from "next/link"

export default function Footer(){
    return(
        <div className="relative mt-8 md:mt-16 mb-4 md:mb-8 flex items-center justify-between text-[8px] sm:text-xs md:text-sm">
            <div className="left-0 font-lower"> 
                <span>
                    Copyright © 
                        <Link href="/" className="text-blue">
                            Сибирский федеральный университет
                        </Link>
                    , 2024
                </span>
            </div>
            <div className="right-0 font-lower text-blue">
                <Link href="/">
                    pochta@sfu-kras.ru
                </Link>
            </div>
        </div>
    )
}