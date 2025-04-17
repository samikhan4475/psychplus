import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './organization-roles-list-filter-form'
import { useStore } from './store'

const ClearButton = () => {
  const { id } = useParams<{ id: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useFormContext<SchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      roleId: '',
      recordStatus: '',
      partialDisplayName: '',
      actorCategory: '',
    })
    return search({
      organizationId: id ?? '',
    })
  }

  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
