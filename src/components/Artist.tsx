import React, { useContext, useCallback } from "react"
import { Card, Spinner, HTMLTable } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext from "./SpotifyContext"
import { useParams } from "react-router-dom"
import TrackList from "./TrackList"

type ArtistSummaryProps = {
  artistId: string
}

const ArtistSummary = ({ artistId }: ArtistSummaryProps) => {
  const { getArtist } = useContext(SpotifyContext)!

  const loadArtist = useCallback(() => getArtist(artistId), [
    artistId,
    getArtist,
  ])
  const { data, error, isPending } = useAsync(loadArtist)

  return (
    <>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && (
        <div>
          <h1>{data.name}</h1>
          <img width="150" alt="idk" src={data.images[0].url} />

          <dl>
            <dt>Popularity</dt>
            <dd>{data.popularity}</dd>
            <dt>Followers</dt>
            <dd>{data.followers.total}</dd>
            <dt>Genres</dt>
            <dd>{data.genres.join(", ")}</dd>
          </dl>
        </div>
      )}
    </>
  )
}

type TopTracksProps = {
  artistId: string
}

const TopTracks = ({ artistId }: TopTracksProps) => {
  const { getTopTracks } = useContext(SpotifyContext)!

  const loadArtist = useCallback(() => getTopTracks(artistId), [
    artistId,
    getTopTracks,
  ])
  const { data, error, isPending } = useAsync(loadArtist)

  return (
    <>
      <h2>Top Tracks</h2>
      {isPending && <Spinner />}
      {error && <div>Error!{error}</div>}
      {data && <TrackList tracks={data.tracks} />}
    </>
  )
}

type ArtistAlbumsProps = {
  artistId: string
}

const ArtistAlbums = ({ artistId }: ArtistAlbumsProps) => {
  const { getArtistAlbums } = useContext(SpotifyContext)!

  const loadArtist = useCallback(() => getArtistAlbums(artistId), [
    artistId,
    getArtistAlbums,
  ])
  const { data, error, isPending } = useAsync(loadArtist)

  return (
    <>
      <h2>Albums</h2>
      {isPending && <Spinner />}
      {error && <div>Error!{error}</div>}
      {data && (
        <div>
          <HTMLTable condensed={true}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((album) => {
                return (
                  <tr key={album.id}>
                    <td>{album.name}</td>
                    <td>{album.album_type}</td>
                  </tr>
                )
              })}
            </tbody>
          </HTMLTable>
        </div>
      )}
    </>
  )
}

function Artist() {
  const { artist_id } = useParams()

  return (
    <Card elevation={2}>
      <ArtistSummary artistId={artist_id} />
      <TopTracks artistId={artist_id} />
      <ArtistAlbums artistId={artist_id} />
    </Card>
  )
}

export default Artist
