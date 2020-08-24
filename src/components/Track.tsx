import React, { useContext, useCallback } from "react"
import { Card, HTMLTable, H1, H2, Tag } from "@blueprintjs/core"
import SpotifyContext, { TrackAnalysis } from "./SpotifyContext"
import { useParams } from "react-router-dom"
import TrackList from "./TrackList"
import AsyncRender from "./AsyncRender"
import styled from "styled-components"

const keyMap: { [key: number]: string } = {
  0: "C",
  1: "C#",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
}

const modeMap: { [key: number]: string } = {
  0: "minor",
  1: "major",
}

type KeyData = {
  data: {
    key: number
    mode: number
    key_confidence: number
    mode_confidence: number
  }
}

function Key({ data }: KeyData) {
  const { key, mode, key_confidence, mode_confidence } = data
  return (
    <>
      <div>
        {keyMap[key]} {modeMap[mode]} ({key_confidence}/{mode_confidence})
      </div>
    </>
  )
}

function Track() {
  const { track_id } = useParams()
  const { getTrack, getAudioAnalysis, getAudioFeatures } = useContext(
    SpotifyContext
  )!

  const loadTrack = useCallback(() => getTrack(track_id), [track_id, getTrack])
  const loadAudioAnalysis = useCallback(() => getAudioAnalysis(track_id), [
    track_id,
    getAudioAnalysis,
  ])
  const loadAudioFeatures = useCallback(() => getAudioFeatures(track_id), [
    track_id,
    getAudioFeatures,
  ])

  return (
    <Card elevation={2}>
      <AsyncRender fn={loadTrack}>
        {(data) => (
          <div>
            <H1>{data.name}</H1>
            <dl>
              <dt>Artist</dt>
              <dd>{data.artists[0].name}</dd>
              <dt>Album</dt>
              <dd>{data.album.name}</dd>
              <dt>Popularity</dt>
              <dd>{data.popularity}</dd>
            </dl>
          </div>
        )}
      </AsyncRender>
      <AsyncRender fn={loadAudioAnalysis}>
        {(data) => (
          <div>
            <H2>Audio Analysis</H2>
            <dl>
              <dt>Loudness</dt>
              <dd>{data.track.loudness}</dd>
              <dt>Key</dt>
              <dd>
                <Key data={data.track} />
              </dd>
              <dt>Tempo</dt>
              <dd>{data.track.tempo}</dd>
              <dt>Time Signature</dt>
              <dd>{data.track.time_signature} / 4</dd>
            </dl>
          </div>
        )}
      </AsyncRender>
      <AsyncRender fn={loadAudioFeatures}>
        {(data) => (
          <div>
            <H2>Audio Features</H2>
            <dl>
              <dt>Acousticness</dt>
              <dd>{data.acousticness}</dd>
              <dt>Danceability</dt>
              <dd>{data.danceability}</dd>
              <dt>Energy</dt>
              <dd>{data.energy}</dd>
              <dt>Instrumentalness</dt>
              <dd>{data.instrumentalness}</dd>
              <dt>Liveness</dt>
              <dd>{data.liveness}</dd>
              <dt>Speechiness</dt>
              <dd>{data.speechiness}</dd>
              <dt>Valence</dt>
              <dd>{data.valence}</dd>
            </dl>
          </div>
        )}
      </AsyncRender>
    </Card>
  )
}

export default Track
