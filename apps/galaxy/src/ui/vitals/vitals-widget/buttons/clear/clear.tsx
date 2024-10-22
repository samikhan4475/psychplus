'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RECORD_STATUSES } from '../../constants'
import { useStore } from '../../store'
import { VitalsProps } from '../../types'

const ClearButton = ({ patientId, appointmentId }: VitalsProps) => {
  const form = useFormContext()

  const { fetch } = useStore((state) => ({
    fetch: state.fetch,
  }))

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      from: null,
      to: null,
      status: '',
    })

    return fetch({
      patientId,
      appointmentId,
      recordStatuses: RECORD_STATUSES,
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
