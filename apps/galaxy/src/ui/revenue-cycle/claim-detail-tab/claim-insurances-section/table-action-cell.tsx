import { Flex, IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'

const ActionsCell = () => {
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <IconButton variant="ghost">
        <TableEditIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
