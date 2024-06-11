import getPeriods from "@/lib/queries/getPeriods"
//import GubersPeriodsScroll from "./GubersPeriodsScroll"
import GubersPeriodClicks from "./GubersPeriodClicks"

export default async function PeriodScrollServer() {
    const [dataResult] = await Promise.allSettled([
        getPeriods({ pageSize: 999 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny hidden lg:block">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny hidden lg:block">Ошибка обработки запроса</h1>
        }
    }

    return (
        //<GubersPeriodsScroll periods={dataResult?.value} paramPeriod="period"/>
        <GubersPeriodClicks periods={dataResult?.value} paramPeriod="period"/>
    )
}
