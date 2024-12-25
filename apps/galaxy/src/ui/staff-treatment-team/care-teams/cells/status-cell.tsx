import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { ClinicalStaffList } from '../../types'

interface StatusCellProps {
  row: Row<ClinicalStaffList>
}
const StatusCell = ({ row }: StatusCellProps) => {
  const { status } = row.original
  return (
    <Flex className="items-center" gap={'1'}>
      <CounterClockwiseClockIcon className="text-black cursor-pointer" />
      <Text>{status}</Text>
    </Flex>
  )
}

export { StatusCell }
