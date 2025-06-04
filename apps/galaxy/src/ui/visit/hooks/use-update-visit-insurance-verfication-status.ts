import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateVisitVerificationStatus } from '../client-actions/update-visit-verification-status'

interface UpdateParams {
  appointmentId: number
  newStatus: string
  successMessage?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

const useUpdateVisitInsuranceVerificationStatus = () => {
  const [loading, setLoading] = useState(false)

  const updateVisitInsuranceVerificationStatus = async ({
    appointmentId,
    newStatus,
    successMessage,
    onSuccess,
    onError,
  }: UpdateParams) => {
    setLoading(true)

    const res = await updateVisitVerificationStatus({
      appointmentId,
      insuranceVerificationStatus: newStatus,
    })

    setLoading(false)
    if (res.state === 'error') {
      toast.error(res.error || 'Failed to update insurance verification status')
      onError?.(res.error)
      return
    }
    onSuccess?.()
    if (successMessage) toast.success(successMessage)
  }

  return {
    updateVisitInsuranceVerificationStatus,
    loading,
  }
}

export { useUpdateVisitInsuranceVerificationStatus }
