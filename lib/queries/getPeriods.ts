"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getPeriods() {
  const query = `
    query Periods {
        periods {
            data {
                id
                attributes {
                    value
                }
            }
        }
    }
  `
  const json = await fetchData<PeriodsArrayT>({
    query,
  })

  if (json.data.periods.data.length === 0) notFound()

  const sortedData = json.data.periods.data.sort((a, b) => {
    return parseInt(a.attributes.value) - parseInt(b.attributes.value)
  })

  return sortedData
}