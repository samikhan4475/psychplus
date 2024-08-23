import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'
import { TextField } from '@psychplus/ui/text-field'
import { Charge } from '../types'

interface TableCellProps {
  row: {
    original: Charge
  }
}

const TableCellModifiers = ({
  row: { original: chargeRecord },
}: TableCellProps) => {
  return (
    <Flex>
      <Box className="flex-1">
        <TextField.Root size="1">
          <TextField.Root placeholder="M1" />
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Box className="flex-1">
        <TextField.Root size="1">
          <TextField.Root placeholder="M2" />
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Box className="flex-1">
        <TextField.Root size="1">
          <TextField.Root placeholder="M3" />
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Box className="flex-1">
        <TextField.Root size="1">
          <TextField.Root placeholder="M4" />
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
    </Flex>
  )
}

export { TableCellModifiers }
