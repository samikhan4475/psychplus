'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getAllLocations } from './actions'
import { TemplateSelect } from './template-select'

type TemplateLocationSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplateLocationSelect = ({
  title,
  name,
  isMultiple,
}: TemplateLocationSelectProps) => {
  const [locationData, setLocationData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLocationData = async () => {
      setLoading(true)
      const locationResult = await getAllLocations()

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
      } else {
        toast.error(locationResult.error ?? 'Failed to fetch locations data')
      }

      setLoading(false)
    }

    fetchLocationData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={locationData || []}
      isLoading={loading}
    />
  )
}

export { TemplateLocationSelect }
