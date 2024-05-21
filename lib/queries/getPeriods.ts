"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getPeriods({ 
    pageSize
}: { 
    pageSize?: number
}) {
    const query = `
    query Periods($pagination: PaginationArg) {
        periods(pagination: $pagination) {
          data {
            id
            attributes {
              value
            }
          }
          meta {
            pagination {
              total
            }
          }
        }
      }
    `
    const json = await fetchData<PeriodsArrayT>({
        query,
        variables: {
          pagination: {
            pageSize: pageSize
          }
        }
    })

    if (json.data.periods.meta.pagination.total === 0) notFound()

    return json.data.periods.data
}