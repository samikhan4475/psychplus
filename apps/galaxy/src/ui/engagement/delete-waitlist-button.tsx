import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog } from '@/components'
import { WaitlistResponse } from '@/types'
import { deleteWaitlistAction } from './actions/delete-waitlist-action'
import { useStore } from './store'

const DeleteWaitlistButton = ({ original }: { original: WaitlistResponse }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const pathName = usePathname()

  const toggleOpen = (open: boolean) => setIsOpen(open)

  const { fetchWaitlists } = useStore()
  const handleDelete = async () => {
    setLoading(true)
    const data = {
      id: original?.id,
      patientId: original?.patientId,
    }
    const response = await deleteWaitlistAction(data)

    if (response.state === 'error') {
      toast.error(response.error)
      console.log(response.error)
      setLoading(false)
      return
    }
    toast.success('Deleted successfully!')
    setLoading(false)
    toggleOpen(false)
    if (pathName.includes('management')) {
      fetchWaitlists({})
    } else {
      fetchWaitlists({ patientIds: [Number(original?.patientId)] })
    }
  }

  return (
    <DeleteConfirmDialog
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      onDelete={handleDelete}
      loading={loading}
      title="waitlist"
    >
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black !m-0"
        type="button"
        disabled={loading}
      >
        <Trash2 size={14} />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export default DeleteWaitlistButton
