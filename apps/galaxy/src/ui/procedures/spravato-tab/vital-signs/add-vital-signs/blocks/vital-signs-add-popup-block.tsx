import { useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { PlusIcon, X } from 'lucide-react'
import { cn } from '@/utils'
import { AddVitalSignsForm } from './add-vital-signs-form'
import { AddVitalSignsTable } from './add-vital-signs-table'

interface VitalSignsAddPopupProps {
  disabled?: boolean
  generateVitalButtons: (vitalSigns: []) => void
  timeSlot: number
}

const VitalSignsAddPopup = ({
  disabled = false,
  generateVitalButtons,
  timeSlot,
}: VitalSignsAddPopupProps) => {
  const [addNewRecord, setAddNewRecord] = useState(false)

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open && addNewRecord) {
          setAddNewRecord(false)
        }
      }}
    >
      <Dialog.Trigger>
        <Button
          className={cn(
            'border-pp-grey bg-white h-6 rounded-2 border border-solid',
            disabled && 'bg-pp-states-disabled',
          )}
          type="button"
          disabled={disabled}
        >
          <Text className="text-pp-black-3 text-2">Add Vitals</Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[1000px] rounded-4 p-6 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-[600]">
          Add Vitals
        </Dialog.Title>
        <Flex direction="column" gap="2">
          <Button
            className="border-pp-grey bg-white h-6  self-end rounded-2 border border-solid"
            type="button"
            onClick={() => setAddNewRecord(true)}
          >
            <PlusIcon width={12} height={12} className="text-pp-black-3 " />
            <Text className="text-pp-black-3 text-1">Add</Text>
          </Button>
          <Flex direction="row">
            <AddVitalSignsTable />
            {addNewRecord && (
              <AddVitalSignsForm
                generateVitalButtons={generateVitalButtons}
                closeNewRecord={() => setAddNewRecord(false)}
                timeSlot={timeSlot}
              />
            )}
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { VitalSignsAddPopup }
