import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { MedicationRefill, RefillMedicationType } from '../types'

interface CellSigProps {
  row: Row<MedicationRefill>
}

const SigCell = ({ row }: CellSigProps) => {
  const signatureText = row.original?.drugList?.find(
    (drug) => drug.medicationType === RefillMedicationType.MedicationType,
  )?.drugSignatureList?.[0]?.signatureText
  return <LongTextCell className="w-[150px]">{signatureText}</LongTextCell>
}

export default SigCell
