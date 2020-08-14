import React from "react"
import * as QueryString from "query-string"
import { useCookies } from "react-cookie"
import { Redirect } from "react-router-dom"

function Login(props: any) {
  const params = QueryString.parse(props.location.search)
  const [, setCookie] = useCookies([
    "access_token",
    "refresh_token",
    "expires_at",
  ])

  if (params.access_token) {
    const options = { path: "/" }

    setCookie("access_token", params.access_token, options)
    setCookie("refresh_token", params.refresh_token, options)
    setCookie("expires_at", new Date().getTime() + 1000 * 60 * 60, options)
  }

  return (
    <div className="app">
      <header className="app-header">
        <a href="http://localhost:4000/spotify/login">Log in with Spotify</a>
        {params.access_token && <Redirect to="/app" />}
      </header>
    </div>
  )
}
export default Login
