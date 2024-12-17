'use client'

import { Button, Flex, Heading, Popover } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon, X } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { Users } from '../types'
import { OrganizationUserHistoryTable } from '../organization-user-history-table'

const CollapseCell = ({
  row: {
    toggleSelected,
    getIsSelected,
    original: { id: patientId },
  },
}: PropsWithRow<Users>) => {
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
          className="-mb-2 -mt-2 w-screen max-w-[calc(100vw_-_232px)] rounded-1 p-1"
          align="start"
          alignOffset={3}
        >
          <Flex className="w-full" direction="column">
            <Flex justify="between" align="center" gap="2" px="2" pt="1">
              <Heading size="3" weight="medium">History</Heading>
              <Popover.Close>
                <X
                  size={16}
                  strokeWidth={2}
                  className="text-black cursor-pointer"
                />
              </Popover.Close>
            </Flex>
            <OrganizationUserHistoryTable />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { CollapseCell }
