import { useEffect, useState } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'

const usePublishLoaded = (name: string) => {
  const { publish } = usePubsub()

  useEffect(() => {
    publish(`${name}:${EventType.Loaded}`)
  }, [name, publish])
}

const useSubscribeLoaded = (name: string) => {
  const { subscribe } = usePubsub()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    return subscribe(`${name}:${EventType.Loaded}`, () => {
      setLoaded(true)
    })
  }, [name, subscribe])

  return loaded
}

export { usePublishLoaded, useSubscribeLoaded }
