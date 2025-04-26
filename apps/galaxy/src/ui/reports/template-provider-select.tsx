'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getProvidersOptionsAction } from '@/actions'
import { SelectOptionType } from '@/types'
import { TemplateSelect } from './template-select'

type TemplateProviderSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplateProviderSelect = ({
  title,
  name,
  isMultiple,
}: TemplateProviderSelectProps) => {
  const [providerData, setProviderData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProviderData = async () => {
      setLoading(true)
      const providerResult = await getProvidersOptionsAction()

      if (providerResult.state === 'success') {
        setProviderData(providerResult.data)
      } else {
        toast.error(providerResult.error ?? 'Failed to fetch state data')
      }

      setLoading(false)
    }

    fetchProviderData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={providerData || []}
      isLoading={loading}
    />
  )
}

export { TemplateProviderSelect }
