import {
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"

import getSources from "@/lib/queries/getSources"

export default async function SourceSelectServer() {


    const [dataResult] = await Promise.allSettled([
        getSources({ })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>Информация не найдена</h1>
        } else {
            return <h1>Ошибка обработки запроса</h1>
        }
    }

    return (
        <div>
            <SelectGroup>
                {
                    dataResult.value.map((item) => (
                        <SelectItem className=""
                            key={item.id} value={item.attributes.name}>{item.attributes.name}</SelectItem>
                    ))
                }
            </SelectGroup>
        </div>
    )
}