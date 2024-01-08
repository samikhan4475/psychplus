'use client'

import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_REFERRAL_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const referral = {
  id: 'test',
  patientId: 1278,
  service: 'Therapy',
  servicesStatus: 'Routine',
  contactStatus: 'Pending',
  resourceStatus: 'Active',
  referredByName: {
    firstName: 'Doctor',
    lastName: 'Strange',
    honors: 'MD',
  },
  comments: 'Some comments for you',
}

const OpenButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      className="self-start"
      onClick={() => {
        publish(`${EDIT_REFERRAL_WIDGET}:${EventType.Opened}`, referral)
      }}
    >
      Open
    </Button>
  )
}

export { OpenButton }
