'use client'

import { useParams } from 'next/navigation'
import { LoadingPlaceholder } from '@/components'
import { useGetScriptSureIframeUrl } from '@/hooks'
import { PatientMedicationIframe } from './patient-medication-iframe'
import { useStore } from '@/store'

const AddMedicationButton = () => {
  const { id } = useParams<{ id: string }>()
  const { constant } = useStore((state) => ({
    constant: state.constants,
  }))
  const { iframeUrl, loading } = useGetScriptSureIframeUrl(
    id,
    constant.scriptsureBaseApplicationUrl,
    'drug-list',
  )
  if (loading) {
    return <LoadingPlaceholder className="h-full" />
  }

  return <PatientMedicationIframe iframeSrc={iframeUrl} />
}

export { AddMedicationButton }
