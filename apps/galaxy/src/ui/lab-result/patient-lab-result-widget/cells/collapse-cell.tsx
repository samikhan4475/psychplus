import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { cn } from '@/utils'
import { LabResultResponseUpdated } from '../utils'

const CollapseCell = ({
  row,
  className,
}: PropsWithRow<LabResultResponseUpdated> & { className?: string }) => {
  const handleCollapseToggle = () => {
    row.toggleExpanded(!row.getIsExpanded())
  }

  return (
    <Flex
      onClick={handleCollapseToggle}
      className={cn('text-black cursor-pointer !outline-none', className)}
    >
      <TextCell>{row.original.testName}</TextCell>
    </Flex>
  )
}

export { CollapseCell }
