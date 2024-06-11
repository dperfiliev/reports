import Image from "next/image"
import Link from "next/link"

interface Props {
    id: string,
    image: string | undefined,
    name: string,
    //rank: string,
    //service: string,
    description: string,
}

export default function GuberCard({ id, image, name, description }: Props) {
    return (
        <div className="mb-5 cursor-pointer">
            <Link href={`/allGubers/guber/${id}`}>
                <div className="mb-5 w-full flex items-start">
                    <div className="relative flex-shrink-0 w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-56 xl:h-56">
                        <Image src={image ? image : "/images/none.jpg"} alt="img" fill sizes="30vw" className="mx-auto object-cover rounded-xl object-top" />
                    </div>
                    <div className="ml-5 flex flex-col">
                        {/*
                        <h1 className="font-bold custom-text-big text-balance">
                            {service}
                        </h1>
                        <h1 className="custom-text-big">
                            {rank}
                        </h1>
                        */}
                        <h1 className="mt-2 lg:mt-4 text-blue font-bold custom-text-big">
                            {name?.substring(0, name?.indexOf(" "))}
                        </h1>
                        <h1 className="text-blue font-bold custom-text-big">
                            {name?.substring(name?.indexOf(" "))}
                        </h1>
                        <p className="mt-2 lg:mt-4 custom-text-small text-pretty">
                            {description}
                        </p>
                    </div>

                </div>
                <div className="w-full h-[0.5px] md:h-px bg-blue">
                </div>
            </Link>
        </div>
    )
}