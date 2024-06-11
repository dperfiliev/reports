import {
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"

import getSources from "@/lib/queries/getSources"

export default async function SourceSelectServer() {


    const [dataResult] = await Promise.allSettled([
        getSources({ pageSize: 999 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }

    return (
        <SelectGroup className="w-full">
            {
                dataResult.value.map((item) => (
                    <SelectItem className="text-left"
                        key={item?.id} value={item.attributes?.name}>{item.attributes?.name}</SelectItem>
                ))
            }
        </SelectGroup>
    )
}