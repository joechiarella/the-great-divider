import React, { useContext, useCallback, useState } from "react"
import { Card, H1, Spinner } from "@blueprintjs/core"
import SpotifyContext, { Paging, PlaylistTrack, Track } from "./SpotifyContext"
import { useParams } from "react-router-dom"
import TrackList from "./TrackList"
import AsyncRender from "./AsyncRender"
import { useAsync } from "react-async"

function Playlist() {
  const { playlist_id } = useParams()
  const { getPlaylist, getPlaylistTracks } = useContext(SpotifyContext)!
  const [allTracks, setAllTracks] = useState<Track[]>([])
  const [nextIndex, setNextIndex] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const loadPlaylist = useCallback(() => getPlaylist(playlist_id), [
    playlist_id,
    getPlaylist,
  ])

  const loadTracks = useCallback(() => getPlaylistTracks(playlist_id, 0), [
    playlist_id,
    getPlaylistTracks,
  ])

  const loadMoreTracks = useCallback(
    () => getPlaylistTracks(playlist_id, nextIndex),
    [playlist_id, getPlaylistTracks, nextIndex]
  )

  const updateTracks = useCallback(
    (data: Paging<PlaylistTrack>) => {
      console.log("DATA", data)
      const tracks = data.items
        .filter((track) => track?.track)
        .map((track) => track?.track)
      const newTracks = allTracks.concat(tracks)
      setAllTracks(newTracks)
      setNextIndex(data.offset + data.limit)
      setHasMore(!!data.next)
    },
    [allTracks]
  )

  const { data, error, isPending } = useAsync(loadTracks, {
    onResolve: updateTracks,
  })

  const { isPending: isLoadingMore, run: loadMore } = useAsync({
    deferFn: loadMoreTracks,
    onResolve: updateTracks,
  })

  return (
    <Card elevation={2}>
      <AsyncRender fn={loadPlaylist}>
        {(data) => {
          return (
            <>
              <H1>{data.name}</H1>
            </>
          )
        }}
      </AsyncRender>
      <>
        {isPending && <Spinner />}
        {error && <div>Error!</div>}
        {data && (
          <TrackList
            tracks={allTracks}
            hasMore={hasMore}
            loadMore={loadMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </>
    </Card>
  )
}

export default Playlist
