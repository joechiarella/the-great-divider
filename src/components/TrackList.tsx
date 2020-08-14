import React, { useContext, useCallback, useState, useEffect } from "react"
import { HTMLTable, Spinner, Switch } from "@blueprintjs/core"
import SpotifyContext, { Track } from "./SpotifyContext"
import { Link } from "react-router-dom"
import { useAsync } from "react-async"
import { from, zip, Subject, Observable } from "rxjs"
import {
  map,
  bufferCount,
  mergeMap,
  tap,
  flatMap,
  mergeAll,
  concatAll,
  multicast,
  filter,
  refCount,
  take,
} from "rxjs/operators"
import styled from "styled-components"

type CheckType = {
  id: string
  check: boolean
}

type SavedProps = {
  idCheck: string
  obs: Observable<CheckType>
}

const InlineSwitch = styled(Switch)`
  margin-bottom: 0;
`

function Saved({ idCheck, obs }: SavedProps) {
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState(true)
  obs
    .pipe(
      filter(({ id }) => idCheck === id),
      take(1)
    )
    .subscribe(({ check }) => {
      setLoading(false)
      setChecked(check)
    })

  return (
    <>
      {loading && <Spinner size={15} />}
      {!loading && <InlineSwitch readOnly={true} checked={checked} />}
    </>
  )
}

type TrackListProps = {
  tracks: Track[]
}

function TrackList({ tracks }: TrackListProps) {
  const { checkSavedTracks } = useContext(SpotifyContext)!
  const subject = new Subject<CheckType>()
  const obs = from(tracks).pipe(
    map((track) => track.id),
    bufferCount(50),
    mergeMap((trackIds) =>
      zip(
        from(trackIds),
        from(checkSavedTracks(trackIds)).pipe(flatMap((d) => from(d)))
      )
    ),
    map(([id, check]) => ({ id, check })),
    multicast(subject),
    refCount()
  )

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
                <Saved idCheck={track.id} obs={obs} />
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
