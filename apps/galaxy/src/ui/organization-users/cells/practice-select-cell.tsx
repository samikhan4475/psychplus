'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from '@/ui/patient-lookup/actions'
import { associatePracticeAction } from '../actions'
import { Users } from '../types'

const PracticeSelectCell = ({
  row: { original: patient },
}: PropsWithRow<Users>) => {
  const [practicesOptions, setPracticesOptions] = useState<SelectOptionType[]>(
    [],
  )
  const [selectedValue, setSelectedValue] = useState(patient?.practiceId)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      const response = await getPracticesOptionsAction({
        payload: {
          organizationId: id,
        },
      })
      if (response.state === 'success') {
        setPracticesOptions(response.data)
      }
    })()
  }, [])
  const associateUserStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await associatePracticeAction(patient.id, value)
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(patient?.practiceId ?? '')
      toast.error(result.error ?? 'Failed to update!')
    }
  }
  return (
    <SelectCell
      options={practicesOptions}
      onValueChange={associateUserStatus}
      value={selectedValue}
      className="h-4"
    />
  )
}

export { PracticeSelectCell }
