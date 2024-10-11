'use client'

import { Grid } from '@radix-ui/themes'
import { LabelledText } from '../../shared'
import { useStore } from '../../store'

const Details = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  const patientDetailsAddress = selectedRow?.contactDetails?.addresses?.find(
    (address) => address.type === 'Home',
  )
  return (
    <Grid columns="4" gap="3" className="h-fit w-full">
      <LabelledText title="MRN" content={selectedRow?.medicalRecordNumber} />
      <LabelledText title="SSN" content={selectedRow?.socialSecurityNumber} />
      <LabelledText title="CMD" content={selectedRow?.chargeKey} />
      <LabelledText title="Status" content={selectedRow?.status} />
      <LabelledText
        title="Driving License"
        content={selectedRow?.driversLicense?.number}
      />
      <LabelledText
        title="Driving License State"
        content={selectedRow?.driversLicense?.validIn}
      />
      <LabelledText
        title="State of Residence"
        content={patientDetailsAddress?.state}
        required
      />
    </Grid>
  )
}

export { Details }
