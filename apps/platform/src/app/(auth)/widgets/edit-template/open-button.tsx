'use client'

import { Button } from '@radix-ui/themes'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const OpenButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${EDIT_TEMPLATE_WIDGET}:${EventType.Opened}`)
    }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
