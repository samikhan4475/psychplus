'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from '../store'
import { ForwardingMessageFilterSchemaType } from './schema'

interface ClearButtonProps {
  userId: number
}
const ClearButton = ({ userId }: ClearButtonProps) => {
  const form = useFormContext<ForwardingMessageFilterSchemaType>()
  const { fetchForwardingMessageList } = useStore((state) => ({
    fetchForwardingMessageList: state.fetchForwardingMessageList,
  }))
  const handleClear = () => {
    form.reset({
      forwardingId: '',
      recordStatus: '',
      toDate: undefined,
      fromDate: undefined,
    })
    return fetchForwardingMessageList({ userIds: [userId] }, 1, true)
  }
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      className="text-black"
      onClick={handleClear}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
