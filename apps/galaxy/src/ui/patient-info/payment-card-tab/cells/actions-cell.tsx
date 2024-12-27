'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog, PropsWithRow } from '@/components'
import { CreditCard } from '@/types'
import { deletePatientCardAction } from '../actions'

const ActionsCell = ({
  row: {
    original: { patientId, id },
  },
}: PropsWithRow<CreditCard>) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleOpen = (open: boolean) => setIsOpen(open)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      const result = await deletePatientCardAction({
        patientId: patientId,
        creditCardId: id,
      })

      if (result.state === 'error') {
        throw new Error(result.error)
      }

      toast.success('Card deleted successfully')
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete card'
      toast.error(message)
    } finally {
      setIsLoading(false)
      toggleOpen(false)
    }
  }

  return (
    <DeleteConfirmDialog
      isOpen={isOpen}
      onDelete={handleDelete}
      toggleOpen={toggleOpen}
      loading={isLoading}
    >
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black !m-0"
        disabled={isLoading}
      >
        <Trash2 size={16} />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { ActionsCell }
