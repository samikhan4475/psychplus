'use client'

import { Button } from '@radix-ui/themes'
import { Save } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const SaveButton = () => {
  const form = useFormContext()

  const onSubmit = async (event?: React.BaseSyntheticEvent) => {
    await form.handleSubmit(
      async (data) => {
        console.log('Form data:', data)
      },
      (errors) => {
        console.log('Validation errors:', errors)

        form.trigger()
      },
    )(event)
  }
  return (
    <Button
      variant="outline"
      color="gray"
      className="text-black"
      type="submit"
      size="1"
      onClick={onSubmit}
    >
      <Save size={14} /> Save
    </Button>
  )
}

export { SaveButton }
