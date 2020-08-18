import { useContext } from "react"
import SpotifyContext, { Track } from "../components/SpotifyContext"
import {
  from,
  zip,
  Subject,
  Observable,
  partition,
  merge,
  ReplaySubject,
} from "rxjs"
import {
  map,
  bufferCount,
  mergeMap,
  tap,
  flatMap,
  mergeAll,
  concatAll,
  multicast,
  filter,
  refCount,
  take,
} from "rxjs/operators"

export type CheckType = {
  id: string
  saved: boolean
}

const cache: { [key: string]: boolean } = {}

const useSavedTrackService = () => {
  const { checkSavedTracks } = useContext(SpotifyContext)!

  const checkTracks = (tracks: Track[]) => {
    const subject = new ReplaySubject<CheckType>()

    const trackIds$ = from(tracks).pipe(map((track) => track.id))

    const [cached$, notCached$] = partition(trackIds$, (id) =>
      cache.hasOwnProperty(id)
    )

    const cachedResults$ = cached$.pipe(map((id) => ({ id, saved: cache[id] })))

    const freshResults$ = notCached$.pipe(
      bufferCount(50),
      mergeMap((trackIds) =>
        zip(
          from(trackIds),
          from(checkSavedTracks(trackIds)).pipe(flatMap((d) => from(d)))
        )
      ),
      map(([id, saved]) => ({ id, saved })),
      tap(({ id, saved }) => (cache[id] = saved))
    )

    const merged$ = merge(cachedResults$, freshResults$).pipe(
      tap(console.log),
      multicast(subject),
      refCount()
    )

    console.log("cache size", Object.keys(cache).length)

    return merged$
  }

  const checkTrack = (
    idToCheck: string,
    obs: Observable<CheckType>,
    callback: (arg: CheckType) => void
  ) => {
    obs
      .pipe(
        filter(({ id }) => idToCheck === id),
        take(1)
      )
      .subscribe(callback)
  }

  return { checkTracks, checkTrack }
}

export default useSavedTrackService
