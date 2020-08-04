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
  const [cookies] = useCookies(["access_token"])
  const token = cookies.access_token
  const headers = {
    Authorization: "Bearer " + token,
  }

  const get = (url: string) => {
    return fetch(url, { headers }).then(status).then(json)
  }

  const getMe = () => get("https://api.spotify.com/v1/me")
  const getMyPlaylists = () => get("https://api.spotify.com/v1/me/playlists")
  const getPlaylist = (id: string) =>
    get(`https://api.spotify.com/v1/playlists/${id}`)

  const api = { getMe, getMyPlaylists, getPlaylist }

  return <SpotifyProvider value={api}>{children}</SpotifyProvider>
}

export default SpotifyWrapper
