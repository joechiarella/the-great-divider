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

  dl {
    display: flex;
    flex-flow: row wrap;
    border-width: 1px 1px 0 0;
  }
  dt {
    flex-basis: 20%;
    padding: 2px 4px;
    text-align: right;
    font-weight: 600;
  }
  dd {
    flex-basis: 70%;
    flex-grow: 1;
    margin: 0;
    padding: 2px 4px;
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
