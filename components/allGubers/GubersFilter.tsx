'use client'


import React from "react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    Select,
    SelectContent,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function GubersFilter({ children, paramPeriod }: { children: React.ReactNode, paramPeriod: string }) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentValuePeriod = searchParams.get(paramPeriod) ?? undefined

    const [valuePeriod, setValuePeriod] = useState(currentValuePeriod);

    const [isPendingPeriod, startTransitionPeriod] = React.useTransition()


    const handleSelect = React.useCallback((valuePeriod: string | null) => {
        const params = new URLSearchParams(window.location.search)

        if ((valuePeriod !== null) && (valuePeriod?.length > 0)) {
            setValuePeriod(valuePeriod)
            params.set(paramPeriod, valuePeriod)
        } else {
            params.delete(paramPeriod)
        }

        startTransitionPeriod(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        })
    }, [paramPeriod, pathname, router])


    return (
        <div className="w-fit mb-6 block lg:hidden">
            <Select disabled={isPendingPeriod} defaultValue={currentValuePeriod} value={valuePeriod} onValueChange={handleSelect}>
                <SelectTrigger className="w-full custom-text-button">
                    <SelectValue placeholder='Период' />
                </SelectTrigger>
                <SelectContent className="custom-text-button"
                    ref={(ref) => {
                        if (!ref) return;
                        ref.ontouchstart = (e) => {
                            e.preventDefault();
                        }
                    }}>
                    {children}
                </SelectContent>
            </Select>

        </div>
    )
}