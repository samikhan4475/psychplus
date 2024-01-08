import { RefObject, useEffect, useState } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'

interface Size {
  height: number
  width: number
}

const usePublishSize = (name: string, ref: RefObject<HTMLDivElement>) => {
  const { publish } = usePubsub()

  useEffect(() => {
    if (ref.current) {
      publish(`${name}:${EventType.Size}`, {
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      })
    }
  }, [ref, name, publish])
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
