import { RefObject, useEffect, useLayoutEffect, useState } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'

const useSubscribeParent = (parent: string, self: string, ref: RefObject<HTMLDivElement>) => {
  const { subscribe, publish } = usePubsub()
  const [size, setSize] = useState<DOMRect>()

  useLayoutEffect(() => {
    setSize(ref.current?.getBoundingClientRect())
  }, [ref])

  useEffect(() => {
    if (!size) return;
    return subscribe(`${parent}:${EventType.Loaded}`, () => {
      publish(`${self}:${EventType.Loaded}`)
      publish(`${self}:${EventType.Size}`, {
        height: size.height,
        width: size.width,
      })
    })
  }, [parent, subscribe, publish, self, size])

}

export { useSubscribeParent }
