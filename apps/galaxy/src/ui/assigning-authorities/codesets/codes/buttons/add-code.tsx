'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useStore } from '@/ui/assigning-authorities/store'

const AddCodeButton = () => {
  const form = useFormContext()
  const { selectedCodeset, loading } = useStore()

  if (!selectedCodeset || loading) return

  const addCode = async () => {
    if (form.watch('newCodesetCode') !== undefined) return

    form.reset({
      ...form.getValues(),
      newCodesetCode: {
        id: '',
        codesetId: selectedCodeset.id,
        code: '',
        displayName: '',
      },
    })
    setTimeout(() => form.setFocus('newCodesetCode.code'), 0)
  }

  return (
    <Button
      size="1"
      highContrast
      type="button"
      className="ml-auto"
      onClick={addCode}
    >
      <PlusIcon height={14} width={14} strokeWidth={2} />
      Code
    </Button>
  )
}

export { AddCodeButton }
