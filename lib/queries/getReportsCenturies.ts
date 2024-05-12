"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getReportsCenturies({ 
    pageSize, century
}: { 
    pageSize?: number,
    century?: number
}) {
    const query = `
    query ReportsCenturies($pagination: PaginationArg, $filters: ReportFiltersInput) {
      reports(pagination: $pagination, filters: $filters) {
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
          },
          filters: {
            centuries: {
              century: {
                in: century
              }
            }
          }
        }
    })

    if (json.data.reports.meta.pagination.total === 0) notFound()

    return json.data.reports.data
}