'use client'

import { useParams } from 'next/navigation'
import { IconButton, Radio } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { priorityPharmacyAction } from './actions/priority-pharmacy'
import { useStore } from './store'
import { Pharmacy } from './types'

const PrimaryRadioCell = ({
  row: {
    original: { isPreferred, pharmacyId },
  },
}: PropsWithRow<Pharmacy>) => {
  const patientId = useParams().id as string
  const { fetchPatientPharmacies } = useStore((state) => ({
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))
  const onChange = async () => {
    if (!isPreferred) {
      const result = await priorityPharmacyAction(pharmacyId, patientId)
      if (result.state === 'error') {
        toast.error(result.error || 'Failed to add default pharmacy')
        return
      }
      fetchPatientPharmacies(patientId)
      toast.success('Successfully added default')
    }
  }
  return (
    <IconButton
      variant="ghost"
      color="gray"
      size="1"
      type="button"
      onClick={onChange}
    >
      <Radio value="true" checked={isPreferred} size="1" />
    </IconButton>
  )
}

export { PrimaryRadioCell }
