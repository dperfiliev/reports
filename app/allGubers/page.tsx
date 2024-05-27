


import GubersServer from "@/components/allGubers/gubersServer"

import PeriodSelectServer from "@/components/home/periodSelectServer"

import { GubersBreadcrumb } from "@/components/allGubers/gubersBreadcrumb"
import InputGetData from "@/components/allGubers/GubersFilter"
import { Suspense } from "react"

export default function AllGubers( { searchParams }: {searchParams: { [key: string]: string | string[] | undefined }}) {


    return (
        <div className="w-full h-full mt-3 sm:mt-6 md:mt-8 lg:mt-10">
            <div className="">
            <GubersBreadcrumb />
            </div>
            <h1 className="mt-4 md:mt-8 custom-text-section">
                ГУБЕРНАТОРЫ ЕНИСЕЙСКОЙ ГУБЕРНИИ
            </h1>
            <div className="mt-4 md:mt-8">
                <div className="flex gap-3">

                <Suspense>
                    <InputGetData param="StartsWith" paramPeriod="period">
                        <PeriodSelectServer />
                    </InputGetData>
                </Suspense>
                    
                </div>

                <GubersServer searchParams={searchParams} />

            </div>
        </div>
    )
}