import getGubersFiltered from "@/lib/queries/getGubersFiltered"
import GuberCard from "./guberCard"


export default async function GubersServer({ searchParams }: {searchParams: { [key: string]: string | string[] | undefined }}) {

    
    const period = searchParams["period"] as string | undefined
    const startsWith = searchParams["StartsWith"] as string | undefined
    
    const [dataResult] = await Promise.allSettled([
        getGubersFiltered({ period: period, startsWith: startsWith })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>Информация не найдена</h1>
        } else {
            return <h1>Ошибка обработки запроса</h1>
        }
    }

    return (
        <div className="w-full mt-4">
            {dataResult.value.map((guber) => (
                <div key={guber.id}>
                    <GuberCard
                        id={guber.id}
                        image={guber.attributes.img.data.attributes?.url}
                        name={guber.attributes.name}
                        description={guber.attributes.description}
                        service={guber.attributes.service}
                        rank={guber.attributes.rank}
                    />
                </div>
            ))}
        </div>
    )
}