"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGuberAndReports({ 
    pageSize, guberId
}: { 
    pageSize?: number, guberId: string
}) {
    const query = `
    query GuberAndReports($pagination: PaginationArg, $filters: ReportFiltersInput) {
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
              img {
                data {
                  attributes {
                    url
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
              guber {
                data {
                  id
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
            guber: {
              id: {
                containsi: guberId
              }
            }
          }
        }
    })

    if (json.data.reports.meta.pagination.total === 0) notFound()

    return json.data.reports.data
}