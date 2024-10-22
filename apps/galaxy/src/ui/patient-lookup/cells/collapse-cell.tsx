'use client'

import { Button, Flex, Popover } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { PatientHistoryTable } from '../patient-history-table'
import { Patient } from '../types'

const CollapseCell = ({
  row: {
    toggleSelected,
    getIsSelected,
    original: { id: patientId },
  },
}: PropsWithRow<Patient>) => {
  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      onClick={(e) => e.stopPropagation()}
    >
      <Popover.Root onOpenChange={toggleSelected} modal>
        <Popover.Trigger>
          <Button
            className="text-black !outline-none"
            type="button"
            variant="ghost"
            color="gray"
            size="1"
          >
            {getIsSelected() ? (
              <ChevronDownIcon size={16} />
            ) : (
              <ChevronRightIcon size={16} />
            )}
          </Button>
        </Popover.Trigger>
        <Popover.Content
          className="-mb-2 -mt-2 w-screen max-w-[calc(100vw_-_32px)] rounded-1 !p-0"
          align="start"
          alignOffset={3}
        >
          <PatientHistoryTable patientId={patientId} />
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { CollapseCell }
