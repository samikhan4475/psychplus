import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './organization-staff-list-filter-form'
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
      address1: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      npi: '',
      phone: '',
      email: '',
      statuses: [''],
      gender: '',
      spokenLanguage: '',
      honors: [''],
      roleCodes: [''],
      staffType: '',
      providerType: '',
      practicesIds: [''],
      providerAttributionCodes: [''],
    })
    return search({ organizationsIds: [id] })
  }

  return (
    <Button
      color="gray"
      className="text-black mr-2"
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
