import React, { useContext, useCallback } from "react"
import { Card } from "@blueprintjs/core"
import SpotifyContext from "./SpotifyContext"
import { useParams } from "react-router-dom"
import PlaylistList from "./PlaylistList"
import AsyncRender from "./AsyncRender"

function Category() {
  const { category_id } = useParams()

  const { getCategoryPlaylists } = useContext(SpotifyContext)!
  const loadPlaylists = useCallback(() => getCategoryPlaylists(category_id), [
    category_id,
    getCategoryPlaylists,
  ])

  return (
    <Card elevation={2}>
      <AsyncRender fn={loadPlaylists}>
        {(data) => <PlaylistList playlists={data.playlists} />}
      </AsyncRender>
    </Card>
  )
}

export default Category
