'use client'

import { useParams } from 'next/navigation'
import { LoadingPlaceholder } from '@/components'
import { useGetScriptSureIframeUrl } from '@/hooks'
import { PatientMedicationIframe } from './patient-medication-iframe'

const AddMedicationButton = ({
  scriptSureAppUrl,
}: {
  scriptSureAppUrl: string
}) => {
  const { id } = useParams<{ id: string }>()
  const { iframeUrl, loading } = useGetScriptSureIframeUrl(
    id,
    scriptSureAppUrl,
    'drug-list',
  )
  if (loading) {
    return <LoadingPlaceholder className="h-full" />
  }

  return <PatientMedicationIframe iframeSrc={iframeUrl} />
}

export { AddMedicationButton }
