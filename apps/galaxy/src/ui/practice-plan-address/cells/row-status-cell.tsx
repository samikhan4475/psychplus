'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { CodesetSelectCell, type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { cn } from '@/utils'
import { updatePracticePlanAddressAction } from '../actions'
import { PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE } from '../constants'
import { useStore } from '../store'
import { PracticePlanAddress } from '../types'

const RowStatusCell = ({
  row: { original: record },
}: PropsWithRow<PracticePlanAddress>) => {
  const [loading, setLoading] = useState(false)
  const search = useStore((state) => state.search)
  const { id: practicePlanId } = useParams<{ id: string }>()
  const onChange = async () => {
    setLoading(true)
    const result = await updatePracticePlanAddressAction(
      {
        ...record,
        recordStatus: record.recordStatus === 'Active' ? 'Inactive' : 'Active',
      },
      practicePlanId,
    )
    if (result.state === 'error')
      toast.error(result.error ?? 'Failed to update plan address status')
    else if (result.state === 'success') {
      toast.success('Plan Address status updated successfully')
    }
    setLoading(false)
    search({ practicePlanId }, 1, PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE, true)
  }

  return (
    <CodesetSelectCell
      codeset={CODESETS.RecordStatus}
      exclude={['Deleted', 'Archived']}
      onValueChange={onChange}
      value={record.recordStatus}
      disabled={loading}
      className={cn(
        { 'bg-green-3 text-green-12': record.recordStatus === 'Active' },
        { 'opacity-50': loading },
      )}
    />
  )
}

export { RowStatusCell }
