import { useEffect } from 'react'
import { usePubsub } from '@psychplus/utils/event'
import { EventType } from '../events'

/**
 * This hook ensures that a click outside of the widget iframe will be detected from inside the widget
 * and used to close any open popovers.
 */
const usePublishClosePopover = (name: string) => {
  const { publish } = usePubsub()

  useEffect(() => {
    const listener = () => {
      publish(`${name}:${EventType.ClosePopover}`)
    }

    document.body.addEventListener('click', listener)

    return () => {
      document.body.removeEventListener('click', listener)
    }
  }, [name, publish])
}

/**
 * This hook listens to the close popover event and will close any popover if there is one open.
 * Utilize this hook from inside of a widget iframe in order to ensure that clicks outside of the
 * iframe will close open popovers inside the iframe.
 */
const useSubscribeClosePopover = (name: string) => {
  const { subscribe } = usePubsub()

  useEffect(() => {
    return subscribe(`${name}:${EventType.ClosePopover}`, () => {
      document.getElementById('popover-close')?.click()
    })
  }, [name, subscribe])
}

export { usePublishClosePopover, useSubscribeClosePopover }
