import { Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TriangleAlert } from 'lucide-react'
import { LongTextCell } from '@/components'
import { MedicationRefill } from '../types'

interface MedicineNameCellProps {
  row: Row<MedicationRefill>
}

const MedicineNameCell = ({ row }: MedicineNameCellProps) => {
  const drug = row.original?.drugList?.[0]
  return (
    <>
      {drug?.isControlledSubstance && (
        <TriangleAlert className="min-w-6 text-pp-warning-border" size={15} />
      )}
      <LongTextCell className="w-[300px]">
        {drug?.drugDescription}
        {drug?.deaSchedule && (
          <Text weight="regular" size="1" className={`text-pp-red w-[150px]`}>
            &nbsp;&nbsp;{drug?.deaSchedule.toUpperCase()}
          </Text>
        )}
      </LongTextCell>
    </>
  )
}

export default MedicineNameCell
