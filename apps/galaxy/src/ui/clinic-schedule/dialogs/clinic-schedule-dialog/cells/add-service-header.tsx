import { Flex } from '@radix-ui/themes'
import { ColumnHeader } from '@/components'
import { AddServicePopover } from '../add-service-popover'
import { RequiredColumnHeader } from './required-column-header'

const AddServiceHeader = () => {
  return (
    <Flex height="100%" align="center" justify="between" className="pr-1">
      <RequiredColumnHeader>
        <ColumnHeader label="Add Service" />
      </RequiredColumnHeader>
      <AddServicePopover />
    </Flex>
  )
}

export { AddServiceHeader }
