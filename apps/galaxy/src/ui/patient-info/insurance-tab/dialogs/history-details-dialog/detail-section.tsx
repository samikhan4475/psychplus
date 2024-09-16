'use client'

import { Grid } from '@radix-ui/themes'
import { DetailBox } from '../../shared'

const DetailSection = () => {
  return (
    <>
      <DetailBox title="First NAme" content="John" required />
      <DetailBox title="Last Name" content="Corner" required />
      <DetailBox title="Gender" content="Male" required />
      <DetailBox title="DOB" content="12/12/2024" required />
      <DetailBox title="Relationship" content="Father" required />
      <DetailBox title="SSN" content="122334444" required />
      <DetailBox title="Member ID" content="123uj3333" required />
      <DetailBox title="Group ID" content="123738UD" required />
      <Grid columns="3" className="col-span-full" gap="2">
        <DetailBox title="Effective Date" content="12/13/2022" required />
        <DetailBox title="Termination Date" content="12/13/2022" required />
        <DetailBox title="Patient is insurance holder" content="No" />
        <DetailBox title="Priority" content="Primary" required />
        <DetailBox title="Payer" content="Ambetter" required />
        <DetailBox
          title="Insurance Plan"
          content="Superior health plan"
          required
        />
      </Grid>
    </>
  )
}

export { DetailSection }
