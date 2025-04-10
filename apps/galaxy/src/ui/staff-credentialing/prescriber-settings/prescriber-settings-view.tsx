import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { State } from '@/types'
import { PrescriberTable } from './prescriber-table'

const PrescriberSettingsView = ({
  states,
  staffId,
}: {
  states: State[]
  staffId: string
}) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <TabContentHeading title="Prescriber Settings" />
      <PrescriberTable states={states} staffId={staffId} />
    </Flex>
  )
}

export { PrescriberSettingsView }
