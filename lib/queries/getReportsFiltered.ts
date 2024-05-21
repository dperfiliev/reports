"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getReportsFiltered({ 
    pageSize, 
    source, 
    period, 
    textType
}: { 
    pageSize?: number, 
    source?:string, 
    period?:string, 
    textType?:string
}) {
    const query = `
    query ReportsFilterted($pagination: PaginationArg, $filters: ReportFiltersInput) {
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
            text_type {
              data {
                id
                attributes {
                  name
                }
              }
            }
            source {
              data {
                id
                attributes {
                  name
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
            source: {
              name: {
                contains: source
              }
            },
            periods: {
              value: {
                contains: period
              }
            },
            text_type: {
              name: {
                contains: textType
              }
            }
          }
        }
    })

    if (json.data.reports.meta.pagination.total === 0) notFound()

    return json.data.reports.data
}