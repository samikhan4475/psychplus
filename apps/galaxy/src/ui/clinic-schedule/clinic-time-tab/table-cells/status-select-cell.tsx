import { Flex } from '@radix-ui/themes'
import { SelectCell } from '@/components'
import { StatusClockPopover } from '../status-clock-popover'

const StatusSelectCell = () => {
  return (
    <Flex gapX="1" className="min-w-32" align="center">
      <StatusClockPopover />
      <SelectCell className="flex-1" options={[]} />
    </Flex>
  )
}

export { StatusSelectCell }
