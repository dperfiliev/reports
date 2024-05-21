"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getSources({ 
    pageSize
}: { 
    pageSize?: number
}) {
    const query = `
    query Sources($pagination: PaginationArg) {
        sources(pagination: $pagination) {
          data {
            id
            attributes {
              name
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
    const json = await fetchData<SourcesArrayT>({
        query,
        variables: {
          pagination: {
            pageSize: pageSize
          }
        }
    })

    if (json.data.sources.meta.pagination.total === 0) notFound()

    return json.data.sources.data
}