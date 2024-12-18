import {
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"

import getTextTypes from "@/lib/queries/getTextTypes"

export default async function TextTypeSelectServer() {


    const [dataResult] = await Promise.allSettled([
        getTextTypes({ pageSize: 300 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }

    return (
        <div>
            <SelectGroup>
                {
                    dataResult.value.map((item) => (
                        <SelectItem className=""
                            key={item?.id} value={item.attributes?.name}>{item.attributes?.name}</SelectItem>
                    ))
                }
            </SelectGroup>
        </div>
    )
}