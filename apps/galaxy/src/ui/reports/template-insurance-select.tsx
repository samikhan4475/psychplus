'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getInsurancePayersOptionsAction } from './client-actions'
import { TemplateSelect } from './template-select'

type TemplateInsuranceSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplateInsuranceSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplateInsuranceSelectProps) => {
  const [insuranceData, setInsuranceData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  const fetchInsuranceData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const insuranceResult = await getInsurancePayersOptionsAction(signal)
      if (insuranceResult.state === 'success') {
        setInsuranceData(insuranceResult.data)
      } else if (insuranceResult.error !== 'AbortError') {
        toast.error(insuranceResult.error ?? 'Failed to fetch insurance data')
      }
      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch insurance data')
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetchInsuranceData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchInsuranceData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={insuranceData || []}
      isLoading={loading}
    />
  )
}

export { TemplateInsuranceSelect }
