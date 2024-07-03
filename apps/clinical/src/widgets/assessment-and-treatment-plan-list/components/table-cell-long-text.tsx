import { useRouter } from 'next/navigation'
import { Text, Tooltip } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'
import { createSearchParams } from '@psychplus/utils/url'

interface TableCellLongTextProps {
  text?: string
  maxWidth?: number
  row?: any
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
    <Tooltip content={text} delayDuration={250} className="max-w-[200px]">
      <Text
        size="1"
        className={`max-w-[${maxWidth}px] block overflow-hidden text-ellipsis whitespace-nowrap`}
        onClick={handleClick}
      >
        {text}
      </Text>
    </Tooltip>
  )
}

export { TableCellLongText }
