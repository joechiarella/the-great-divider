import React, { useContext, useCallback } from "react"
import { Card, Spinner } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext from "./SpotifyContext"
import { useParams } from "react-router-dom"

function Artist() {
  const { artist_id } = useParams()
  const { getArtist } = useContext(SpotifyContext)!

  const loadArtist = useCallback(() => getArtist(artist_id), [
    artist_id,
    getArtist,
  ])

  const { data, error, isPending } = useAsync(loadArtist)

  return (
    <Card elevation={2}>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && (
        <div>
          <h1>{data.name}</h1>
          <dl>
            <dt>Popularity</dt>
            <dd>{data.popularity}</dd>
            <dt>Genres</dt>
            <dd>{data.genres.join(", ")}</dd>
          </dl>
        </div>
      )}
    </Card>
  )
}

export default Artist
