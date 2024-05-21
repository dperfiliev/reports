import Link from "next/link"
import Image from "next/image"

export default function LogoHolder(){
    return(
        <Link href="/">
            <div className="flex flex-shrink-0 items-center">
            <div className="w-8 md:w-10">
                <Image src="/images/logo.svg" alt="logo" width={50} height={50} priority={true}/>
            </div>
            <div className="ml-[8px] md:ml-[10px] mt-[6px] hidden md:grid md:visible">
                <span className="md:text-[10px] lg:text-xs font-bold font-upper">
                    ОТЧЁТЫ <br/>
                </span>
                <span className="md:text-[10px] lg:text-xs font-bold font-upper text-blue">
                    ГУБЕРНАТОРОВ
                </span>
            </div>
            </div>
        </Link>
    )
}