'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { transformInStaffOptions } from '../staff-comments/tranform'
import { getStaffAction } from './actions'
import { TemplateSelect } from './template-select'

type TemplateStaffSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplateStaffSelect = ({
  title,
  name,
  isMultiple,
}: TemplateStaffSelectProps) => {
  const [staffData, setStaffData] = useState<SelectOptionType[] | null>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true)
      const staffResult = await getStaffAction()
      if (staffResult.state === 'success') {
        const transformedData = staffResult.data
          ? transformInStaffOptions(staffResult.data)
          : []
        setStaffData(transformedData)
      } else {
        toast.error(staffResult.error ?? 'Failed to fetch staff data')
      }
      setLoading(false)
    }

    fetchStaffData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={staffData || []}
      isLoading={loading}
    />
  )
}

export { TemplateStaffSelect }
