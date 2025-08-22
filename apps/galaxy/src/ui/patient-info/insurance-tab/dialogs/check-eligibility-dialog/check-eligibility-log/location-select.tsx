'use client'

import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getAllLocations } from '@/ui/reports/actions'

const LocationSelect = () => {
  const [locationData, setLocationData] = useState<SelectOptionType[]>()
  const [loading, setLoading] = useState(false)
  const fetchLocationData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const locationResult = await getAllLocations(signal)
      setLoading(false)
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
    <FormFieldContainer className="flex-row gap-x-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        placeholder="Select"
        loading={loading}
        options={locationData}
        buttonClassName="w-[180px] h-6 "
      />
      <FormFieldError name="locationId" />
    </FormFieldContainer>
  )
}
export { LocationSelect }
