'use client'

import { useEffect, useState } from 'react'
import { FormError, LoadingPlaceholder } from '@/components'
import { StaffResource } from '@/types'
import { getStaffAction } from '../patient-referrals-widget/actions'
import { CreateReferralForm } from './create-referral-form'

interface FormSectionProps {
  patientId: string
  onClose?: () => void
  handleCloseDialog: () => void
}
const FormSection = ({
  patientId,
  onClose,
  handleCloseDialog,
}: FormSectionProps) => {
  const [staff, setStaff] = useState<StaffResource>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStaffAction().then((response) => {
      if (response.state === 'error') {
        setError(response.error)
      } else {
        setStaff(response.data)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="min-h-56" />
  }
  if (error) {
    return <FormError message={error} />
  }

  return (
    <CreateReferralForm
      staff={staff as StaffResource}
      patientId={patientId}
      onClose={onClose}
      handleCloseDialog={handleCloseDialog}
    />
  )
}

export { FormSection }
