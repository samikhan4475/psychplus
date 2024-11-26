'use client'

import { useParams } from 'next/navigation'
import { LoadingPlaceholder } from '@/components'
import { useGetScriptSureIframeUrl } from '@/hooks'
import { PatientAllergyIframe } from './patient-allergy-iframe'

interface AddAllergyButtonProps {
  scriptSureAppUrl: string
}

const AddAllergyButton = ({ scriptSureAppUrl }: AddAllergyButtonProps) => {
  const { id } = useParams<{ id: string }>()
  const { iframeUrl, loading } = useGetScriptSureIframeUrl(
    id,
    scriptSureAppUrl,
    'allergy',
  )

  if (loading) {
    return <LoadingPlaceholder className="h-full" />
  }

  return <PatientAllergyIframe iframeSrc={iframeUrl} />
}

export { AddAllergyButton }
