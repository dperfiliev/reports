import Image from "next/image"
import Link from "next/link"

interface Props {
    id: string,
    image: string | undefined,
    title: string,
    source: string
}

export default function ReportCard({ id, image, title, source }: Props) {
    const cutSource = source.length > 30 ? source.substring(0, 30) + "..." : source

    return (
        <Link href={`/availableReports/report/${id}`}>
            <div className="flex flex-col justify-start gap-1 cursor-pointer h-full bg-white p-2 md:p-4 rounded-2xl shadow-gray-200 shadow-md hover:shadow-gray-400 transition-all">
                <div className="relative w-full \ h-44 md:h-56 lg:h-72">
                    <Image src={image ? image : "/images/img1.jpg"} alt="img" fill sizes="100vw" className="mx-auto w-[100%] object-cover rounded-xl" />
                </div>
                <div className="">
                    <h1 className="mt-1 text-blue font-bold custom-text-big">{title}</h1>
                    <p className="mt-1 custom-text-small">{cutSource}</p>
                </div>
            </div>
        </Link>
    )
}