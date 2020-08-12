import React, { useContext } from "react"
import { Card } from "@blueprintjs/core"
import SpotifyContext from "./SpotifyContext"
import PlaylistList from "./PlaylistList"
import AsyncRender from "./AsyncRender"

function Playlists() {
  const { getMyPlaylists } = useContext(SpotifyContext)!

  return (
    <Card elevation={2}>
      <AsyncRender fn={getMyPlaylists}>
        {(data) => <PlaylistList playlists={data} />}
      </AsyncRender>
    </Card>
  )
}

export default Playlists
