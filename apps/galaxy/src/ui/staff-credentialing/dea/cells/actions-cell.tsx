import {
  CheckboxIcon,
  CounterClockwiseClockIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TableEditIcon } from '@/components/icons'
import { useStore } from '../../store'
import { SchemaType } from '../schema'

const ActionsCell = ({
  rowIndex,
  onSubmit,
}: {
  onSubmit: (data: SchemaType, rowIndex: number) => void
  rowIndex: number
}) => {
  const form = useFormContext<SchemaType>()
  const { editingRow, setEditingRow, setHistoryRow } = useStore()

  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      {editingRow === null || editingRow !== rowIndex ? (
        <>
          <IconButton variant="ghost" onClick={() => setHistoryRow(rowIndex)}>
            <CounterClockwiseClockIcon className="text-black cursor-pointer" />
          </IconButton>

          <IconButton variant="ghost" onClick={() => setEditingRow(rowIndex)}>
            <TableEditIcon height={18} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton variant="ghost" onClick={() => setEditingRow(null)}>
            <CrossCircledIcon />
          </IconButton>
          <IconButton
            variant="ghost"
            onClick={form.handleSubmit((data) => {
              onSubmit(data, rowIndex)
            })}
          >
            <CheckboxIcon width={22} height={18} />
          </IconButton>
        </>
      )}
    </Flex>
  )
}

export { ActionsCell }
