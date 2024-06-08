'use client'

import React from "react"
import { useState } from "react";
import {
  Select,
  SelectContent,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import Image from "next/image";

export function ReportsFilter({
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

    if ((valueSource !== null) && (valueSource?.length > 0)) {
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

  const handleSelectTextType = React.useCallback((valueTextType: string | null) => {
    const params = new URLSearchParams(window.location.search)

    if ((valueTextType !== null) && (valueTextType?.length > 0)) {
      setValueTextType(valueTextType)
      params.set(paramTextType, valueTextType)
    } else {
      params.delete(paramTextType)
    }

    startTransitionTextType(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [paramTextType, pathname, router])


  const handleSourceReset = React.useCallback(() => {
    setValueSource('')
    const params = new URLSearchParams(window.location.search);
    params.delete(paramSource);

    React.startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      router.refresh()
    });
  }, [paramSource, pathname, router])

  const handlePeriodReset = React.useCallback(() => {
    setValuePeriod('');
    const params = new URLSearchParams(window.location.search);
    params.delete(paramPeriod);

    React.startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      router.refresh()
    });
  }, [paramPeriod, pathname, router])

  const handleTextTypeReset = React.useCallback(() => {
    setValueTextType('')
    const params = new URLSearchParams(window.location.search);
    params.delete(paramTextType);

    React.startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      router.refresh()
    });
  }, [paramTextType, pathname, router])

  // if (isPending) return "...Loading"

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-10 w-full">
        <Select disabled={isPendingSource} defaultValue={currentValueSource} value={valueSource} onValueChange={handleSelectSource}>
          <SelectTrigger className="w-fit custom-text-button text-left">
            <SelectValue placeholder="Источник" className="custom-text-button text-left">
            <p>
              Источник
            </p>
          
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="custom-text-button" classNamePrimitive="w-72">
            {childrenSource}
          </SelectContent>
        </Select>

        <Select disabled={isPendingPeriod} defaultValue={currentValuePeriod} value={valuePeriod} onValueChange={handleSelectPeriod}>
          <SelectTrigger className="w-fit custom-text-button">
            <SelectValue placeholder="Период" >
            <p>
              Период
            </p>
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="custom-text-button">
            {childrenPeriod}
          </SelectContent>
        </Select>

        <Select disabled={isPendingTextType} defaultValue={currentValueTextType} value={valueTextType} onValueChange={handleSelectTextType}>
          <SelectTrigger className="w-fit custom-text-button">
            <SelectValue placeholder="Тип текста" >
            <p>
            Тип текста
            </p>
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="custom-text-button">
            {childrenTextType}
          </SelectContent>
        </Select>
      </div>



      <div className="flex flex-col lg:flex-row">

        <div className={valueSource === undefined || valueSource === "" ? "hidden" : "block mt-4 mr-2"}>
          <div className="flex items-center justify-center w-72 sm:w-fit border border-gray-400 rounded-full py-1 px-2 hover:shadow-md transition-all">
            <p className="custom-text-small ml-2 text-nowrap overflow-hidden">
              {valueSource}
            </p>
            <Button className="relative h-4" onClick={handleSourceReset}>
              <Image src="/images/cancel.svg" alt="" fill sizes="10vw" className="opacity-60" />
            </Button>
          </div>
        </div>

        <div className="flex">
        <div className={valuePeriod === undefined || valuePeriod === "" ? "hidden" : "block mt-4 mr-2"}>
          <div className="flex items-center justify-center w-fit border border-gray-400 rounded-full py-1 px-2 hover:shadow-md transition-all">
            <p className="custom-text-small ml-2">
              {valuePeriod}
            </p>
            <Button className="relative h-4" onClick={handlePeriodReset}>
              <Image src="/images/cancel.svg" alt="" fill sizes="10vw" className="opacity-60" />
            </Button>
          </div>
        </div>

        <div className={valueTextType === undefined || valueTextType === "" ? "hidden" : "block mt-4"}>
          <div className="flex items-center justify-center w-fit border border-gray-400 rounded-full py-1 px-2 hover:shadow-md transition-all">
            <p className="custom-text-small ml-2">
              {valueTextType}
            </p>
            <Button className="relative h-4" onClick={handleTextTypeReset}>
              <Image src="/images/cancel.svg" alt="" fill sizes="10vw" className="opacity-60" />
            </Button>
          </div>
        </div>
        </div>

      </div>
    </div>
  )
}
