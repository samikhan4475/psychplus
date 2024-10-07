'use client'

import { Grid } from '@radix-ui/themes'
import { getSlashedPaddedDateString } from '@/utils'
import { LabeledContent } from '../../shared'
import { useStore } from './store'

const PatientDetails = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  return (
    <Grid className="col-span-full" columns="4" gap="2">
      <LabeledContent
        title="First Name"
        content={selectedRow?.policyHolderName?.firstName}
        required
      />
      <LabeledContent
        title="Last Name"
        content={selectedRow?.policyHolderName?.lastName}
        required
      />
      <LabeledContent
        title="Gender"
        content={selectedRow?.policyHolderGender}
        required
      />
      <LabeledContent
        title="DOB"
        content={getSlashedPaddedDateString(
          selectedRow?.policyHolderDateOfBirth,
        )}
        required
      />
      <LabeledContent
        title="Relationship"
        content={selectedRow?.policyHolderRelationship}
        required
      />
      <LabeledContent
        title="SSN"
        content={selectedRow?.policyHolderSocialSecurityNumber}
        required
      />
      <LabeledContent
        title="Address 1"
        content={selectedRow?.contactInfo?.addresses[0]?.street1}
        required
      />

      <LabeledContent
        title="Address 2"
        content={selectedRow?.contactInfo?.addresses[0]?.street2}
      />

      <LabeledContent
        title="City"
        content={selectedRow?.contactInfo?.addresses[0]?.city}
        required
      />

      <LabeledContent
        title="State"
        content={selectedRow?.contactInfo?.addresses[0]?.state}
        required
      />

      <LabeledContent
        title="Zip"
        content={selectedRow?.contactInfo?.addresses[0]?.postalCode}
        required
      />
    </Grid>
  )
}

export { PatientDetails }
