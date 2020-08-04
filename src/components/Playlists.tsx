import React, { useContext } from "react"
import { Card, Spinner } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext from "./SpotifyContext"
import { Link } from "react-router-dom"

function Playlists() {
  const { getMyPlaylists } = useContext(SpotifyContext)!
  const { data, error, isPending } = useAsync(getMyPlaylists)
  console.log("Playlists -> data", data)

  return (
    <Card elevation={2}>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && (
        <div>
          {data.items.map((playlist) => {
            return (
              <div key={playlist.id}>
                <Link to={`/app/playlist/${playlist.id}`}>{playlist.name}</Link>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

export default Playlists
