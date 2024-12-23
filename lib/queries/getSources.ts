"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getSources() {
  const query = `
  query Sources {
      sources {
          data {
              id
              attributes {
                  name
              }
          }
      }
  }
`
  const json = await fetchData<SourcesArrayT>({
    query,
  })

  if (json.data.sources.data.length === 0) notFound()

  return json.data.sources.data
}