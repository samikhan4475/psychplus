'use client'

import { useState } from 'react'
import { Radio } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CreditCard } from '@/types'
import { setPrimaryPatientCard } from '@/ui/patient-info/payment-card-tab'
import { useStore } from '../../store'

const PrimaryRadioCell = ({
  row: {
    original: { isPrimary, patientId, id, isActive },
  },
}: PropsWithRow<CreditCard>) => {
  const { fetchPatientCreditCards, toggleAddCardDialog } = useStore(
    (state) => ({
      fetchPatientCreditCards: state.fetchPatientCreditCards,
      toggleAddCardDialog: state.toggleAddCardDialog,
    }),
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async () => {
    setIsLoading(true)

    const result = await setPrimaryPatientCard({
      patientId: patientId,
      creditCardId: id,
    })

    if (result.state === 'error') {
      toast.error(result.error)
    } else if (result.state === 'success') {
      fetchPatientCreditCards(String(patientId))
      toggleAddCardDialog()
      toast.success('Primary Card Changed')
    }

    setIsLoading(false)
  }

  return (
    <Radio
      value="true"
      checked={isPrimary}
      disabled={isLoading || !isActive}
      onValueChange={handleChange}
      highContrast
      size="1"
    />
  )
}

export { PrimaryRadioCell }
