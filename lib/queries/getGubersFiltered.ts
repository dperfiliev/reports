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
          gubers(filters: $filters, pagination: {limit: 30}) {
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

  const variables: { filters?: any } = period
    ? { filters: { periods: { value: { contains: period } } } }
    : {}

  const json = await fetchData<GubersArrayT>({
    query,
    variables,
  })

  if (json.data.gubers.data.length === 0) notFound()

  const data = json.data.gubers.data

  data.sort((a, b) => {
    const periodA = a.attributes.periods?.data[0]?.attributes.value
    const periodB = b.attributes.periods?.data[0]?.attributes.value

    if (periodA && periodB) {
      const periodDiff = parseInt(periodA) - parseInt(periodB)
      if (periodDiff !== 0) {
        return periodDiff
      }
    }
    return parseInt(a.id) - parseInt(b.id)
  })

  return data
}