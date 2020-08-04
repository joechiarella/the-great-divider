import React, { useContext } from "react"
import { Card, Spinner } from "@blueprintjs/core"
import { useAsync } from "react-async"
import SpotifyContext from "./SpotifyContext"

function Me() {
  const { getMe } = useContext(SpotifyContext)!
  const { data, error, isPending } = useAsync(getMe)

  return (
    <Card elevation={2}>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && (
        <>
          <img width="150" alt="idk" src={data.images[0].url} />

          <dl>
            <dt>Display name</dt>
            <dd>{data.display_name}</dd>
            <dt>Id</dt>
            <dd>{data.id}</dd>
            <dt>Email</dt>
            <dd>{data.email}</dd>
            <dt>Spotify URI</dt>
            <dd>
              <a href={data.external_urls.spotify}>
                {data.external_urls.spotify}
              </a>
            </dd>
            <dt>Link</dt>
            <dd>
              <a href={data.href}>{data.href}</a>
            </dd>
            <dt>Profile Image</dt>
            <dd>
              <a href={data.images[0].url}>{data.images[0].url}</a>
            </dd>
            <dt>Country</dt>
            <dd>{data.country}</dd>
          </dl>
        </>
      )}
    </Card>
  )
}

export default Me
