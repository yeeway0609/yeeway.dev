'use server'

import { SpotifyApi, type AccessToken, type PlaybackState, type Track } from '@spotify/web-api-ts-sdk'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000 // refresh 5 min before expiry

let tokenCache: { accessToken: string; expiresAt: number } | null = null

export interface NowPlaying {
  isPlaying: PlaybackState['is_playing']
  title?: Track['name']
  artist?: Track['artists'][0]['name']
  url?: Track['external_urls']['spotify']
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const accessToken = await getValidAccessToken()

  if (!clientId || !accessToken) return { isPlaying: false }

  const sdk = SpotifyApi.withAccessToken(clientId, {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600,
    expires: Date.now() + 3600 * 1000,
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
  })

  const playback = await sdk.player.getCurrentlyPlayingTrack()
  if (!playback) return { isPlaying: false }

  const item = playback.item
  if (!item || !('artists' in item)) return { isPlaying: false }

  return {
    isPlaying: playback.is_playing,
    title: item.name,
    artist: item.artists[0].name,
    url: item.external_urls.spotify,
  }
}

async function getValidAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) return null

  if (tokenCache && Date.now() < tokenCache.expiresAt - TOKEN_EXPIRY_BUFFER_MS) {
    return tokenCache.accessToken
  }

  try {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authHeader}`,
      },
      body: body.toString(),
    })
    const data = (await res.json()) as AccessToken
    if (!res.ok) {
      console.error('[Spotify now-playing] refresh failed:', data)
      return null
    }
    const expiresIn = data.expires_in ?? 3600
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + expiresIn * 1000,
    }
    return tokenCache.accessToken
  } catch (err) {
    console.error('[Spotify now-playing] refresh error:', err)
    return null
  }
}
