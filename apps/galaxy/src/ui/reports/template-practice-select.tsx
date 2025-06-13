'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from '../patient-lookup/actions'
import { TemplateSelect } from './template-select'
import { TemplateParameter } from './types'

type TemplatePracticeSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplatePracticeSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplatePracticeSelectProps) => {
  const [practiceData, setPracticeData] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)

  const form = useFormContext()
  const parameters = form.watch('reportTemplateParameters')

  const locationParam = parameters.find(
    (param: TemplateParameter) => param.parameterCode === 'LocationList',
  )?.runValue

  const locationId = useMemo(() => locationParam, [locationParam])

  const fetchPracticeData = useCallback(async () => {
    setLoading(true)

    const result = await getPracticesOptionsAction({
      payload: { locationId },
    })

    if (result.state === 'error') {
      return toast.error(result.error ?? 'Failed to fetch Practices data')
    }
    setPracticeData(result.data)
    setLoading(false)
  }, [locationId])

  useEffect(() => {
    if (locationId) {
      fetchPracticeData()
    }
  }, [fetchPracticeData, locationId])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={practiceData}
      isLoading={loading}
    />
  )
}

export { TemplatePracticeSelect }
