// Import necessary dependencies
import React from "react"
import ReactDOM from "react-dom"
// Import App component
import Root from "./components/Root"
// Import styles
import "./css/index.css"
// Import service workers
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

// Render App component in the DOM
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Root />
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
