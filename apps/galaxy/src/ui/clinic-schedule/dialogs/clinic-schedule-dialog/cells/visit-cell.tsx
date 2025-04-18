import { Flex, IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import { LongTextCell } from '@/components'

const VisitCell = ({ visit, id }: { visit?: string; id: number }) => {
  const { remove } = useFieldArray({
    name: 'visitTypes',
  })
  return (
    <Flex align="center" justify="between" className="w-full">
      <LongTextCell>{visit}</LongTextCell>
      <IconButton
        variant="ghost"
        color="gray"
        type="button"
        onClick={() => remove(id)}
      >
        <Trash2 width={16} height={16} />
      </IconButton>
    </Flex>
  )
}

export { VisitCell }
