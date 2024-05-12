import Image from "next/image"

interface Props{
    link: string | undefined,
    name: string,
    description: string,
    period: string
}

export default function GuberCard({link, name, description, period}: Props){

    let imageUrl = "";

    if (link != undefined) {
        imageUrl = "http://127.0.0.1:1337" + link
    }
    else{
        imageUrl = "/images/img1.jpg"
    }

    const cutDescription = description.length > 40 ? description.substring(0, 30) + "..." : description

    return(
        <div className="flex flex-col justify-end gap-3 cursor-pointer h-full bg-white p-2 md:p-4 rounded-2xl shadow-gray-200 shadow-md hover:shadow-gray-400 transition-all">
            <h1 className="font-bold font-upper text-[10px] sm:text-xs md:text-sm lg:text-base">{period}</h1>
            <div className="relative w-full h-28 md:h-36 lg:h-44">
                <Image src={imageUrl} alt="img" fill sizes="100vw" className="mx-auto w-[100%] object-cover rounded-xl"/>
            </div>
            <div>
                <h1 className="text-blue font-bold font-upper text-xs sm:text-sm md:text-base lg:text-lg">{name.substring(0, name.indexOf(" "))} <br/> {name.substring(name.indexOf(" "))} </h1>
                <p className="mt-2 font-lower text-[10px] sm:text-xs md:text-sm lg:text-base">{cutDescription}</p>
            </div>
        </div>
    )
}