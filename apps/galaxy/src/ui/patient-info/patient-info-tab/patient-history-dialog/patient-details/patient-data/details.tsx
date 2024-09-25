'use client'

import { Grid } from '@radix-ui/themes'
import { DetailBox } from '../../shared'

const Details = () => {
  return (
    <Grid columns="4" gap="3" className="h-fit w-full">
      <DetailBox title="MRN" content="12345555" />
      <DetailBox title="SSN" content="12245345" />
      <DetailBox title="CMD" content="14482939" />
      <DetailBox title="Status" content="P Active" />
      <DetailBox title="Driving License" content="283993293" />
      <DetailBox title="Driving License State" content="12345555" />
      <DetailBox title="State of Residence" content="29292000" required />
    </Grid>
  )
}

export { Details }
