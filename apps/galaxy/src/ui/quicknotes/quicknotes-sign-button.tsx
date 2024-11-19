'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { useStore } from './quicknotes-store'

const QuickNotesSignButton = () => {
  const { sign, loading } = useStore((state) => ({
    sign: state.sign,
    loading: state.loading,
  }))

  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string

  return (
    <Button
      size="1"
      onClick={() => sign({ patientId, appointmentId })}
      disabled={loading}
      highContrast
    >
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Sign
    </Button>
  )
}

export { QuickNotesSignButton }
