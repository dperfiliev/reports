'use client'

import * as React from "react"
import { useState } from "react";
import {
  Select,
  SelectContent,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

export function SourseSelect({
  childrenSource,
  childrenPeriod,
  childrenTextType,
  paramSource,
  paramPeriod,
  paramTextType
}: {
  childrenSource: React.ReactNode,
  childrenPeriod: React.ReactNode,
  childrenTextType: React.ReactNode,
  paramSource: string
  paramPeriod: string
  paramTextType: string
}) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentValueSource = searchParams.get(paramSource) ?? undefined

  const [valueSource, setValueSource] = useState(currentValueSource);

  const [isPendingSource, startTransitionSource] = React.useTransition()

  const currentValuePeriod = searchParams.get(paramPeriod) ?? undefined

  const [valuePeriod, setValuePeriod] = useState(currentValuePeriod);

  const [isPendingPeriod, startTransitionPeriod] = React.useTransition()

  const currentValueTextType = searchParams.get(paramTextType) ?? undefined

  const [valueTextType, setValueTextType] = useState(currentValueTextType);

  const [isPendingTextType, startTransitionTextType] = React.useTransition()

  const handleSelectSource = React.useCallback((valueSource: string | null) => {
    const params = new URLSearchParams(window.location.search)

    if ((valueSource !== null) && (valueSource.length > 0)) {
      setValueSource(valueSource)
      params.set(paramSource, valueSource)
    } else {
      params.delete(paramSource)
    }

    startTransitionSource(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [paramSource, pathname, router])

  const handleSelectPeriod = React.useCallback((valuePeriod: string | null) => {
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

  const handleSelectTextType = React.useCallback((valueTextType: string | null) => {
    const params = new URLSearchParams(window.location.search)

    if ((valueTextType !== null) && (valueTextType.length > 0)) {
      setValueTextType(valueTextType)
      params.set(paramTextType, valueTextType)
    } else {
      params.delete(paramTextType)
    }

    startTransitionTextType(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [paramTextType, pathname, router])


  const handleReset = React.useCallback(() => {
    setValueSource('')
    setValuePeriod('');
    setValueTextType('');
    const params = new URLSearchParams(window.location.search);
    params.delete(paramSource);
    params.delete(paramPeriod);
    params.delete(paramTextType);

    React.startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      router.refresh()
    });
  }, [paramSource, paramPeriod, paramTextType, pathname, router]);
  // if (isPending) return "...Loading"

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full mb-4">
      <div className="flex items-center gap-3 w-full">
        <Select disabled={isPendingSource} defaultValue={currentValueSource} value={valueSource} onValueChange={handleSelectSource}>
          <SelectTrigger className="w-full custom-text-button" >
            <SelectValue placeholder="Источник" className="custom-text-button" />
          </SelectTrigger>

          <SelectContent className="custom-text-button">
            {childrenSource}
          </SelectContent>
        </Select>

        <Select disabled={isPendingPeriod} defaultValue={currentValuePeriod} value={valuePeriod} onValueChange={handleSelectPeriod}>
          <SelectTrigger className="w-full custom-text-button">
            <SelectValue placeholder="Период" />
          </SelectTrigger>

          <SelectContent className="custom-text-button">
            {childrenPeriod}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 w-full">
        <Select disabled={isPendingTextType} defaultValue={currentValueTextType} value={valueTextType} onValueChange={handleSelectTextType}>
          <SelectTrigger className="w-full custom-text-button">
            <SelectValue placeholder="Тип текста" />
          </SelectTrigger>

          <SelectContent className="custom-text-button">
            {childrenTextType}
          </SelectContent>
        </Select>

        <Button onClick={handleReset}
          className="bg-red-500 custom-text-button text-white hover:bg-white hover:text-red-500">
          Сбросить
        </Button>
      </div>

    </div>
  )
}
