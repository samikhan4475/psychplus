import { useEffect, useState } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'
import { useSubscribeLoaded } from './use-loaded'

const useDialog = <T>(name: string) => {
  const { subscribe } = usePubsub()

  const loaded = useSubscribeLoaded(name)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<T>()

  useEffect(() => {
    return subscribe<T>(`${name}:${EventType.Opened}`, (data: T) => {
      if (loaded) {
        setData(data)
        setOpen(true)
      }
    })
  }, [name, loaded, subscribe])

  useEffect(() => {
    return subscribe(`${name}:${EventType.Closed}`, () => {
      setOpen(false)
      setData(undefined)
    })
  }, [name, subscribe])

  return { open, data }
}

export { useDialog }
