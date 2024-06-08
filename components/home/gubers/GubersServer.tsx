import getGubers from "@/lib/queries/getGubers"

import GuberCard from "./guberCard"



export default async function GubersServer() {
    const [dataResult] = await Promise.allSettled([
        getGubers({ pageSize: 8 })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }


    return (
        dataResult.value.map((guber) => (
            <div key={guber?.id} className="flex justify-center flex-shrink-0 lg:basis-1/4 md:basis-1/3 basis-1/2 snap-center">
                <div className="py-2 pr-4">
                    <GuberCard id={guber?.id}
                        name={guber.attributes?.name}
                        rank={guber.attributes?.rank}
                        image={guber.attributes?.img.data?.attributes?.url}
                        service={guber.attributes?.service} />
                </div>
            </div>
        ))
    )
}