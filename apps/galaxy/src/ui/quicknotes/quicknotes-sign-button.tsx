'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { useStore } from './quicknotes-store'

interface QuickNotesSignButtonProps {
  appointment: Appointment
}

const QuickNotesSignButton = ({ appointment }: QuickNotesSignButtonProps) => {
  const { sign, loading } = useStore((state) => ({
    sign: state.sign,
    loading: state.loading,
  }))

  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string

  const signNote = async () => {
    sign({ patientId, appointmentId, appointment })
  }

  return (
    <Button size="1" onClick={signNote} disabled={loading} highContrast>
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Sign
    </Button>
  )
}

export { QuickNotesSignButton }
