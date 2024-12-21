import { Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LucideInfo } from 'lucide-react'
import { PatientMedication } from '../types'

interface PharmacyCellProps {
  row: Row<PatientMedication>
}

const PharmacyCell = ({ row }: PharmacyCellProps) => {
  const { pharmacyName } = row.original.medicationDetails

  return (
    <Flex className="w-40 items-center gap-2">
      <LucideInfo fill="red" color="white" />
      <Text className="text-gray-800 font-medium">{pharmacyName || 'N/A'}</Text>
    </Flex>
  )
}

export { PharmacyCell }
