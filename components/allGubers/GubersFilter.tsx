'use client'

import { Input } from "@/components/ui/input"

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import React from "react";

import {
    Select,
    SelectContent,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function InputGetData({ children, param, paramPeriod }: { children: React.ReactNode, param: string, paramPeriod: string }) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentValue = searchParams.get(param) ?? ""

    const [value, setValue] = useState(currentValue);

    const [isPending, startTransition] = React.useTransition()

    const currentValuePeriod = searchParams.get(paramPeriod) ?? undefined

    const [valuePeriod, setValuePeriod] = useState(currentValuePeriod);

    const [isPendingPeriod, startTransitionPeriod] = React.useTransition()


    const handleClick = React.useCallback(() => {
        const params = new URLSearchParams(window.location.search)

        if ((value !== null) && (value.length > 0)) {
            params.set(param, value)
        } else {
            params.delete(param)
        }

        console.log(value)

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        })
    }, [param, pathname, router, value])


    const handleSelect = React.useCallback((valuePeriod: string | null) => {
        const params = new URLSearchParams(window.location.search)

        if ((valuePeriod !== null) && (valuePeriod.length > 0)) {
            setValuePeriod(valuePeriod)
            params.set(paramPeriod, valuePeriod)
        } else {
            params.delete(paramPeriod)
        }

        startTransitionPeriod(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        })
    }, [paramPeriod, pathname, router])


    const handleReset = useCallback(() => {
        setValue('')
        setValuePeriod('')

        const params = new URLSearchParams(window.location.search);
        params.delete(param);
        params.delete(paramPeriod);

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    }, [param, paramPeriod, pathname, router])


    return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full mb-4">
            <div className="flex items-center gap-3 w-full">
                <Input disabled={isPending} value={value} onChange={(e) => setValue(e.target.value)}
                    placeholder="Поиск по ФИО..." className="custom-text-button" />

                <Select disabled={isPendingPeriod} defaultValue={currentValuePeriod} value={valuePeriod} onValueChange={handleSelect}>
                    <SelectTrigger className="w-full md:w-1/5 custom-text-button">
                        <SelectValue placeholder='Период' />
                    </SelectTrigger>
                    <SelectContent className="custom-text-button">
                        {children}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-3 w-full md:w-fit">
                <Button onClick={handleClick}
                    className="bg-blue custom-text-button text-white hover:bg-white hover:text-blue w-full">
                    Найти
                </Button>

                <Button onClick={handleReset}
                    className="bg-red-500 custom-text-button text-white hover:bg-white hover:text-red-500 w-full">
                    Сбросить
                </Button>
            </div>
        </div>
    )
}