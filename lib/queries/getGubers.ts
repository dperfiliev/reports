"use server"

import { notFound } from "next/navigation"
import fetchData from "./fetchData"

export default async function getGubers() {
  const query = `
    query Gubers {
      gubers {
        data {
          id
          attributes {
            name
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
            rank
            service
          }
        }
      }
    }
  `
  const json = await fetchData<GubersArrayT>({
    query,
  })
  
  const sortedData = json.data.gubers.data.sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id)
  })

  return sortedData
}