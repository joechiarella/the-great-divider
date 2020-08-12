import React, { useContext } from "react"
import { Card } from "@blueprintjs/core"
import SpotifyContext from "./SpotifyContext"
import { Link } from "react-router-dom"
import AsyncRender from "./AsyncRender"
import Tile, { Gallery } from "./Tile"

function Followed() {
  const { getFollowedArtists } = useContext(SpotifyContext)!

  return (
    <Card elevation={2}>
      <h1>Followed Artists</h1>
      <AsyncRender fn={getFollowedArtists}>
        {(data) => (
          <Gallery>
            {data.artists.items.map((artist) => {
              return (
                <Link to={`/app/artist/${artist.id}`} key={artist.id}>
                  <Tile img={artist.images[0].url} text={artist.name} />
                </Link>
              )
            })}
          </Gallery>
        )}
      </AsyncRender>
    </Card>
  )
}

export default Followed
