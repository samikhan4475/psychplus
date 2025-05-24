'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { transformInStaffOptions } from '../staff-comments/tranform'
import { getStaffAction } from './client-actions'
import { TemplateSelect } from './template-select'

type TemplateStaffSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplateStaffSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplateStaffSelectProps) => {
  const [staffData, setStaffData] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  const fetchStaffData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)

    try {
      const staffResult = await getStaffAction(signal)

      if (staffResult.state === 'success') {
        const transformedData = staffResult.data
          ? transformInStaffOptions(staffResult.data)
          : []
        setStaffData(transformedData)
      } else if (staffResult.error !== 'AbortError') {
        toast.error(staffResult.error ?? 'Failed to fetch staff data')
      }
      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch staff data')
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetchStaffData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchStaffData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={staffData}
      isLoading={loading}
    />
  )
}

export { TemplateStaffSelect }
