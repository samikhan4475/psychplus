'use client'

import React, { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { AddIcon } from '@/components/icons'
import { AddWaitlistModal } from './add-waitlist-modal'
import { useStore } from './store'
import WaitlistTable from './waitlist-table'

const EngagementTabs = () => {
  const { fetchWaitlists, data } = useStore()
  const [open, setOpen] = useState(false)
  const pathName = usePathname()

  const params = useParams()
  const patientId = params.id

  useEffect(() => {
    if (!patientId) {
      fetchWaitlists({})
    } else {
      fetchWaitlists({ patientIds: [Number(patientId)] })
    }
  }, [fetchWaitlists])

  const isQuickNote = !pathName.includes('management')

  const toggleModal = () => setOpen((prev) => !prev)

  return (
    <Tabs.Root className="flex w-full flex-col" defaultValue={'Waitlist'}>
      <Flex className="z-50">
        <Tabs.List>
          <Tabs.Trigger
            className="data-[state=active]:border-b-white data-[state=active]:bg-white data-[state=active]:border-pp-focus-outline mb-1 rounded-t-1 border border-l-0 border-accent-6 border-b-gray-5 bg-accent-4 p-0 px-2 py-1 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:font-[600] data-[state=active]:text-accent-12"
            value={'Waitlist'}
          >
            Waitlist
          </Tabs.Trigger>
        </Tabs.List>
      </Flex>
      <Tabs.Content
        value={'Waitlist'}
        defaultValue={'Waitlist'}
        className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
      >
        <Flex className="w-full p-[1px]" direction="column" gap="1">
          <Box
            className="bg-white z-[1] flex items-center justify-between rounded-1"
            py="1"
            px="2"
            position="sticky"
            top="0"
          >
            <Heading size="4">Waitlist</Heading>
            {isQuickNote && (
              <Button
                size="1"
                highContrast
                className="h-auto px-1 py-1 text-[11px] font-[300]"
                onClick={toggleModal}
              >
                <AddIcon width={10} height={10} />
                Add Waitlist
              </Button>
            )}
          </Box>
          <Flex direction="column" className="bg-white">
            <WaitlistTable isQuickNote={isQuickNote} waitlists={data ?? []} />
          </Flex>
        </Flex>
        {open && (
          <AddWaitlistModal
            isOpen={open}
            closeDialog={toggleModal}
          />
        )}
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default EngagementTabs
