import Image from "next/image"
import Link from "next/link"

interface Props {
    id: string,
    image: string | undefined,
    title: string | undefined,
    source: string | undefined
}

export default function ReportCard({ id, image, title, source }: Props) {

    return (
        <Link href={`/availableReports/report/${id}`}>
            <div className="flex flex-col justify-start gap-1 cursor-pointer h-full bg-back p-2 md:p-4 rounded-2xl shadow-neutral-300 shadow-md hover:shadow-neutral-400 transition-all">
                <div className="relative w-full h-44 md:h-64 lg:h-80">
                    <Image src={image ? image : "/images/no-report.jpg"} alt="img" fill sizes="30vw" className="mx-auto w-[100%] object-cover rounded-xl" />
                </div>
                <div className="">
                    <h1 className="mt-1 text-blue font-bold custom-text-big text-balance line-clamp-2">{title}</h1>
                    <p className="mt-1 custom-text-small line-clamp-2">{source}</p>
                </div>
            </div>
        </Link>
    )
}