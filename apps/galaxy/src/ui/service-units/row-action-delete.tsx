'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { deleteServiceUnitAction } from './actions'
import { useStore } from './store'
import { ServiceUnit } from './types'

const DeleteGroupAction = ({
  row: { original: serviceUnit },
}: PropsWithRow<ServiceUnit>) => {
  const { id } = useParams<{ id: string; type: string }>()
  const [loading, setLoading] = useState(false)
  const { search, page } = useStore((state) => ({
    search: state.search,
    page: state.page,
  }))

  const handleDeleteServiceGroup = async () => {
    setLoading(true)
    const response = await deleteServiceUnitAction(
      serviceUnit.locationId,
      serviceUnit.serviceId,
      serviceUnit.id,
    )
    setLoading(false)
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success('Service Group Deleted Successfully')
    search({ serviceId: id }, page, true)
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={handleDeleteServiceGroup}
      disabled={loading}
    >
      <Trash2Icon className="text-black" width={14} height={14} />
    </IconButton>
  )
}

export { DeleteGroupAction }
