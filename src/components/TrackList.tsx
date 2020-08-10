import React from "react"
import { HTMLTable } from "@blueprintjs/core"
import { Track } from "./SpotifyContext"
import { Link } from "react-router-dom"

type TrackListProps = {
  tracks: Track[]
}

function TrackList({ tracks }: TrackListProps) {
  return (
    <HTMLTable condensed={true}>
      <thead>
        <tr>
          <th>Track</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Popularity</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track) => {
          return (
            <tr key={track.id}>
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
