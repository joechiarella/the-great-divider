import React, { useContext, useCallback } from "react"
import { Card, Spinner, HTMLTable } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext from "./SpotifyContext"
import { useParams, Link } from "react-router-dom"

function Playlist() {
  const { playlist_id } = useParams()
  const { getPlaylist } = useContext(SpotifyContext)!

  const loadPlaylist = useCallback(() => getPlaylist(playlist_id), [
    playlist_id,
    getPlaylist,
  ])

  const { data, error, isPending } = useAsync(loadPlaylist)

  return (
    <Card elevation={2}>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && (
        <div>
          <HTMLTable>
            <thead>
              <tr>
                <th>Track</th>
                <th>Artist</th>
                <th>Album</th>
              </tr>
            </thead>
            <tbody>
              {data.tracks.items.map((track) => {
                return (
                  <tr key={track.track.id}>
                    <td>{track.track.name}</td>
                    <td>
                      <Link to={`/app/artist/${track.track.artists[0].id}`}>
                        {track.track.artists[0].name}
                      </Link>
                    </td>
                    <td>{track.track.album.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </HTMLTable>
        </div>
      )}
    </Card>
  )
}

export default Playlist
