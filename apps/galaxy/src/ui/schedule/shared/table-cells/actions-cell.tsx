import { Flex } from '@radix-ui/themes'
import { DollarIcon, TableEditIcon } from '@/components/icons'

const ActionsCell = () => {
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <DollarIcon />
      <TableEditIcon height={18} />
    </Flex>
  )
}

export { ActionsCell }
