import { Flex } from '@radix-ui/themes'
import { DollarIcon, EditIcon } from '@/components/icons'

const ActionsCell = () => {
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <DollarIcon />
      <EditIcon />
    </Flex>
  )
}

export { ActionsCell }
