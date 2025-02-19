'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddVacationButton } from './add-vacation-button'

interface VacationTimeHeaderProps {
  staffId: string
}
const VacationTimeHeader = ({ staffId }: VacationTimeHeaderProps) => {
  return (
    <TabContentHeading
      title="Vacation Time"
      className="border-white w-full flex-1 px-2 py-1"
    >
      <Flex flexGrow="1" justify="end" align="center">
        <Flex align="center" gap="2">
          <AddVacationButton staffId={staffId} />
        </Flex>
      </Flex>
    </TabContentHeading>
  )
}

export { VacationTimeHeader }
