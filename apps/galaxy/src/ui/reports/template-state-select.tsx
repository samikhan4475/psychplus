'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getUsStatesOptionsAction } from './client-actions'
import { TemplateSelect } from './template-select'

type TemplateStateSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplateStateSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplateStateSelectProps) => {
  const [stateData, setStateData] = useState<SelectOptionType[] | null>([])
  const [loading, setLoading] = useState(false)

  const fetchStateData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const stateResult = await getUsStatesOptionsAction(signal)

      if (stateResult.state === 'success') {
        setStateData(stateResult.data)
      } else {
        toast.error(stateResult.error ?? 'Failed to fetch state data')
      }

      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch state data')
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchStateData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchStateData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={stateData || []}
      isLoading={loading}
    />
  )
}

export { TemplateStateSelect }
