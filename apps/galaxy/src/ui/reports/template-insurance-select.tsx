'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getInsurancePayersOptionsAction } from '@/actions'
import { SelectOptionType } from '@/types'
import { TemplateSelect } from './template-select'

type TemplateInsuranceSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplateInsuranceSelect = ({
  title,
  name,
  isMultiple,
}: TemplateInsuranceSelectProps) => {
  const [insuranceData, setInsuranceData] = useState<SelectOptionType[] | null>(
    [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInsuranceData = async () => {
      setLoading(true)
      const insuranceResult = await getInsurancePayersOptionsAction()
      if (insuranceResult.state === 'success') {
        setInsuranceData(insuranceResult.data)
      } else {
        toast.error(insuranceResult.error ?? 'Failed to fetch Insurance data')
      }
      setLoading(false)
    }

    fetchInsuranceData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={insuranceData || []}
      isLoading={loading}
    />
  )
}

export { TemplateInsuranceSelect }
