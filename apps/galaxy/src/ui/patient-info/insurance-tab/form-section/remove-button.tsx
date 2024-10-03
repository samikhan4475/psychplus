'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Insurance } from '@/types'
import { deletePolicy } from '../actions'
import { useStore } from '../store'

interface RemoveButtonProps {
  insurance?: Insurance
  patientId: string
  disabled?: boolean
}

const RemoveButton = ({
  insurance,
  patientId,
  disabled,
}: RemoveButtonProps) => {
  const router = useRouter()
  const { setAddFormOpen } = useStore((state) => ({
    setAddFormOpen: state.setAddFormOpen,
  }))

  const [loading, setLoading] = useState(false)

  const handleDeletePolicy = async () => {
    setLoading(true)
    if (!insurance) {
      setAddFormOpen(false)
      return
    }

    const result = await deletePolicy(patientId, insurance.id)

    if (result.state == 'error') {
      toast.error(result.error ?? 'Failed to delete policy')
    } else if (result.state == 'success') {
      router.refresh()
      toast.success('Policy deleted successfully')
    }

    setLoading(false)
  }
  return (
    <Button
      variant="outline"
      color="gray"
      className="text-black"
      type="button"
      size="1"
      onClick={handleDeletePolicy}
      disabled={loading || disabled}
    >
      <Trash2 size={14} />
    </Button>
  )
}

export { RemoveButton }
