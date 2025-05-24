'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getPatientsOptionsAction } from './client-actions'
import { TemplateSelect } from './template-select'

type TemplatePatientSelectProps = {
  title: string
  name: string
  isMultiple: boolean
  isRequired: boolean
}

const TemplatePatientSelect = ({
  title,
  name,
  isMultiple,
  isRequired,
}: TemplatePatientSelectProps) => {
  const [patientData, setPatientData] = useState<SelectOptionType[] | null>([])
  const [loading, setLoading] = useState(false)

  const fetchPatientData = useCallback(async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const patientResult = await getPatientsOptionsAction(signal)
      if (patientResult.state === 'success') {
        setPatientData(patientResult.data)
      } else if (patientResult.error !== 'AbortError') {
        toast.error(patientResult.error ?? 'Failed to fetch patient data')
      }
      setLoading(false)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Failed to fetch patient data')
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

    fetchPatientData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchPatientData])

  return (
    <TemplateSelect
      isRequired={isRequired}
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={patientData || []}
      isLoading={loading}
    />
  )
}

export { TemplatePatientSelect }
