import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { usePubsub } from '@psychplus/utils/event'
import { CREATE_REFERRAL_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const AddReferralButton = () => {
  const { publish } = usePubsub()

  return (
    <Button
      size="1"
      onClick={() => {
        publish(`${CREATE_REFERRAL_WIDGET}:${EventType.Opened}`)
      }}
    >
      <PlusIcon />
      Add
    </Button>
  )
}

export { AddReferralButton }
