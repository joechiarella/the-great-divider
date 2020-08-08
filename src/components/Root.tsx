// Import necessary dependencies
import React from "react"

import { Route } from "react-router-dom"
import Login from "./Login"
import App from "./App"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    background-color: #202b33;
  }
`

// Create App component
function Root() {
  return (
    <>
      <GlobalStyle />
      <div className="bp3-dark">
        <Route path="/app" component={App} />
        <Route exact path="/" component={Login} />
      </div>
    </>
  )
}
export default Root
