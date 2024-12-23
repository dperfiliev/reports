"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGubersFiltered({
  period
}: {
  period?: string
}) {
  const query = `
      query GubersFiltered($filters: GuberFiltersInput) {
          gubers(filters: $filters) {
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
      filters: {
        periods: {
          value: {
            contains: period
          }
        }
      }
    }
  })

  if (json.data.gubers.data.length === 0) notFound()

  return json.data.gubers.data
}