import React, { useContext } from "react"
import { Card, Spinner } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext from "./SpotifyContext"
import { Link } from "react-router-dom"

function Playlists() {
  const { getMyPlaylists } = useContext(SpotifyContext)!
  const { data, error, isPending } = useAsync(getMyPlaylists)

  return (
    <Card elevation={2}>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && (
        <ul>
          {data.items.map((playlist) => {
            return (
              <li key={playlist.id}>
                <Link to={`/app/playlist/${playlist.id}`}>{playlist.name}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}

export default Playlists
