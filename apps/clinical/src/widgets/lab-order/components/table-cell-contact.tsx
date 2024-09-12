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
  isLight?: boolean
  patientId?: string | null
  appointmentId?: string | null
}

const TableCellLongText = ({
  text,
  maxWidth = 300,
  row,
  patientId,
  appointmentId,
  isLight,
}: TableCellLongTextProps) => {
  const router = useRouter()
  const handlerData = () => {
    if (row?.id) {
      const searchParams = createSearchParams({
        appointmentId: appointmentId,
        orderId: row.id,
        patientId: patientId,
      })
      router.push(`/widgets/add-lab-orders-notes?${searchParams.toString()}`)
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
    <Tooltip content={text || ''} delayDuration={250} className="max-w-[80px]">
      <Text
        size="1"
        weight={isLight ? 'light' : 'medium'}
        className={ cn(
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
