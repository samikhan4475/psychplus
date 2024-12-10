import { Flex } from '@radix-ui/themes'
import { ColumnHeader } from '@/components'
import { AddTelestatePopover } from '../add-telestate-popover'

const AddTelestateHeader = () => {
  return (
    <Flex height="100%" align="center" justify="between" className="pr-1">
      <ColumnHeader label="Add Tele states" />
      <AddTelestatePopover />
    </Flex>
  )
}

export { AddTelestateHeader }
