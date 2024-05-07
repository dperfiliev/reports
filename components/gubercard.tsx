import Image from "next/image"

interface Props{
    link: string,
    title: string,
    description: string
}

export default function GuberCard({link, title, description}: Props){
    return(
        <div className="bg-gray-400 my-[20px] p-[20px] rounded-2xl shadow-xl hover:shadow-gray-900 transition-all grid place-items-center">
            <div className="relative w-56 h-64">
                <Image src={link} alt="img" fill sizes="100vw" className="mx-auto w-[100%] mb-3 object-cover rounded-xl"/>
            </div>
            <div>
                <h1 className="text-blue mb-2 text-base font-upper">{title}</h1>
                <p className="text-xs font-lower">{description}</p>
            </div>
        </div>
    )
}