import getReportsFiltered from "@/lib/queries/getReportsFiltered"
import ReportCard from "@/components/home/reports/reportCard"


export default async function AvailableReportsBuilder({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const source = searchParams["source"] as string | undefined
    const period = searchParams["period"] as string | undefined
    const textType = searchParams["textType"] as string | undefined

    const [dataResult] = await Promise.allSettled([
        getReportsFiltered({source, period, textType })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }

    return (
        <div 
            key={`source=${source}period=${period}textType=${textType}`} 
            className=" mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            {dataResult.value.map((report) => (
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
    )
}