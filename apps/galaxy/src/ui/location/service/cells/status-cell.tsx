'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Service } from '@/types'
import { updateServiceAction } from '../actions'
import { StatusHistoryButton } from '../status-history-button'

const StatusCell = ({ row: { original } }: PropsWithRow<Service>) => {
  const [selectedValue, setSelectedValue] = useState(original?.status ?? '')
  const [loading, setLoading] = useState(false)
  const handleStatusChange = async (value: string) => {
    setLoading(true)
    setSelectedValue(value)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cosigner, ...payload } = original
    const response = await updateServiceAction(
      original?.locationId,
      original?.id,
      {
        ...payload,
        status: value,
      },
    )
    if (response.state === 'error') {
      setSelectedValue(original.status)
      setLoading(false)
      return toast.error(response.error)
    }
    setLoading(false)

    toast.success('Updated successfully!')
  }

  return (
    <Flex gap="1" align="center">
      <StatusHistoryButton serviceId={original?.id} />
      <CodesetSelectCell
        value={selectedValue}
        onValueChange={handleStatusChange}
        codeset={CODESETS.RecordStatus}
        exclude={['Deleted', 'Archived']}
        disabled={loading}
        className="w-[100px]"
      />
    </Flex>
  )
}

export { StatusCell }
