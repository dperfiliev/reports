import getReportsCenturies from "@/lib/queries/getReportsCenturies"

import ReportsBuilder from "@/components/availableReportsComponents/reportsAvailableBuilder"

import SelectCentury from "@/components/availableReportsComponents/selectCentury"




export default async function AvailableReports(){

    const [ dataResult ] = await Promise.allSettled([ 
        getReportsCenturies({ pageSize: 8, century: 19 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>NOT_FOUND</h1>
        } else {
            return <h1>ОЩИБКА!!!!!!!!!!!!!!!!</h1>
        }
    }

    return(
        <div className="mt-3 sm:mt-6 md:mt-8 lg:mt-10">
            <div>
                <p>
                Главная Отчеты
                </p>
                <h1 className="font-upper text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ДОСТУПНЫЕ ОТЧЁТЫ
                </h1>
                <div>

                <SelectCentury/>

                </div>
            </div>
            <div className="">


            <ReportsBuilder />

            </div>
        </div>
    )
}