import React from "react"

import { useAsync, PromiseFn } from "react-async"
import { Spinner } from "@blueprintjs/core"

type AsyncRenderProps<T> = {
  fn: PromiseFn<T>
  children: (arg: T) => React.ReactNode
}

function AsyncRender<T>({ fn, children }: AsyncRenderProps<T>) {
  const { data, error, isPending } = useAsync(fn)

  return (
    <>
      {isPending && <Spinner />}
      {error && <div>Error!</div>}
      {data && children(data)}
    </>
  )
}

export default AsyncRender
