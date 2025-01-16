import GubersServer from "@/components/allGubers/gubersServer"
import { GubersBreadcrumb } from "@/components/allGubers/gubersBreadcrumb"
import GubersFilter from "@/components/allGubers/GubersFilter"
import PeriodSelectServer from "@/components/home/periodSelectServer"
import { Suspense } from "react"
import PeriodScrollServer from "@/components/allGubers/PeriodScrollServer"

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Губернаторы Енисейской губернии",
    description: "Информация о военных губернаторах г. Красноярска и гражданских губернаторов Енисейской губернии с момента основания губернии в 1822 году и до революции",
  };

export default function AllGubers({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <div className="w-full h-full mt-6 md:mt-8 lg:mt-12">
            <div className="">
                <GubersBreadcrumb />
            </div>
            <h1 className="mt-6 md:mt-8 custom-text-section">
                ГУБЕРНАТОРЫ ЕНИСЕЙСКОЙ ГУБЕРНИИ
            </h1>
            <div className="mt-6 md:mt-8 lg:flex">
                <Suspense>
                    {/* Mobile */}
                    <GubersFilter paramPeriod="period">
                        <PeriodSelectServer />
                    </GubersFilter>

                    {/* Desktop */}
                    <PeriodScrollServer />
                    
                </Suspense>
                <GubersServer searchParams={searchParams} />
            </div>
        </div>
    )
}