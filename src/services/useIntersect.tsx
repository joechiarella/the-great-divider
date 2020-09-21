import { useEffect, useRef, useState } from "react"

type IntersectType = {
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

export default ({
  root = null,
  rootMargin,
  threshold = 0,
}: IntersectType): [
  React.Dispatch<React.SetStateAction<Element | null>>,
  IntersectionObserverEntry | undefined
] => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<Element | null>(null)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new window.IntersectionObserver(
      ([entry]) => updateEntry(entry),
      {
        root,
        rootMargin,
        threshold,
      }
    )
    const { current: currentObserver } = observer

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node, root, rootMargin, threshold])

  return [setNode, entry]
}
