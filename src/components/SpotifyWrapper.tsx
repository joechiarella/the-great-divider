import React, { FunctionComponent } from "react"
import { SpotifyProvider } from "./SpotifyContext"
import { useCookies } from "react-cookie"

function status(response: any) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject("error: " + response.statusText)
  }
}

function json(response: any) {
  return response.json()
}

const SpotifyWrapper: FunctionComponent = ({ children }) => {
  const [cookies, setCookie] = useCookies([
    "access_token",
    "refresh_token",
    "expires_at",
  ])

  const refreshToken = () => {
    return fetch(
      `http://localhost:3000/spotify/refresh?refresh_token=${cookies.refresh_token}`,
      { mode: "same-origin" }
    )
      .then(status)
      .then(json)
      .then((resp) => {
        const newToken = resp.access_token
        const options = { path: "/" }
        setCookie("access_token", newToken, options)
        setCookie("expires_at", new Date().getTime() + 1000 * 60 * 60, options)
        return newToken
      })
  }

  const getToken = () => {
    const now = new Date().getTime()
    if (parseInt(cookies.expires_at, 10) < now) {
      return refreshToken()
    }
    return Promise.resolve(cookies.access_token)
  }

  const getHeaders = (token: string) => {
    return {
      Authorization: "Bearer " + token,
    }
  }

  const get = (url: string) => {
    return getToken()
      .then(getHeaders)
      .then((headers) => fetch(url, { headers }))
      .then(status)
      .then(json)
  }

  const put = (url: string) => {
    return getToken()
      .then(getHeaders)
      .then((headers) => fetch(url, { method: "PUT", headers }))
      .then(status)
      .then(json)
  }

  const del = (url: string) => {
    return getToken()
      .then(getHeaders)
      .then((headers) => fetch(url, { method: "DELETE", headers }))
      .then(status)
      .then(json)
  }

  const getMe = () => get("https://api.spotify.com/v1/me")
  const getMyPlaylists = () => get("https://api.spotify.com/v1/me/playlists")
  const getPlaylist = (id: string) =>
    get(`https://api.spotify.com/v1/playlists/${id}`)
  const getArtist = (id: string) =>
    get(`https://api.spotify.com/v1/artists/${id}`)
  const getTopTracks = (artistId: string) =>
    get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`
    )
  const getArtistAlbums = (artistId: string) =>
    get(
      `https://api.spotify.com/v1/artists/${artistId}/albums?country=from_token`
    )
  const getCategories = () =>
    get("https://api.spotify.com/v1/browse/categories")
  const getCategoryPlaylists = (categoryId: string) =>
    get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`)
  const getFollowedArtists = () =>
    get(`https://api.spotify.com/v1/me/following?type=artist`)
  const checkSavedTracks = (ids: string[]) =>
    get(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids.join(",")}`)
  const saveTracks = (ids: string[]) =>
    put(`https://api.spotify.com/v1/me/tracks?ids=${ids.join(",")}`)
  const unsaveTracks = (ids: string[]) =>
    del(`https://api.spotify.com/v1/me/tracks?ids=${ids.join(",")}`)
  const getTrack = (id: string) =>
    get(`https://api.spotify.com/v1/tracks/${id}`)
  const getAudioAnalysis = (id: string) =>
    get(`https://api.spotify.com/v1/audio-analysis/${id}`)
  const getAudioFeatures = (id: string) =>
    get(`https://api.spotify.com/v1/audio-features/${id}`)
  const getPlaylistTracks = (id: string, offset: number = 0) =>
    get(`https://api.spotify.com/v1/playlists/${id}/tracks?offset=${offset}`)

  const api = {
    getMe,
    getMyPlaylists,
    getPlaylist,
    getArtist,
    getTopTracks,
    getArtistAlbums,
    getCategories,
    getCategoryPlaylists,
    getFollowedArtists,
    checkSavedTracks,
    saveTracks,
    unsaveTracks,
    getTrack,
    getAudioAnalysis,
    getAudioFeatures,
    getPlaylistTracks,
  }

  return <SpotifyProvider value={api}>{children}</SpotifyProvider>
}

export default SpotifyWrapper
