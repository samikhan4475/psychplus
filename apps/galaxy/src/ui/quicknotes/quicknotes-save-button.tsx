'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { useStore } from './store'

const QuickNotesSaveButton = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const { save, loading } = useStore((state) => ({
    save: state.save,
    loading: state.loading,
  }))

  return (
    <Button
      size="1"
      onClick={() => save(appointment)}
      disabled={loading}
      highContrast
    >
      <SaveIcon height={14} width={14} strokeWidth={2} />
      Save
    </Button>
  )
}

export { QuickNotesSaveButton }
