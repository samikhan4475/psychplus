'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getAllLocations } from './actions'
import { TemplateSelect } from './template-select'

type TemplateLocationSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplateLocationSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplateLocationSelectProps) => {
  const [locationData, setLocationData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  const fetchLocationData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const locationResult = await getAllLocations(signal)

      if (locationResult.state === 'success') {
        const transformedData = locationResult.data.map((item) => {
          const label = item.locationNameGenerated

          const value = item.id

          return {
            label,
            value,
          }
        })
        setLocationData(transformedData)
      } else if (locationResult.error !== 'AbortError') {
        toast.error(locationResult.error ?? 'Failed to fetch locations data')
      }
      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch location data')
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

    fetchLocationData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchLocationData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={locationData || []}
      isLoading={loading}
    />
  )
}

export { TemplateLocationSelect }
