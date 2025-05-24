'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getProvidersOptionsAction } from './client-actions'
import { TemplateSelect } from './template-select'

type TemplateProviderSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplateProviderSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplateProviderSelectProps) => {
  const [providerData, setProviderData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  const fetchProviderData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const providerResult = await getProvidersOptionsAction(signal)

      if (providerResult.state === 'success') {
        setProviderData(providerResult.data)
      } else if (providerResult.error !== 'AbortError') {
        toast.error(providerResult.error ?? 'Failed to fetch provider data')
      }
      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch provider data')
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetchProviderData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchProviderData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={providerData || []}
      isLoading={loading}
    />
  )
}

export { TemplateProviderSelect }
