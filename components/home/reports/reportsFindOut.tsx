import Image from "next/image"
import Link from "next/link"

export default function ReportsFindOut() {
    return (
        <div>
            <Link href="/availableReports" className="mt-6 md:mt-8 flex items-baseline cursor-pointer">
                <span className="text-blue font-bold custom-text-small">
                    Узнать больше
                </span>
                <Image src="/images/arrow.svg" alt="img" width={10} height={10} className="ml-2 w-2 h-2 sm:w-3 sm:h-3" />
            </Link>
        </div>
    )
}