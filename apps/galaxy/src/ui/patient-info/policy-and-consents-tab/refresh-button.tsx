import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ConsentStatus } from '@/types'
import { getPatientConsentsAction } from '../patient-info-tab/actions'
import { applyClientSideFilters } from '../patient-info-tab/utils'
import { PatientConsentSchemaType } from './filter-form'
import { useStore } from './store'

interface RefreshButtonProps {
  patientId: string
}
const RefreshButton = ({ patientId }: RefreshButtonProps) => {
  const [loading, setLoading] = useState(false)
  const form = useFormContext<PatientConsentSchemaType>()
  const router = useRouter()
  const { consents, setConsents } = useStore((state) => ({
    consents: state.consents,
    setConsents: state.setConsents,
  }))
  const handleRefresh = async () => {
    setLoading(true)
    router.refresh()
    const result = await getPatientConsentsAction(patientId)
    if (result.state === 'error') {
      setLoading(false)
      return toast.error(result.error)
    }
    const data = form.getValues()
    const filteredConsents = applyClientSideFilters(consents ?? [], {
      status: data.status as ConsentStatus,
      issuanceDate: data.issuanceDate,
      type: data.type,
    })
    setConsents(result.data, filteredConsents)
    toast.success('Refreshed successfully')
    setLoading(false)
  }
  return (
    <Button
      disabled={loading}
      loading={loading}
      onClick={handleRefresh}
      size="1"
      highContrast
    >
      Refresh
    </Button>
  )
}

export { RefreshButton }
