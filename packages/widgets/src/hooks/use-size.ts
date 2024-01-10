import { RefObject, useEffect, useLayoutEffect, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'

interface Size {
  height: number
  width: number
}

const usePublishSize = (name: string, ref: RefObject<HTMLDivElement>) => {
  const { publish } = usePubsub()
  const [size, setSize] = useState<DOMRect>()

  useLayoutEffect(() => {
    setSize(ref.current?.getBoundingClientRect())
  }, [ref])

  useEffect(() => {
    if (size) {
      publish(`${name}:${EventType.Size}`, {
        height: size.height,
        width: size.width,
      })
    }
  }, [size, name, publish])

  useResizeObserver(ref, (entry) => {
    setSize(entry.contentRect)
  })
}

const useSubscribeSize = (name: string) => {
  const { subscribe } = usePubsub()
  const [size, setSize] = useState<Size>()

  useEffect(() => {
    return subscribe<Size>(`${name}:${EventType.Size}`, (value) => {
      setSize(value)
    })
  }, [name, subscribe])

  const height = size?.height ? size.height : 0
  const width = size?.width ? size.width : 0

  return { height, width }
}

export { usePublishSize, useSubscribeSize }
