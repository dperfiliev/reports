import Image from "next/image"
import Link from "next/link"

interface Props {
    id: string,
    image: string | undefined,
    name: string,
    rank: string,
    service: string,
}

export default function GuberCard({ id, image, name, rank, service }: Props) {
    return (
        <Link href={`/allGubers/guber/${id}`}>
            <div className="flex flex-col justify-top gap-3 cursor-pointer h-full bg-white p-2 md:p-4 rounded-2xl shadow-gray-200 shadow-md hover:shadow-gray-400 transition-all">
                <h1 className="font-bold custom-text-big line-clamp-3">{service}</h1>
                <div className="relative w-full h-28 md:h-36 lg:h-44">
                    <Image src={image ? image : "/images/none.jpg"} alt="img" fill sizes="30vw" className="mx-auto w-[100%] object-cover rounded-xl" />
                </div>
                <div>
                    <h1 className="text-blue font-bold custom-text-big">{name?.substring(0, name?.indexOf(" "))} </h1>
                    <h1 className="text-blue font-bold custom-text-big line-clamp-1">{name?.substring(name?.indexOf(" "))}</h1>
                    <p className="mt-2 custom-text-small line-clamp-2">{rank}</p>
                </div>
            </div>
        </Link>
    )
}