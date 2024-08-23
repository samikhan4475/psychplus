import { Box, Flex } from '@radix-ui/themes'
import { TextField } from '@psychplus/ui/text-field'
import { Charge } from '../types'

interface TableCellProps {
  row: {
    original: Charge
  }
}

const TableCellDiagnoses = ({
  row: { original: chargeRecord },
}: TableCellProps) => {
  return (
    <Flex>
      <Box className="flex-1">
        <TextField.Root placeholder="DX1" size="1" />
      </Box>
      <Box className="flex-1">
        <TextField.Root placeholder="DX2" size="1" />
      </Box>
      <Box className="flex-1">
        <TextField.Root placeholder="DX3" size="1" />
      </Box>
      <Box className="flex-1">
        <TextField.Root placeholder="DX4" size="1" />
      </Box>
    </Flex>
  )
}

export { TableCellDiagnoses }
