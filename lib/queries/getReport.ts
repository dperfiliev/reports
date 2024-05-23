"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getReport({ 
  id
}: { 
  id: string
}) {
  const query = `
    query Report($reportId: ID) {
      report(id: $reportId) {
        data {
          id
          attributes {
            title
            description
            pages
            output
            text_type {
              data {
                id
                attributes {
                  name
                }
              }
            }
            img {
              data {
                id
                attributes {
                  url
                }
              }
            }
            file {
              data {
                id
                attributes {
                  name
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
            periods {
              data {
                id
                attributes {
                  value
                }
              }
            }
            contents {
              id
              title
              pageNumber
            }
          }
        }
      }
    }
  `
  const json = await fetchData<ReportIdT>({
    query,
    variables: {
      reportId: id
    }
  })

  if (json.data === null) notFound()

  return json.data.report.data
}