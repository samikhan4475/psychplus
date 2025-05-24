'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getProvidersOptionsAction } from './client-actions'
import { TemplateSelect } from './template-select'

type TemplateCosignerSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplateCosignerSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplateCosignerSelectProps) => {
  const [cosignerData, setCosignerData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  const fetchCosignerData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const cosignerResult = await getProvidersOptionsAction(signal)
      if (cosignerResult.state === 'success') {
        setCosignerData(cosignerResult.data)
      } else if (cosignerResult.error !== 'AbortError') {
        toast.error(cosignerResult.error ?? 'Failed to fetch cosigner data')
      }
      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch cosigner data')
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

    fetchCosignerData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchCosignerData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={cosignerData || []}
      isLoading={loading}
    />
  )
}

export { TemplateCosignerSelect }
