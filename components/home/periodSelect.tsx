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

export function PeriodSelect({ children, param }: { children: React.ReactNode, param: string }) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentValue = searchParams.get(param) ?? undefined

  const [value, setValue] = useState(currentValue);

  const [isPending, startTransition] = React.useTransition()

  const handleSelect = React.useCallback((value: string | null) => {
    const params = new URLSearchParams(window.location.search)

    if ((value !== null) && (value.length > 0)) {
      setValue(value)
      params.set(param, value)
    } else {
      params.delete(param)
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [param, pathname, router])

  console.log(currentValue)
  console.log(value)

  return (
    <div>
      <div>
        <Select disabled={isPending} defaultValue={currentValue} value={value} onValueChange={handleSelect}>
          <SelectTrigger className="w-full custom-text-button">
            <SelectValue placeholder="Период" />
          </SelectTrigger>

          <SelectContent className="custom-text-button">

            {children}

          </SelectContent>

        </Select>
      </div>

      <div className=" mt-4">

      </div>
    </div>
  )
}
