import React, { useState, useEffect, useContext, useCallback } from "react"
import { HTMLTable, Spinner, Switch } from "@blueprintjs/core"
import SpotifyContext, { Track } from "./SpotifyContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
import useSavedTrackService, { CheckType } from "../services/SavedTrackService"
import { useAsync } from "react-async"

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
}

function TrackList({ tracks }: TrackListProps) {
  const { checkTracks } = useSavedTrackService()
  const checkTrack = checkTracks(tracks)

  return (
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
              <td>{track.name}</td>
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
  )
}

export default TrackList
