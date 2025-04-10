'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button, Flex } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { updateCredentialingManagerAction } from '../actions'
import { useStore } from './store'

const SaveButton = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string; type: string }>()
  const { data } = useStore((state) => ({
    data: state.data,
  }))

  const onSave = async () => {
    setLoading(true)
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      await updateCredentialingManagerAction(id, element.id, {
        ...element,
      })
    }
    toast.success('Saved Successfully')
    setLoading(false)
  }

  return (
    <Flex className="ml-auto w-[70px]">
      <Button size="1" highContrast onClick={onSave} loading={loading}>
        <SaveIcon width={15} height={15} strokeWidth={1.75} />
        Save
      </Button>
    </Flex>
  )
}

export { SaveButton }
