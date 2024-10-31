'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './receiver-list-filter-form'
import { useStore } from './store'

const ResetButton = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useFormContext<SchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      address1: '',
      address2: '',
      state: '',
      city: '',
      zip: '',
      phone: '',
      fax: '',
      email: '',
      receiverId: '',
      receiverName: '',
    })
    return search({})
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
