


import { SourseSelect } from "@/components/availableReports/ReportsFilter"
import SourceSelectServer from "@/components/availableReports/sourceSelectServer"
import AvailableReportsBuilder from "@/components/availableReports/availableReportsBuilder"
import PeriodSelectServer from "@/components/home/periodSelectServer"
import TextTypeSelectServer from "@/components/availableReports/textTypeSelectServer"
import { ReportsBreadcrumb } from "@/components/availableReports/reportsBreadcrumb"
import { Suspense } from "react"

export default function AvailableReports({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const source = searchParams["source"] as string | undefined
    const period = searchParams["period"] as string | undefined
    const textType = searchParams["textType"] as string | undefined

    return (
        <div className="h-full w-full mt-3 sm:mt-6 md:mt-8 lg:mt-10">
            <div>
                <div>
                    <ReportsBreadcrumb />
                </div>

                <h1 className="mt-4 md:mt-8 custom-text-section">
                    ДОСТУПНЫЕ ОТЧЁТЫ
                </h1>

                <div className="mt-4 md:mt-8 flex space-x-2">

                    <Suspense>
                        <SourseSelect
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
                        </SourseSelect>
                    </Suspense>

                </div>
                <Suspense key={`source=${source}period=${period}textType=${textType}`} fallback={"...Loading"}>
                    <AvailableReportsBuilder searchParams={searchParams} />
                </Suspense>
            </div>

        </div>
    )
}