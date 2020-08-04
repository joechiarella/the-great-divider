// Import necessary dependencies
import React from "react"

import { Route } from "react-router-dom"
import Login from "./Login"
import App from "./App"

// Create App component
function Root() {
  return (
    <div className="app">
      <Route path="/app" component={App} />
      <Route exact path="/" component={Login} />
    </div>
  )
}
export default Root
