"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGubers({
  pageSize
}: {
  pageSize?: number
}) {
  const query = `
    query Gubers($pagination: PaginationArg) {
  gubers(pagination: $pagination) {
    meta {
      pagination {
        total
      }
    }
    data {
      id
      attributes {
        name
        description
        
        img {
          data {
            attributes {
              url
            }
          }
        }
        periods {
          data {
            id
            attributes {
              value
            }
          }
        }
        rank
        service
      }
    }
  }
}
    `
  const json = await fetchData<GubersArrayT>({
    query,
    variables: {
      pagination: {
        pageSize: pageSize
      }
    }
  })

  if (json.data.gubers.meta.pagination.total === 0) notFound()

  return json.data.gubers.data
}