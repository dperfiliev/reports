import getReport from "@/lib/queries/getReport"
import AvailableReportsInfo from "@/components/availableReports/availableReportsInfo"

import { OneReportBreadcrumb } from "@/components/availableReports/oneReportsBreadcrumb"
import dynamic from "next/dynamic"
import { ClientHydration } from "@/components/ClientHydration"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import Script from "next/script"

const PDFViewer = dynamic(() => import('./pdfViewer'), {loading: () => <p>Loading...</p>, ssr: false})

export default async function Report({ params }: { params: { id: string } }) {

    const [dataResult] = await Promise.allSettled([
        getReport({ id: params.id })
    ])

    if (dataResult.status === "rejected") {
        if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
            return <h1>Информация не найдена</h1>
        } else {
            return <h1>Ошибка обработки запроса</h1>
        }
    }

    return (
        <div className="w-full h-full mt-3 sm:mt-6 md:mt-8 lg:mt-10">
            <div>
                <OneReportBreadcrumb reportName={dataResult.value?.attributes?.title}/>
            </div>
            <h1 className="mt-4 md:mt-8 custom-text-section">
                {dataResult.value.attributes?.title}
            </h1>

            <Script src="/pdf.worker.min.js" />
            <Suspense fallback={<Loader2 className="animate-spin w-8 h-8" />}>
                <ClientHydration fallback={<Loader2 className="animate-spin w-8 h-8" />}>
                    <PDFViewer file={dataResult.value.attributes.file.data.attributes.url} contents={dataResult.value.attributes.contents} />
                </ClientHydration>
            </Suspense>

            <div className="mt-4 md:mt-8 flex">
            </div>
            <div className="mt-8 md:mt-14">
                <AvailableReportsInfo
                    pages={dataResult.value.attributes?.pages}
                    textType={dataResult.value.attributes?.text_type?.data?.attributes?.name}
                    source={dataResult.value.attributes?.source?.data?.attributes?.name}
                    output={dataResult.value.attributes?.output}
                />
            </div>
        </div>
    )
}