'use client'

import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { OTP_DIALOG } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const OpenButton = () => {
  const { publish, subscribe } = usePubsub()

  subscribe(`${OTP_DIALOG}:submit`, (data) => {
    console.log('submit:', data)
  })

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${OTP_DIALOG}:${EventType.Opened}`, {
          email: 'penshine93@mailinator.com',
        })
      }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
