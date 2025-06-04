'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useLinkAccountStore } from '../store'
import { LinkAccountSchemaType } from '../types'

const ResetButton = () => {
  const { search } = useLinkAccountStore((state) => ({
    search: state.search,
  }))
  const form = useFormContext<LinkAccountSchemaType>()

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    search({})
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
