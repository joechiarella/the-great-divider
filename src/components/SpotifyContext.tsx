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
  images: Image[]
}

export interface AlbumSimp {
  id: string
  name: string
  album_type: string
  images: Image[]
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
  duration_ms: number
  popularity: number
  preview_url: string
}

export interface Tracks {
  tracks: Track[]
}

export interface PlaylistTrack {
  track: Track
}

export interface PlaylistFull {
  id: string
  name: string
  tracks: Paging<PlaylistTrack>
}

export interface Followers {
  total: number
}

export interface ArtistFull {
  id: string
  name: string
  popularity: number
  genres: string[]
  followers: Followers
  images: Image[]
}

export interface Category {
  id: string
  name: string
  icons: Image[]
}

export interface Categories {
  categories: Paging<Category>
}

export interface Playlists {
  playlists: Paging<PlaylistSimp>
}

export interface Artists {
  artists: Paging<ArtistFull>
}

export interface TimeInterval {
  start: number
  duration: number
  confidence: number
}

export interface Section {
  start: number
  duration: number
  confidence: number
  loudness: number
  tempo: number
  tempo_confidence: number
  key: number
  key_confidence: number
  mode: number
  mode_confidence: number
  time_signature: number
  time_signature_confidence: number
}

export interface Segment {
  start: number
  duration: number
  confidence: number
  loudness_start: number
  loudness_max: number
  loudness_max_time: number
  loudness_end: number
  pitches: number[]
  timbre: number[]
}

export interface TrackAnalysis {
  key: number
  key_confidence: number
  loudness: number
  mode: number
  mode_confidence: number
  tempo: number
  tempo_confidence: number
  time_signature: number
  time_signature_confidence: number
}

export interface AudioAnalysis {
  bars: TimeInterval[]
  beats: TimeInterval[]
  sections: Section[]
  segments: Segment[]
  tatums: TimeInterval[]
  track: TrackAnalysis
}

type SpotifyContextType = {
  getMe: () => Promise<Me>
  getMyPlaylists: () => Promise<Paging<PlaylistSimp>>
  getPlaylist: (id: string) => Promise<PlaylistFull>
  getArtist: (id: string) => Promise<ArtistFull>
  getTopTracks: (artistId: string) => Promise<Tracks>
  getArtistAlbums: (artistId: string) => Promise<Paging<AlbumSimp>>
  getCategories: () => Promise<Categories>
  getCategoryPlaylists: (categoryId: string) => Promise<Playlists>
  getFollowedArtists: () => Promise<Artists>
  checkSavedTracks: (ids: string[]) => Promise<boolean[]>
  saveTracks: (ids: string[]) => Promise<void>
  unsaveTracks: (ids: string[]) => Promise<void>
  getTrack: (id: string) => Promise<Track>
  getAudioAnalysis: (id: string) => Promise<AudioAnalysis>
}

const SpotifyContext = React.createContext<SpotifyContextType | undefined>(
  undefined
)

export const SpotifyProvider = SpotifyContext.Provider
export const SpotifyConsumer = SpotifyContext.Consumer

export default SpotifyContext
