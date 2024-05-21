"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGubersFiltered({ 
    pageSize, period, startsWith
}: { 
    pageSize?: number, period?:string, startsWith?:string
}) {
    const query = `
    query GubersFiltered($pagination: PaginationArg, $filters: GuberFiltersInput) {
      gubers(pagination: $pagination, filters: $filters) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
          attributes {
            name
            periods {
              data {
                id
                attributes {
                  value
                }
              }
            }
            description
            img {
              data {
                id
                attributes {
                  url
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
          },
          filters: {
            periods: {
              value: {
                contains: period
              }
            },
            name: {
                startsWith: startsWith
            }
          }
        }
    })

    if (json.data.gubers.meta.pagination.total === 0) notFound()

    return json.data.gubers.data
}