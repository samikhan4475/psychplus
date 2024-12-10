import { Flex } from '@radix-ui/themes'
import { ColumnHeader } from '@/components'
import { AddAgeGroupPopover } from '../add-group-popover'
import { RequiredColumnHeader } from './required-column-header'

const AddAgeGroupHeader = () => {
  return (
    <Flex height="100%" align="center" justify="between" className="pr-1">
      <Flex>
        <RequiredColumnHeader>
          <ColumnHeader label="Age Group" />
        </RequiredColumnHeader>
      </Flex>
      <AddAgeGroupPopover />
    </Flex>
  )
}

export { AddAgeGroupHeader }
