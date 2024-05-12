"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getCenturies({ 
    pageSize 
}: { 
    pageSize?: number
}) {
    const query = `
    query Centuries($pagination: PaginationArg) {
        centuries(pagination: $pagination) {
          data {
            id
            attributes {
              century
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
    const json = await fetchData<CenturiesArrayT>({
        query,
        variables: {
          pagination: {
            pageSize: pageSize
          }
        }
    })

    if (json.data.centuries.meta.pagination.total === 0) notFound()

    return json.data.centuries.data
}