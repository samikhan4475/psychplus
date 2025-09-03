'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { deleteServiceRoomAction } from './actions'
import { useStore } from './store'
import { ServiceRoom } from './types'

const DeleteRoomAction = ({
  row: { original: serviceRoom },
}: PropsWithRow<ServiceRoom>) => {
  const { id } = useParams<{ id: string; type: string }>()
  const [loading, setLoading] = useState(false)
  const { search, page } = useStore((state) => ({
    search: state.search,
    page: state.page,
  }))

  const handleDeleteServiceRoom = async () => {
    setLoading(true)
    const response = await deleteServiceRoomAction(
      serviceRoom.locationId,
      serviceRoom.serviceId,
      serviceRoom.id,
    )
    setLoading(false)
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success('Service Room Deleted Successfully')
    search({ serviceId: id }, page, true)
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={handleDeleteServiceRoom}
      disabled={loading}
    >
      <Trash2Icon className="text-black" width={14} height={14} />
    </IconButton>
  )
}

export { DeleteRoomAction }
