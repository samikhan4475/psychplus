import { useFieldArray } from 'react-hook-form'
import { DeleteActionButton } from '@/ui/clinic-schedule/shared'

const DeleteServiceCell = ({ id }: { id: number }) => {
  const { remove } = useFieldArray({
    name: 'services',
  })

  return <DeleteActionButton onClick={() => remove(id)} />
}

export { DeleteServiceCell }
