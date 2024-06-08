import getReport from "@/lib/queries/getReport"
import AvailableReportsInfo from "@/components/availableReports/availableReportsInfo"

import { OneReportBreadcrumb } from "@/components/availableReports/oneReportsBreadcrumb"
import dynamic from "next/dynamic"
import { ClientHydration } from "@/components/ClientHydration"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import Script from "next/script"

import type { Metadata } from 'next'

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata | undefined> {
    const [dataResult] = await Promise.allSettled([
        getReport({ id: params?.id })
    ]);

    if (dataResult.status === "fulfilled") {
        const reportData = dataResult?.value;
        const reportTitle = reportData?.attributes?.title;

        return {
            title: reportTitle || ""
        };
    }

    return {
        title: "Ошибка",
        description: "Ошибка загрузки данных"
    };
}


const PDFViewer = dynamic(() => import('./pdfViewer'), { loading: () => <Loader2 className="mx-auto animate-spin w-8 h-8" />, ssr: false })

export default async function Report({ params }: { params: { id: string } }) {

    const [dataResult] = await Promise.allSettled([
        getReport({ id: params?.id })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1 className="custom-text-tiny">Информация не найдена</h1>
        } else {
            return <h1 className="custom-text-tiny">Ошибка обработки запроса</h1>
        }
    }

    return (
        <div className="w-full h-full mt-6 md:mt-8 lg:mt-12">
            <div>
                <OneReportBreadcrumb reportName={dataResult.value?.attributes?.title ?? "Неизвестно"} />
            </div>
            <h1 className="mt-4 md:mt-8 custom-text-section uppercase">
                {dataResult.value.attributes?.title}
            </h1>


            <Script src="/pdf.worker.min.js" />
            <Suspense fallback={<Loader2 className="mx-auto animate-spin w-8 h-8" />}>
                <ClientHydration fallback={<Loader2 className="mx-auto animate-spin w-8 h-8" />}>
                    <PDFViewer 
                    file={dataResult.value?.attributes?.file.data?.attributes.url} contents={dataResult.value.attributes?.contents} 
                    fileSecond={dataResult.value?.attributes?.fileSecond.data?.attributes.url} contentsSecond={dataResult.value.attributes?.contentsSecond}
                    />
                </ClientHydration>
            </Suspense>

            <div className="mt-8">
                <AvailableReportsInfo
                    pages={dataResult.value.attributes?.pages ?? 1}
                    textType={dataResult.value.attributes?.text_type?.data?.attributes?.name}
                    source={dataResult.value.attributes?.source?.data?.attributes?.name}
                    output={dataResult.value.attributes?.output}
                />
            </div>
        </div>
    )
}