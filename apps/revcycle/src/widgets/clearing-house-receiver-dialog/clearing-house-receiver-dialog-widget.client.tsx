'use client'

import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { usePubsub } from '@psychplus/utils/event'
import { CREATE_CLEARING_HOUSE_RECEIVER } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { ClearingHouseReceiverForm } from './components/clearing-house-receiver-form'
import { ClearingHouseReceiver, StateOption } from './types'

const ClearingHouseReceiverDialogWidgetClient = ({
  data,
  usStatesCodeSets,
}: {
  data?: ClearingHouseReceiver
  usStatesCodeSets?: StateOption[]
}) => {
  const { publish } = usePubsub()

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          className="bg-[#151B4A]"
          size="1"
          onClick={() => {
            publish(`${CREATE_CLEARING_HOUSE_RECEIVER}:${EventType.Opened}`)
          }}
        >
          {data ? (
            'Edit Receiver'
          ) : (
            <>
              <PlusIcon />
              Add Receiver
            </>
          )}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[1000px] rounded-6 p-6 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          {data ? 'Edit Receiver' : 'Add Receiver'}
        </Dialog.Title>
        <ClearingHouseReceiverForm
          isEdit={true}
          usStatesCodeSets={usStatesCodeSets}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClearingHouseReceiverDialogWidgetClient }
