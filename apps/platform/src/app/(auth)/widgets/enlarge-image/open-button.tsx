'use client'

import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { ENLARGE_IMAGE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const OpenButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${ENLARGE_IMAGE_WIDGET}:${EventType.Opened}`)
      }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
