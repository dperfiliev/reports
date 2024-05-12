"use server"

export default async function fetchData<T>({
    query,
    variables
}: {
    query: string,
    variables?: unknown
}) {
    const headers = {
        "Content-Type": "application/json"
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`, {
        headers,
        method: "POST",
        body: JSON.stringify({
            query,
            variables
        }),
        next: {
            tags: ["strapi"]
        }
    });

    if (!res.ok) {
        const errorMess = await res.text()
        console.log(errorMess)

        throw new Error(errorMess)
    }

    const json = await res.json() as T

    return json
}