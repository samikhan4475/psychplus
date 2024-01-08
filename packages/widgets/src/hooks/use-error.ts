import { useEffect, useState } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'

const usePublishError = (name: string) => {
  const { publish } = usePubsub()

  useEffect(() => {
    publish(`${name}:${EventType.Error}`)
  }, [name, publish])
}

const useSubscribeError = (name: string) => {
  const { subscribe } = usePubsub()
  const [error, setError] = useState(false)

  useEffect(() => {
    return subscribe(`${name}:${EventType.Error}`, () => {
      setError(true)
    })
  }, [name, subscribe])

  return error
}

export { usePublishError, useSubscribeError }
