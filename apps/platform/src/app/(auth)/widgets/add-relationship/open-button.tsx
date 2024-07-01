'use client'

import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const OpenButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Opened}`)
      }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
