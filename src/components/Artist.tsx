import React, { useContext, useCallback } from "react"
import { Card, HTMLTable } from "@blueprintjs/core"
import SpotifyContext from "./SpotifyContext"
import { useParams } from "react-router-dom"
import TrackList from "./TrackList"
import AsyncRender from "./AsyncRender"

function Artist() {
  const { artist_id } = useParams()
  const { getTopTracks, getArtist, getArtistAlbums } = useContext(
    SpotifyContext
  )!

  const loadTopTracks = useCallback(() => getTopTracks(artist_id), [
    artist_id,
    getTopTracks,
  ])

  const loadArtist = useCallback(() => getArtist(artist_id), [
    artist_id,
    getArtist,
  ])

  const loadAlbums = useCallback(() => getArtistAlbums(artist_id), [
    artist_id,
    getArtistAlbums,
  ])

  return (
    <Card elevation={2}>
      <AsyncRender fn={loadArtist}>
        {(data) => (
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
      </AsyncRender>

      <h2>Top Tracks</h2>
      <AsyncRender fn={loadTopTracks}>
        {(data) => <TrackList tracks={data.tracks} />}
      </AsyncRender>

      <h2>Albums</h2>
      <AsyncRender fn={loadAlbums}>
        {(data) => (
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
      </AsyncRender>
    </Card>
  )
}

export default Artist
