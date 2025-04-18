import { Flex } from '@radix-ui/themes'
import { ColumnHeader } from '@/components'
import { AddVisitPopover } from '../add-visits-popover'
import { RequiredColumnHeader } from './required-column-header'

const AddVisitHeader = () => {
  return (
    <Flex height="100%" align="center" justify="between" className="pr-1">
      <Flex>
        <RequiredColumnHeader>
          <ColumnHeader label="Visit Types" />
        </RequiredColumnHeader>
      </Flex>
      <AddVisitPopover />
    </Flex>
  )
}

export { AddVisitHeader }
