
import ReportCard from "../home/reports/reportCard"

import getGuberAndReports from "@/lib/queries/getGuberAndReports"

export default async function GubersAndReports({guberId}: {guberId: string}) {

    const [dataResult] = await Promise.allSettled([
        getGuberAndReports({ pageSize: 300, guberId : guberId })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация по отчётам губернатора не найдена.</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }


    return (
        <div className="mt-8 md:mt-16">
            <div className="mb-2 md:mb-4">
                <h1 className="custom-text-section">
                    ОТЧЁТЫ ГУБЕРНАТОРА
                </h1>
            </div>

            <div className="mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {dataResult?.value.map((report) => (
                    <div key={report?.id}>
                        <ReportCard
                            id={report?.id}
                            image={report.attributes?.img?.data?.attributes?.url}
                            title={report.attributes?.title}
                            source={report.attributes?.source?.data?.attributes?.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}