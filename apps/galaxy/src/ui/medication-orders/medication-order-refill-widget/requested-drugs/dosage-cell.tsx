import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'
import { MedicationRefill, PharmacyNotificationDrugModel } from '../types'

interface MedicineDosageCellProps {
  row: Row<PharmacyNotificationDrugModel>
}

const getDisplayValue = (
  PrescriptionUnitList: SharedCode[],
  quantityUnitOfMeasureCode: string,
) =>
  PrescriptionUnitList.find((obj) =>
    obj.attributes?.some((attr) => attr.value === quantityUnitOfMeasureCode),
  )

const MedicineDosageCell = ({ row }: MedicineDosageCellProps) => {
  const PrescriptionUnitList = useCodesetCodes(CODESETS.PrescriptionUnitList)
  const displayValue = getDisplayValue(
    PrescriptionUnitList,
    row?.original.quantityUnitOfMeasureCode ?? '',
  )
  return (
    <TextCell>
      {`${row.original?.quantityValue} 
      ${displayValue?.display ?? ''}`}
    </TextCell>
  )
}

export default MedicineDosageCell
