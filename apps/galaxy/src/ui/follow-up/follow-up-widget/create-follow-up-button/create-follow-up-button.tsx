'use client'

import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Appointment } from '@/types'

const CreateFollowUpButton = ({
  disabled,
}: {
  appointment?: Appointment
  disabled: boolean
}) => {
  const form = useFormContext()

  const onSubmit = () => {
    console.log(form.getValues())
  }
  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="submit"
      onClick={onSubmit}
      disabled={disabled}
    >
      <Plus width={16} height={16} />
      Follow up
    </Button>
  )
}

export { CreateFollowUpButton }
