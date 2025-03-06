'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from './store'
import { SchemaType } from './submitter-list-filter-form'

const ResetButton = () => {
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useFormContext<SchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      name: '',
      username: '',
      email: '',
      submitterId: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      contactPerson: '',
      phone: '',
      fax: '',
    })
    return search({
      practiceId: practiceId ?? '',
    })
  }
  return (
    <Button
      color="gray"
      className="text-black w-[50px]"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
