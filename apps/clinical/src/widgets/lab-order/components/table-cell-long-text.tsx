import { useRouter } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'
import { Tooltip } from '@psychplus/ui/tooltip'
import { createSearchParams } from '@psychplus/utils/url'
import { LabOrder } from '../types'
import { cn } from '@psychplus/ui/cn'

interface TableCellLongTextProps {
  text?: string
  maxWidth?: number
  row?: LabOrder
}

const TableCellLongText = ({
  text,
  maxWidth = 300,
  row,
}: TableCellLongTextProps) => {
  const router = useRouter()

  const handlerData = () => {
    if (row?.id) {
      const searchParams = createSearchParams({ id: row.id })
      router.push(
        `/widgets/preferred-partner-details?${searchParams.toString()}`,
      )
    }
  }

  const handleClick = row ? handlerData : undefined
  if (!text) {
    return <TableCellEmpty />
  }
  const maxWidthStyle = cn({
    'max-w-full': !maxWidth,
    [`max-w-${maxWidth}px`]: maxWidth
  });

  return (
    <Tooltip content={text || ''} delayDuration={250} className="max-w-[200px]">
      <Text
        size="1"
        className={cn(
          'block',
          'overflow-hidden',
          'text-ellipsis',
          'whitespace-nowrap',
          maxWidthStyle 
        )}
        onClick={handleClick}
      >
        {text}
      </Text>
    </Tooltip>
  )
}

export { TableCellLongText }
