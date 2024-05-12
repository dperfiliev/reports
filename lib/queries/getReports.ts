"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getReports({ 
    pageSize 
}: { 
    pageSize?: number
}) {
    const query = `
    query Reports($pagination: PaginationArg) {
      reports(pagination: $pagination) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
          attributes {
            title
            description
            pages
            output
            source
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
    const json = await fetchData<ReportsArrayT>({
        query,
        variables: {
          pagination: {
            pageSize: pageSize
          }
        }
    })

    if (json.data.reports.meta.pagination.total === 0) notFound()

    return json.data.reports.data
}