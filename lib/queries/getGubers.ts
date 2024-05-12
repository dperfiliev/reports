"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGubers({ 
    pageSize 
}: { 
    pageSize?: number
}) {
    const query = `
    query Gubers($gubersPagination2: PaginationArg) {
        gubers(pagination: $gubersPagination2) {
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
              period
              img {
                data {
                  attributes {
                    url
                  }
                }
              }  
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