import { ReportsFilter } from "@/components/availableReports/ReportsFilter"
import SourceSelectServer from "@/components/availableReports/sourceSelectServer"
import AvailableReportsBuilder from "@/components/availableReports/availableReportsBuilder"
import PeriodSelectServer from "@/components/home/periodSelectServer"
import TextTypeSelectServer from "@/components/availableReports/textTypeSelectServer"
import { ReportsBreadcrumb } from "@/components/availableReports/reportsBreadcrumb"
import { Suspense } from "react"
import { Loader2 } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Доступные отчёты",
    description: "Доступные отчёты военных губернаторов г. Красноярска и гражданских губернаторов Енисейской губернии с момента основания губернии в 1822 году и до революции",
  };

export default function AvailableReports({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const source = searchParams["source"] as string | undefined
    const period = searchParams["period"] as string | undefined
    const textType = searchParams["textType"] as string | undefined

    return (
        <div className="h-full w-full mt-6 md:mt-8 lg:mt-12">
            <div>
                <div>
                    <ReportsBreadcrumb />
                </div>

                <h1 className="mt-6 md:mt-8 custom-text-section">
                    ДОСТУПНЫЕ ОТЧЁТЫ
                </h1>

                <div className="mt-6 md:mt-8 flex space-x-2">

                    <Suspense>
                        <ReportsFilter
                            childrenSource={<SourceSelectServer />}
                            childrenPeriod={<PeriodSelectServer />}
                            childrenTextType={
                                <Suspense>
                                    <TextTypeSelectServer />
                                </Suspense>
                            }
                            paramSource="source"
                            paramPeriod="period"
                            paramTextType="textType">
                        </ReportsFilter>
                    </Suspense >

                </div>
                <Suspense key={`source=${source} period=${period} textType=${textType}`} fallback={<Loader2 className="mx-auto animate-spin w-6 h-8" />}>
                    <AvailableReportsBuilder searchParams={searchParams} />
                </Suspense>
            </div>

        </div>
    )
}