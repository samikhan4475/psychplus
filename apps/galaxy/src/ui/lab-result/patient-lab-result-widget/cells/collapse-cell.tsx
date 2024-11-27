import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { cn } from '@/utils'

const CollapseCell = ({
  row,
  className,
}: PropsWithRow<any> & { className?: string }) => {
  //TODO: replace any with proper type once data schema is decided on the backend
  const handleCollapseToggle = () => {
    row.toggleExpanded(!row.getIsExpanded())
  }

  return (
    <Flex
      onClick={handleCollapseToggle}
      className={cn('text-black cursor-pointer !outline-none', className)}
    >
      <TextCell>{row.original.testPanel}</TextCell>
    </Flex>
  )
}

export { CollapseCell }
