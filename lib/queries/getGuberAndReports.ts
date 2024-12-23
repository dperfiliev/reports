"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGuberAndReports({
  guberId
}: {
  guberId: string
}) {
  const query = `
  query GuberAndReports($filters: ReportFiltersInput) {
      reports(filters: $filters) {
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
      filters: {
        guber: {
          id: {
            containsi: guberId
          }
        }
      }
    }
  })

  if (json.data.reports.data.length === 0) notFound()

  return json.data.reports.data
}