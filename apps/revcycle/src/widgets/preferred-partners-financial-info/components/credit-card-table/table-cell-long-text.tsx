import { Text } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'
import { useStore } from '../../store'
import { CreditCard } from '../../types'

interface TableCellLongTextProps {
  text?: string
  row?: CreditCard
}

const TableCellLongText = ({ text, row }: TableCellLongTextProps) => {
  const selectCardDialogOpen = useStore((state) => state.selectCardDialogOpen)
  const { setSelectedCard } = useStore((state) => ({
    setSelectedCard: state.setSelectedCard,
  }))
  const { setSelectCardDialogOpen } = useStore((state) => ({
    setSelectCardDialogOpen: state.setSelectCardDialogOpen,
  }))

  const handlerData = () => {
    if (row?.id && selectCardDialogOpen) {
      setSelectedCard(row)
      setSelectCardDialogOpen(false)
    }
  }

  const handleClick = row ? handlerData : undefined
  if (!text) {
    return <TableCellEmpty />
  }
  return (
    <Text
      size="1"
      className="block overflow-hidden text-ellipsis whitespace-nowrap"
      onClick={handleClick}
    >
      {text}
    </Text>
  )
}

export { TableCellLongText }
