import Image from "next/image"

interface Props{
    link: string | undefined,
    title: string,
    description: string
}


export default function ReportCard({link, title, description}: Props){

    let imageUrl = "";

    if (link != undefined) {
        imageUrl = "http://127.0.0.1:1337" + link
    }
    else{
        imageUrl = "/images/img1.jpg"
    }
    const cutDescription = description.length > 40 ? description.substring(0, 40) + "..." : description

    return(
        <div className="flex flex-col justify-start gap-1 cursor-pointer h-full bg-white p-2 md:p-4 rounded-2xl shadow-gray-200 shadow-md hover:shadow-gray-400 transition-all">
            <div className="relative w-full  h-44 md:h-56 lg:h-72">
                <Image src={imageUrl} alt="img" fill sizes="100vw" className="mx-auto w-[100%] object-cover rounded-xl"/>
            </div>
            <div className="">
                <h1 className="mt-1 text-blue font-bold font-upper text-xs sm:text-sm md:text-base lg:text-lg">{title}</h1>
                <p className="mt-1 font-lower text-[10px] sm:text-xs md:text-sm lg:text-base">{cutDescription}</p>
            </div>
        </div>
    )
}