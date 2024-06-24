import { useRouter } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'
import { Problem } from '@psychplus/problems'
import { Tooltip } from '@psychplus/ui/tooltip'
import { createSearchParams } from '@psychplus/utils/url'

interface TableCellLongTextProps {
  text?: string
  maxWidth?: number
  row?: Problem
}

const TableCellLongText = ({
  text,
  maxWidth = 300,
  row,
}: TableCellLongTextProps) => {
  const router = useRouter()

  const handlerData = () => {
    if (row && row.id) {
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
  return (
    <Tooltip content={text || ''} delayDuration={250} className="max-w-[200px]">
      <Text
        size="1"
        style={{ maxWidth: `${maxWidth}px` }}
        className="block overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={handleClick}
      >
        {text}
      </Text>
    </Tooltip>
  )
}

export { TableCellLongText }
