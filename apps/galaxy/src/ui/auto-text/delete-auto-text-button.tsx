'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { deleteUserSettings } from '@/actions'
import { DeleteConfirmDialog } from '@/components'
import { UserSetting } from '@/types'
import { useStore } from './store'

interface DeleteAutoTextButtonProps {
  data: UserSetting
}
const DeleteAutoTextButton = ({ data }: DeleteAutoTextButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const refetch = useStore((state) => state.refetch)
  const [loading, setLoading] = useState(false)
  const toggleOpen = (open: boolean) => setIsOpen(open)

  const handleDelete = async () => {
    setLoading(true)
    const res = await deleteUserSettings(data.id)
    if (res.state === 'error') {
      setLoading(false)
      return toast.error(res.error)
    }
    toast.success('Auto text deleted successfully')
    toggleOpen(false)
    refetch()
    setLoading(false)
  }

  return (
    <>
      <DeleteConfirmDialog
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        title="Auto text"
        onDelete={handleDelete}
        loading={loading}
      />
      <Tooltip content="Delete">
        <IconButton
          variant="ghost"
          className="!m-0"
          size="1"
          color="red"
          highContrast
          onClick={() => toggleOpen(true)}
        >
          <TrashIcon width={16} height={16} />
        </IconButton>
      </Tooltip>
    </>
  )
}

export { DeleteAutoTextButton }
