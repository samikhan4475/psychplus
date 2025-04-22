import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'
import { MedicationRefill, RefillMedicationType } from '../types'

interface MedicineDosageCellProps {
  row: Row<MedicationRefill>
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
  const quantityUnitOfMeasureCode =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.quantityUnitOfMeasureCode ?? ''

  const displayValue = getDisplayValue(
    PrescriptionUnitList,
    quantityUnitOfMeasureCode,
  )
  return <TextCell>{displayValue?.display ?? ''}</TextCell>
}

export default MedicineDosageCell
