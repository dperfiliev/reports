import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

// eslint-disable-next-line @typescript-eslint/require-await
export async function POST(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag')

    if (!tag) throw new Error("Tag not found!")

    revalidateTag(tag)
    
    return Response.json({ revalidated: true, now: Date.now() })
}