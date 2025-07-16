import { Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TriangleAlert } from 'lucide-react'
import { LongTextCell } from '@/components'
import { PharmacyNotificationDrugModel } from '../types'

interface MedicineNameCellProps {
  row: Row<PharmacyNotificationDrugModel>
}

const MedicineNameCell = ({ row }: MedicineNameCellProps) => {
  return (
    <>
      {row?.original.isControlledSubstance && (
        <TriangleAlert className="min-w-6 text-pp-warning-border" size={15} />
      )}
      <LongTextCell className="w-[300px]">
        {row?.original?.drugDescription}
        {row?.original?.deaSchedule && (
          <Text weight="regular" size="1" className={`text-pp-red w-[150px]`}>
            &nbsp;&nbsp;{row?.original?.deaSchedule.toUpperCase()}
          </Text>
        )}
      </LongTextCell>
    </>
  )
}

export default MedicineNameCell
