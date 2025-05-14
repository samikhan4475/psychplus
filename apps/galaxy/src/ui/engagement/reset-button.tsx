'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useStore } from './store'

const ResetButton = () => {
  const { reset } = useFormContext()
  const { resetFormValues, fetchWaitlists } = useStore()

  const params = useParams()
  const patientId = params.id

  const handleReset = () => {
    reset({
      waitlistStatus: [],
      visitType: '',
      initiatedDate: '',
      initiatedTime: '',
      fromDate: '',
      fromTime: '',
      toDate: '',
      toTime: '',
      patientName: '',
      providerId: '',
      isAlertSent: '',
    })
    resetFormValues()
    if (patientId) {
      fetchWaitlists({ patientIds: [Number(patientId)] })
    } else {
      fetchWaitlists({})
    }
  }
  return (
    <Button
      color="gray"
      className="text-black ml-10"
      size="1"
      variant="outline"
      type="button"
      onClick={handleReset}
    >
      Clear
    </Button>
  )
}

export { ResetButton }
