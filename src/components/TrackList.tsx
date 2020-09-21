import React, { useState, useEffect, useContext, useCallback } from "react"
import { HTMLTable, Spinner, Switch } from "@blueprintjs/core"
import SpotifyContext, { Track } from "./SpotifyContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
import useSavedTrackService, { CheckType } from "../services/SavedTrackService"
import { useAsync } from "react-async"
import useIntersect from "../services/useIntersect"

type SavedProps = {
  trackId: string
  checkTrack: (idToCheck: string, callback: (arg: CheckType) => void) => void
}

const InlineSwitch = styled(Switch)`
  margin-bottom: 0;
`

function Saved({ trackId, checkTrack }: SavedProps) {
  const { saveTracks, unsaveTracks } = useContext(SpotifyContext)!

  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState(true)

  const toggleSavedTrack = useCallback(() => {
    if (!checked) {
      setChecked(true)
      return saveTracks([trackId])
    } else {
      setChecked(false)
      return unsaveTracks([trackId])
    }
  }, [trackId, checked])

  const { run } = useAsync({ deferFn: toggleSavedTrack })

  useEffect(() => {
    checkTrack(trackId, ({ saved }) => {
      setLoading(false)
      setChecked(saved)
    })
  }, [trackId])

  return (
    <>
      {loading && <Spinner size={15} />}
      {!loading && <InlineSwitch onChange={run} checked={checked} />}
    </>
  )
}

type TrackListProps = {
  tracks: Track[]
  loadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
}

function TrackList({
  tracks,
  loadMore = () => {},
  hasMore = false,
  isLoadingMore = false,
}: TrackListProps) {
  const { checkTracks } = useSavedTrackService()
  const checkTrack = checkTracks(tracks)

  const [ref, entry] = useIntersect({
    threshold: 0.1,
  })

  useEffect(() => {
    if (
      entry?.intersectionRatio &&
      entry?.intersectionRatio > 0.1 &&
      hasMore &&
      !isLoadingMore
    ) {
      console.log("LOAD MORE")
      loadMore()
    }
  }, [entry, hasMore, isLoadingMore, loadMore])

  return (
    <>
      <HTMLTable condensed={true}>
        <thead>
          <tr>
            <th>Saved</th>
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => {
            if (!track) return ""
            return (
              <tr key={track.id}>
                <td>
                  <Saved trackId={track.id} checkTrack={checkTrack} />
                </td>
                <td>
                  <Link to={`/app/track/${track.id}`}>{track.name}</Link>
                </td>
                <td>
                  <Link to={`/app/artist/${track.artists[0].id}`}>
                    {track.artists[0].name}
                  </Link>
                </td>
                <td>{track.album.name}</td>
                <td>{track.popularity}</td>
              </tr>
            )
          })}
        </tbody>
      </HTMLTable>
      {hasMore && !isLoadingMore && <div ref={ref}>"LOADING MORE"</div>}
    </>
  )
}

export default TrackList
