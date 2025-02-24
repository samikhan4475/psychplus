import { Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PatientMedication } from '../types'

interface PharmacyCellProps {
  row: Row<PatientMedication>
}

const PharmacyCell = ({ row }: PharmacyCellProps) => {
  const { pharmacyName } = row.original.medicationDetails

  return (
    <Flex className="w-40 gap-2" align="center">
      <Text className='font-[11px]'>{pharmacyName || 'N/A'}</Text>
    </Flex>
  )
}

export { PharmacyCell }
