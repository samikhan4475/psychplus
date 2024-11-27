import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { TableEditIcon } from '@/components/icons'
import { ClinicTime } from '../../types'

const ActionCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicTime>) => {
  return (
    <Flex justify="start" px="1" align="center">
      <IconButton variant="ghost">
        <TableEditIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ActionCell }
