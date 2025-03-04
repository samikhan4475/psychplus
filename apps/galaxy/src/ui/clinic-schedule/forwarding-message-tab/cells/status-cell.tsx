'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { updateForwardingMessageAction } from '../actions'
import { FORWARDING_MESSAGE_STATUS_ERROR } from '../constant'
import { ActiveAlerts } from '../shared'
import { StatusHistoryButton } from '../status-history-button'
import { useStore } from '../store'
import { ForwardingMessage } from '../types'

const StatusCell = ({ row: { original } }: PropsWithRow<ForwardingMessage>) => {
  const [selectedValue, setSelectedValue] = useState(original?.recordStatus)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { setData, data } = useStore((state) => ({
    setData: state.setData,
    data: state.data,
  }))

  const handleStatusChange = async (value: string) => {
    setLoading(true)
    setSelectedValue(value)
    const response = await updateForwardingMessageAction(
      original.userId,
      original.id,
      {
        ...original,
        recordStatus: value,
      },
    )
    if (response.state === 'error') {
      setSelectedValue(original.recordStatus)
      setLoading(false)
      if (response.error?.includes('message forwarding overlaps')) {
        return setIsOpen(true)
      } else {
        return toast.error(response.error)
      }
    }
    setData(
      data.map((item) => (item.id === original.id ? response.data : item)),
    )
    toast.success('Updated successfully!')
    setLoading(false)
  }
  useEffect(() => {
    if (selectedValue !== original?.recordStatus && !loading) {
      setSelectedValue(original?.recordStatus)
    }
  }, [loading, original?.recordStatus, selectedValue])
  return (
    <Flex gapX="1" className="flex-1" align="center">
      <StatusHistoryButton forwardingMessage={original} />
      <CodesetSelectCell
        className="w-full flex-1"
        codeset={CODESETS.RecordStatus}
        value={selectedValue}
        onValueChange={handleStatusChange}
        disabled={loading}
        exclude={['Deleted', 'Archived']}
      />
      <ActiveAlerts
        isOpen={isOpen}
        closeDialog={() => setIsOpen(false)}
        mesage={FORWARDING_MESSAGE_STATUS_ERROR}
      />
    </Flex>
  )
}

export { StatusCell }
