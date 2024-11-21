'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  getScriptSureExternalPatient,
  getScriptSureSessionToken,
} from '@/actions'
import { LoadingPlaceholder } from '@/components'
import { DAWSYS } from './constant'
import { PatientAllergyIframe } from './patient-allergy-iframe'

interface AddAllergyButtonProps {
  scriptSureAppUrl: string
}

const AddAllergyButton = ({ scriptSureAppUrl }: AddAllergyButtonProps) => {
  const { id } = useParams<{ id: string }>()
  const [iframeSrc, setIframeSrc] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const [sessionTokenResponse, externalPatientResponse] = await Promise.all([
      getScriptSureSessionToken(DAWSYS),
      getScriptSureExternalPatient(id),
    ])
    if (
      sessionTokenResponse.state !== 'error' &&
      externalPatientResponse.state !== 'error'
    ) {
      const externalPatientId = externalPatientResponse.data.externalPatientId
      const sessionToken = sessionTokenResponse.data

      const url = `${scriptSureAppUrl}/widgets/allergy/${externalPatientId}?sessiontoken=${sessionToken}`
      setIframeSrc(url)
      setLoading(false)
    } else {
      setLoading(false)
      toast.error('Failed to fetch data')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="h-full" />
  }

  return <PatientAllergyIframe iframeSrc={iframeSrc} />
}

export { AddAllergyButton }
