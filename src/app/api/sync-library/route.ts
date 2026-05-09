import { AwsClient } from 'aws4fetch'
import { type NextRequest, NextResponse } from 'next/server'
import { fetchAllLibraryItems } from '@/lib/library.server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const endpoint = process.env.R2_S3_ENDPOINT
const uploadUrl = `${endpoint}/library.json`

const r2Client = accessKeyId && secretAccessKey
  ? new AwsClient({ accessKeyId, secretAccessKey })
  : null

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  if (!r2Client || !endpoint) {
    return NextResponse.json({ ok: false, error: 'Missing R2 credentials' }, { status: 500 })
  }

  try {
    const items = await fetchAllLibraryItems()
    const body = new TextEncoder().encode(JSON.stringify(items))

    const res = await r2Client.fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': String(body.byteLength),
        'Cache-Control': 'public, max-age=300',
      },
      body,
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[sync-library] R2 upload failed:', res.status, text)
      return NextResponse.json({
        ok: false,
        error: 'R2 upload failed',
        status: res.status,
        detail: text,
        uploadUrl,
      }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      count: items.length,
      bytes: body.byteLength,
      syncedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[sync-library] Failed:', error)
    return NextResponse.json({ ok: false, error: 'Sync failed' }, { status: 500 })
  }
}
