'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getPatientsOptionsAction } from './actions'
import { TemplateSelect } from './template-select'

type TemplatePatientSelectProps = {
  title: string
  name: string
  isMultiple: boolean
}

const TemplatePatientSelect = ({
  title,
  name,
  isMultiple,
}: TemplatePatientSelectProps) => {
  const [patientData, setPatientData] = useState<SelectOptionType[] | null>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true)

      const patientResult = await getPatientsOptionsAction()
      if (patientResult.state === 'success') {
        setPatientData(patientResult.data)
      } else {
        toast.error(patientResult.error ?? 'Failed to fetch patient data')
      }

      setLoading(false)
    }

    fetchPatientData()
  }, [])

  return (
    <TemplateSelect
      title={title}
      name={name}
      isMultiple={isMultiple}
      options={patientData || []}
      isLoading={loading}
    />
  )
}

export { TemplatePatientSelect }
