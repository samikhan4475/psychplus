'use client'

import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { PATIENT_HISTORY_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const OpenButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${PATIENT_HISTORY_WIDGET}:${EventType.Opened}`)
      }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
