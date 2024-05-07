import Image from "next/image"

interface Props{
    link: string,
    title: string,
    description: string
}

export default function ReportCard({link, title, description}: Props){
    return(
        <div className="cursor-pointer bg-white p-2 md:p-4 tem rounded-2xl shadow-gray-200 shadow-md hover:shadow-gray-400 transition-all">
            <div className="relative w-full  h-44 md:h-72">
                <Image src={link} alt="img" fill sizes="100vw" className="mx-auto w-[100%] object-cover rounded-xl"/>
            </div>
            <div>
                <h1 className="mt-2 text-blue text-[10px] sm:text-sm md:text-base font-upper">{title}</h1>
                <p className="mt-1 text-[8px] sm:text-xs md:text-sm font-lower">{description}</p>
            </div>
        </div>
    )
}