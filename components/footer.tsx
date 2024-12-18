import Link from "next/link"

export default function Footer(){
    return(
        <div className="relative mt-8 md:mt-16 mb-3 md:mb-6 flex items-center justify-between custom-text-small"> {/* container mx-auto px-4 md:px-12 */}
            <div className="left-0 font-lower"> 
                <span>
                    Copyright © 
                        <Link href="https://www.sfu-kras.ru/" className="text-blue">
                            Сибирский федеральный университет
                        </Link>
                    , 2024
                </span>
            </div>
            <div className="right-0 font-lower text-blue">
                <Link href="mailto:info@sfu-kras.ru">
                    info@sfu-kras.ru
                </Link>
            </div>
        </div>
    )
}