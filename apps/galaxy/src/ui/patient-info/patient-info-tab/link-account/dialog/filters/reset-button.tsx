'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../../store'
import { LinkAccountSchemaType } from './link-account-form'

const ResetButton = () => {
  const { search } = useStore((state) => ({
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
