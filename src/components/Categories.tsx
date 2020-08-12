import React, { useContext } from "react"
import { Card } from "@blueprintjs/core"
import SpotifyContext from "./SpotifyContext"
import { Link } from "react-router-dom"
import AsyncRender from "./AsyncRender"
import styled from "styled-components"
import Tile, { Gallery } from "./Tile"

function Categories() {
  const { getCategories } = useContext(SpotifyContext)!

  return (
    <Card elevation={2}>
      <h1>Categories</h1>
      <AsyncRender fn={getCategories}>
        {(data) => (
          <Gallery>
            {data.categories.items.map((cat) => {
              return (
                <Link to={`/app/category/${cat.id}`} key={cat.id}>
                  <Tile img={cat.icons[0].url} text={cat.name} />
                </Link>
              )
            })}
          </Gallery>
        )}
      </AsyncRender>
    </Card>
  )
}

export default Categories
