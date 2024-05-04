import Image from "next/image"


export default function LogoHolder(){
    return(
        <div className="flex flex-shrink-0 items-center">
            <div className="w-[30px] lg:w-[40px]">
                <Image src="/images/logo.svg" alt="logo" width={50} height={50} priority={true}/>
            </div>
            <div className="grid ml-[7px] lg:ml-[10px] mt-[6px]">
                <span className="text-[7px] lg:text-[10px] font-bold font-upper">
                    ОТЧЁТЫ <br/>
                </span>
                <span className="text-[7px] lg:text-[10px] font-bold font-upper text-blue">
                    ГУБЕРНАТОРОВ
                </span>
            </div>
        </div>
    )
}