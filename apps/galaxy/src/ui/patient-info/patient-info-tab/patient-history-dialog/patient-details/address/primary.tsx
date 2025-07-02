'use client'

import { Grid, Heading } from '@radix-ui/themes'
import { PatientAddress } from '@/types'
import { LabelledText } from '../../shared'

interface PrimaryAddressProps {
  address?: PatientAddress
}
const Primary = ({ address }: PrimaryAddressProps) => {
  return (
    <Grid columns="3" gap="2">
      <Heading className="col-span-full" size="2" weight="medium">
        Primary
      </Heading>
      <LabelledText
        title="Address 1"
        content={address?.street1}
        className="col-span-full"
        required
      />
      <LabelledText
        title="Address 2"
        content={address?.street2}
        className="col-span-full"
      />
      <LabelledText title="City" content={address?.city} required />
      <LabelledText title="State" content={address?.state} required />
      <LabelledText title="Zip" content={address?.postalCode} required />
      <LabelledText title="Postal+4" content={address?.postalPlus4Code} />
    </Grid>
  )
}

export { Primary }
