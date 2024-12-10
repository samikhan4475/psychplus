import { ComponentProps } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'

const DeleteActionButton = ({ onClick }: ComponentProps<typeof IconButton>) => {
  return (
    <Flex justify="center" align="center" width="100%">
      <IconButton variant="ghost" color="gray" type="button" onClick={onClick}>
        <Trash2 width={16} height={16} />
      </IconButton>
    </Flex>
  )
}

export { DeleteActionButton }
