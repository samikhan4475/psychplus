'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, ScrollArea } from '@radix-ui/themes'
import { VitalsTabsContent, VitalsTabsList } from '../../tabs'
import { VitalsFilterForm } from '../../vitals-filter-form'

const VitalsHistoryButton = ({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          Hx
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-h-[720px] max-w-[1400px]">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-[600]">
          Vitals History
        </Dialog.Title>

        <Flex direction="column" gap="2" className="h-full">
          <Flex
            gap="2"
            align="center"
            className="bg-white sticky top-0 z-10 py-2"
          >
            <VitalsTabsList />
            <VitalsFilterForm
              patientId={patientId}
              appointmentId={appointmentId}
            />
          </Flex>

          <ScrollArea className="max-h-[calc(100vh_-_250px)] flex-1 overflow-y-auto pr-2.5">
            <VitalsTabsContent
              patientId={patientId}
              appointmentId={appointmentId}
              showAddToNote={true}
            />
          </ScrollArea>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { VitalsHistoryButton }
