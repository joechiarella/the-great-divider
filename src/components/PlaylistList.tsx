import React from "react"
import { Paging, PlaylistSimp } from "./SpotifyContext"
import { Link } from "react-router-dom"
import Tile, { Gallery } from "./Tile"

type PlaylistListProps = {
  playlists: Paging<PlaylistSimp>
}

function PlaylistList({ playlists }: PlaylistListProps) {
  return (
    <Gallery>
      {playlists.items.map((playlist) => {
        return (
          <Link to={`/app/playlist/${playlist.id}`} key={playlist.id}>
            <Tile img={playlist.images[0].url} text={playlist.name} />
          </Link>
        )
      })}
    </Gallery>
  )
}

export default PlaylistList
