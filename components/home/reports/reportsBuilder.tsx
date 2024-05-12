import FindOut from "../findout"
import ReportCard from "./reportCard"
import HelpProject from "../../helpProject"

import getReports from "@/lib/queries/getReports"

export default async function Reports() {

    const [ dataResult ] = await Promise.allSettled([ 
        getReports({ pageSize: 8 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>NOT_FOUND</h1>
        } else {
            return <h1>ОЩИБКА!!!!!!!!!!!!!!!!</h1>
        }
    }

    
    return(
        <div className="mt-8 md:mt-16">
            <div className="mb-2 md:mb-4">
                <h1 className="font-upper text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ПОСЛЕДНИЕ ОТЧЁТЫ 
                </h1>
            </div>
            
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
            <HelpProject />
            <FindOut />
        </div>
    )
}