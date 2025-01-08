'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useStore } from './quicknotes-store'

const QuickNotesSaveButton = () => {
  const { save, loading } = useStore((state) => ({
    save: state.save,
    loading: state.loading,
  }))
  const visitType = useSearchParams().get('visitType') as string

  return (
    <Button
      size="1"
      onClick={() => save(visitType)}
      disabled={loading}
      highContrast
    >
      <SaveIcon height={14} width={14} strokeWidth={2} />
      Save
    </Button>
  )
}

export { QuickNotesSaveButton }
