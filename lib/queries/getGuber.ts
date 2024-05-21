"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGuber({ 
    id
}: { 
    id: string
}) {
    const query = `
    query Guber($guberId: ID) {
      guber(id: $guberId) {
        data {
          id
          attributes {
            name
            
            description
            img {
              data {
                id
                attributes {
                  url
                }
              }
            }
            histories {
              id
              year
              text
            }
            rank
            service
            periods {
              data {
                id
                attributes {
                  value
                }
              }
            }
          }
        }
      }
    }
    `
    const json = await fetchData<GuberIdT>({
        query,
        variables: {
            guberId: id
          }
    })

    if (json.data === null) notFound()

    return json.data.guber.data
}