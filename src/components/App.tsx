import React from "react"
import { Navbar, Button, Alignment } from "@blueprintjs/core"
import { Route, Link, useHistory, Switch } from "react-router-dom"
import Me from "./Me"
import SpotifyWrapper from "./SpotifyWrapper"
import styled from "styled-components"
import Playlists from "./Playlists"
import Playlist from "./Playlist"
import Artist from "./Artist"
import Categories from "./Categories"
import Category from "./Category"
import Followed from "./Followed"

const AppFrame = styled.div`
  padding: 10px;
`
function App() {
  const history = useHistory()

  const redirect = (path: string) => {
    history.push(path)
  }

  return (
    <SpotifyWrapper>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>stype.org</Navbar.Heading>
          <Navbar.Divider />
          <Button
            minimal={true}
            icon="home"
            text="Home"
            onClick={() => redirect("/app")}
          />
          <Button
            minimal={true}
            icon="search-around"
            text="Artists"
            onClick={() => redirect("/app/followed")}
          />
          <Button
            minimal={true}
            icon="numbered-list"
            text="Playlists"
            onClick={() => redirect("/app/playlists")}
          />
          <Button
            minimal={true}
            icon="group-objects"
            text="Categories"
            onClick={() => redirect("/app/categories")}
          />
        </Navbar.Group>
      </Navbar>
      <AppFrame>
        <Switch>
          <Route path="/app/playlists" component={Playlists} />
          <Route path="/app/categories" component={Categories} />
          <Route path="/app/playlist/:playlist_id" component={Playlist} />
          <Route path="/app/artist/:artist_id" component={Artist} />
          <Route path="/app/category/:category_id" component={Category} />
          <Route path="/app/followed" component={Followed} />
          <Route path="/app" component={Me} />
        </Switch>
      </AppFrame>
    </SpotifyWrapper>
  )
}
export default App
