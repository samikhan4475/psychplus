'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { getScriptSureExternalPatient } from '@/actions/get-script-sure-external-patient'
import { getScriptSureSessionToken } from '@/actions/get-script-sure-session-token'
import { LoadingPlaceholder } from '@/components'
import { DAWSYS } from '@/constants'
import { PharmacyIframe } from './pharmacy-iframe'

const PharmacyAddButton = ({
  scriptSureAppUrl,
}: {
  scriptSureAppUrl: string
}) => {
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

      const url = `${scriptSureAppUrl}/widgets/pharmacy/${externalPatientId}?sessiontoken=${sessionToken}&darkmode=off`
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

  return <PharmacyIframe iframeSrc={iframeSrc} />
}

export { PharmacyAddButton }
