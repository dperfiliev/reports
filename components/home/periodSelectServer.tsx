import {
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"

import getPeriods from "@/lib/queries/getPeriods"

export default async function PeriodSelectServer() {


    const [dataResult] = await Promise.allSettled([
        getPeriods()
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }

    const periodsWithAllOption = [
        { id: 'all', attributes: { value: "Все" } }, 
        ...dataResult.value
    ];

    return (
        <div>
            <SelectGroup>
                {
                    periodsWithAllOption.map((item) => (
                        <SelectItem className=""
                            key={item?.id} value={item.attributes?.value}>{item.attributes?.value}</SelectItem>
                    ))
                }
            </SelectGroup>
        </div>
    )
}