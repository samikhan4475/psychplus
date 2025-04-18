import { useFieldArray } from 'react-hook-form'
import { DeleteActionButton } from '@/ui/clinic-schedule/shared'

const DeleteTelestateCell = ({ id }: { id: number }) => {
  const { remove } = useFieldArray({
    name: 'teleStates',
  })
  return <DeleteActionButton onClick={() => remove(id)} />
}

export { DeleteTelestateCell }
