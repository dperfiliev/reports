import getReportsCenturies from "@/lib/queries/getReportsCenturies"
import ReportCard from "@/components/home/reports/reportCard"

export default async function ReportsAvailableBuilder(){

    const [ dataResult ] = await Promise.allSettled([ 
        getReportsCenturies({ pageSize: 8 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>NOT_FOUND</h1>
        } else {
            return <h1>ОЩИБКА!!!!!!!!!!!!!!!!</h1>
        }
    }

    return(
        <div className="mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
            {dataResult.value.map((report) => (
                <div key={report.id}>
                    <ReportCard 
                    link={report.attributes.img?.data?.attributes?.url}
                    title={report.attributes.title} 
                    description={report.attributes.description}
                    />
                </div>
            ))}
        </div>
    )
}