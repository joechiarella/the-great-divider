import React, { useContext, useCallback } from "react"
import { Card, H1 } from "@blueprintjs/core"
import SpotifyContext from "./SpotifyContext"
import { useParams } from "react-router-dom"
import TrackList from "./TrackList"
import AsyncRender from "./AsyncRender"

function Playlist() {
  const { playlist_id } = useParams()
  const { getPlaylist } = useContext(SpotifyContext)!

  const loadPlaylist = useCallback(() => getPlaylist(playlist_id), [
    playlist_id,
    getPlaylist,
  ])

  return (
    <Card elevation={2}>
      <AsyncRender fn={loadPlaylist}>
        {(data) => {
          const tracks = data.tracks.items.map((track) => track?.track)
          return (
            <>
              <H1>{data.name}</H1>
              <TrackList tracks={tracks} />
            </>
          )
        }}
      </AsyncRender>
    </Card>
  )
}

export default Playlist
