


import { SourseSelect } from "@/components/availableReports/ReportsFilter"
import SourceSelectServer from "@/components/availableReports/sourceSelectServer"
import AvailableReportsBuilder from "@/components/availableReports/availableReportsBuilder"
import PeriodSelectServer from "@/components/home/periodSelectServer"
import TextTypeSelectServer from "@/components/availableReports/textTypeSelectServer"
import { ReportsBreadcrumb } from "@/components/availableReports/reportsBreadcrumb"

export default function AvailableReports({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

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

                    <SourseSelect
                        childrenSource={<SourceSelectServer />}
                        childrenPeriod={<PeriodSelectServer />}
                        childrenTextType={<TextTypeSelectServer />}
                        paramSource="source"
                        paramPeriod="period"
                        paramTextType="textType">
                    </SourseSelect>

                </div>

                <AvailableReportsBuilder searchParams={searchParams} />
            </div>

        </div>
    )
}