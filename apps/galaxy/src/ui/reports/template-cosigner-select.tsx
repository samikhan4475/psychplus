'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getProvidersOptionsAction } from '@/actions'
import { SelectOptionType } from '@/types'
import { TemplateSelect } from './template-select'

type TemplateCosignerSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplateCosignerSelect = ({
  title,
  name,
  isMultiple,
}: TemplateCosignerSelectProps) => {
  const [cosignerData, setCosignerData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCosignerData = async () => {
      setLoading(true)
      const cosignerResult = await getProvidersOptionsAction()
      if (cosignerResult.state === 'success') {
        setCosignerData(cosignerResult.data)
      } else {
        toast.error(cosignerResult.error ?? 'Failed to fetch cosigner data')
      }
      setLoading(false)
    }

    fetchCosignerData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={cosignerData || []}
      isLoading={loading}
    />
  )
}

export { TemplateCosignerSelect }
