"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getReportsFiltered({
  source,
  period,
  textType
}: {
  source?: string,
  period?: string,
  textType?: string
}) {
  const query = `
    query ReportsFiltered($filters: ReportFiltersInput) {
        reports(filters: $filters) {
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

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  if (json.data.reports.data.length === 0) notFound()

  return json.data.reports.data
}