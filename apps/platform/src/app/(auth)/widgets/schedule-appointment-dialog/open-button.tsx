'use client'

import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const OpenButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${SCHEDULE_APPOINTMENT_DIALOG}:${EventType.Opened}`)
      }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
