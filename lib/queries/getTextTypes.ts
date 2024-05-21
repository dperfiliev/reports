"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getTextTypes({ 
    pageSize
}: { 
    pageSize?: number
}) {
    const query = `
    query TextType($pagination: PaginationArg) {
        textTypes(pagination: $pagination) {
          data {
            id
            attributes {
              name
            }
          }
          meta {
            pagination {
              total
            }
          }
        }
      }
    `
    const json = await fetchData<TextTypesArrayT>({
        query,
        variables: {
          pagination: {
            pageSize: pageSize
          }
        }
    })

    if (json.data.textTypes.meta.pagination.total === 0) notFound()

    return json.data.textTypes.data
}