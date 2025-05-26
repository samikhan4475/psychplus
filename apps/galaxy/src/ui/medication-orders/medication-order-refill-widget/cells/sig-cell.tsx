import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { MedicationRefill } from '../types'

interface CellSigProps {
  row: Row<MedicationRefill>
}

const SigCell = ({ row }: CellSigProps) => {
  const drug = row.original?.drugList?.[0]
  return (
    <LongTextCell className="w-[150px]">
      {drug?.drugSignatureList?.[0]?.signatureText}
    </LongTextCell>
  )
}

export default SigCell
