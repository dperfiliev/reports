import getGuber from "@/lib/queries/getGuber"
import Image from "next/image"
import GubersAndReports from "@/components/allGubers/GuberAndReports"
import { OneGuberBreadcrumb } from "@/components/allGubers/oneGuberBreadcrumb"

import type { Metadata } from 'next'


export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata | undefined> {
    const [dataResult] = await Promise.allSettled([
        getGuber({ id: params?.id })
    ]);

    if (dataResult.status === "fulfilled") {
        const guberData = dataResult?.value;
        const guberName = guberData?.attributes?.name;
        const guberDescription = guberData?.attributes?.description;

        return {
            title: guberName || "",
            description: guberDescription || ""
        };
    }

    return {
        title: "Ошибка",
        description: "Ошибка загрузки данных"
    };
}

export default async function Guber({ params }: { params: { id: string } }) {

    const [dataResult] = await Promise.allSettled([
        getGuber({ id: params?.id })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }

    const imageUrl = dataResult.value?.attributes?.img.data?.attributes?.url
    const guberName = dataResult.value?.attributes?.name

    return (
        <div className="w-full h-full mt-6 md:mt-8 lg:mt-12">

            <div>
                <div className="">
                    <OneGuberBreadcrumb guberName={guberName} />
                </div>
                <h1 className="mt-4 md:mt-8 custom-text-section uppercase">
                    {dataResult.value.attributes?.name}
                </h1>
                <div className="mt-4 md:mt-8 flex items-end md:items-start">
                    <div className="relative flex-shrink-0 w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48">
                        <Image
                            src={imageUrl ? imageUrl : "/images/img1.jpg"}
                            alt="img"
                            fill
                            sizes="100vw"
                            className="mx-auto object-cover rounded-xl"
                        />
                    </div>
                    <div className="ml-4 md:ml-8">
                        <h1 className="font-bold custom-text-big text-balance">
                            {dataResult.value.attributes?.service}
                        </h1>
                        <h1 className="custom-text-big">
                            {dataResult.value.attributes?.rank}
                        </h1>
                        <p className="mt-4 custom-text-small text-justify hidden md:block">
                            {dataResult.value.attributes?.description}
                        </p>
                    </div>

                </div>
                <p className="mt-4 custom-text-small text-justify md:hidden">
                    {dataResult.value.attributes?.description}
                </p>

                <div className="mt-4 md:mt-8">


                    {dataResult.value.attributes?.histories.map((history, id) => (
                        <div key={id} className="flex items-baseline mb-4 text-justify">
                            <h1 className="custom-text-big font-bold">
                                {history?.year}
                            </h1>
                            <article className="ml-5 custom-text-small">
                                {history?.text}
                            </article>
                        </div>
                    ))}


                </div>
            </div>


            <GubersAndReports guberId={params?.id} />
        </div>
    )
}