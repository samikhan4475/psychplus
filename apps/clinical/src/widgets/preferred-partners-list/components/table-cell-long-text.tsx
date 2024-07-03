import { useRouter } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'
import { createSearchParams } from '@psychplus/utils/url'
import { useStore } from '../store'
import { PreferredPartner } from '../types'

interface TableCellLongTextProps {
  text?: string
  row?: PreferredPartner
}

const TableCellLongText = ({ text, row }: TableCellLongTextProps) => {
  const router = useRouter()
  const token = useStore((state) => state.token)

  const handlerData = () => {
    if (row?.id) {
      const searchParams = createSearchParams({ id: row.id, token })
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
    <Text
      size="1"
      className={`block w-[300px] overflow-hidden text-ellipsis whitespace-nowrap`}
      onClick={handleClick}
    >
      {text}
    </Text>
  )
}

export { TableCellLongText }
