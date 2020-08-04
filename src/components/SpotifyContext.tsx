import React from "react"

export interface Image {
  height: number
  width: number
  url: string
}

export interface Me {
  id: string
  images: Image[]
  display_name: string
  email: string
  external_urls: any
  href: string
  country: string
}

export interface Paging<T> {
  items: T[]
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface PlaylistSimp {
  id: string
  name: string
}

export interface AlbumSimp {
  id: string
  name: string
}

export interface ArtistSimp {
  id: string
  name: string
}

export interface Track {
  id: string
  name: string
  album: AlbumSimp
  artists: ArtistSimp[]
}

export interface PlaylistTrack {
  track: Track
}

export interface PlaylistFull {
  id: string
  name: string
  tracks: Paging<PlaylistTrack>
}

type SpotifyContextType = {
  getMe: () => Promise<Me>
  getMyPlaylists: () => Promise<Paging<PlaylistSimp>>
  getPlaylist: (id: string) => Promise<PlaylistFull>
}

const SpotifyContext = React.createContext<SpotifyContextType | undefined>(
  undefined
)

export const SpotifyProvider = SpotifyContext.Provider
export const SpotifyConsumer = SpotifyContext.Consumer

export default SpotifyContext
