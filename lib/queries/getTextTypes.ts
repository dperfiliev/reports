"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getTextTypes() {
  const query = `
  query TextTypes {
      textTypes {
          data {
              id
              attributes {
                  name
              }
          }
      }
  }
`
  const json = await fetchData<TextTypesArrayT>({
    query,
  })

  if (json.data.textTypes.data.length === 0) notFound()

  return json.data.textTypes.data
}