'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getUsStatesOptionsAction } from '@/actions'
import { SelectOptionType } from '@/types'
import { TemplateSelect } from './template-select'

type TemplateStateSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplateStateSelect = ({
  title,
  name,
  isMultiple,
}: TemplateStateSelectProps) => {
  const [stateData, setStateData] = useState<SelectOptionType[] | null>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStateData = async () => {
      setLoading(true)
      const stateResult = await getUsStatesOptionsAction()

      if (stateResult.state === 'success') {
        setStateData(stateResult.data)
      } else {
        toast.error(stateResult.error ?? 'Failed to fetch state data')
      }

      setLoading(false)
    }

    fetchStateData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={stateData || []}
      isLoading={loading}
    />
  )
}

export { TemplateStateSelect }
