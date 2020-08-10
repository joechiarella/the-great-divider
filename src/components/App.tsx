import React from "react"
import { Navbar, Button, Alignment } from "@blueprintjs/core"
import { Route, Link, useHistory, Switch } from "react-router-dom"
import Me from "./Me"
import SpotifyWrapper from "./SpotifyWrapper"
import styled from "styled-components"
import Playlists from "./Playlists"
import Playlist from "./Playlist"
import Artist from "./Artist"

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
        </Navbar.Group>
      </Navbar>
      <AppFrame>
        <Switch>
          <Route path="/app/me" component={Me} />
          <Route path="/app/playlists" component={Playlists} />
          <Route path="/app/playlist/:playlist_id" component={Playlist} />
          <Route path="/app/artist/:artist_id" component={Artist} />
          <Route path="/app">
            <ul>
              <li>
                <Link to="/app/me">Me</Link>
              </li>
              <li>
                <Link to="/app/playlists">Playlists</Link>
              </li>
            </ul>
          </Route>
        </Switch>
      </AppFrame>
    </SpotifyWrapper>
  )
}
export default App
