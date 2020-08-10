import React, { useContext, useCallback, useMemo } from "react"
import { Card, Spinner } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext, { Track } from "./SpotifyContext"
import { useParams } from "react-router-dom"
import TrackList from "./TrackList"

function Playlist() {
  const { playlist_id } = useParams()
  const { getPlaylist } = useContext(SpotifyContext)!

  const loadPlaylist = useCallback(() => getPlaylist(playlist_id), [
    playlist_id,
    getPlaylist,
  ])

  const { data, error, isPending } = useAsync(loadPlaylist)

  const tracks: Track[] = useMemo(() => {
    return data ? data.tracks.items.map((track) => track?.track) : []
  }, [data])

  return (
    <Card elevation={2}>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && <TrackList tracks={tracks} />}
    </Card>
  )
}

export default Playlist
