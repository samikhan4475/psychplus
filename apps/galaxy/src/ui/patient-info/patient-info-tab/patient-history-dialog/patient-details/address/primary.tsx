'use client'

import { Grid, Heading } from '@radix-ui/themes'
import { DetailBox } from '../../shared'

const Primary = () => {
  return (
    <Grid columns="3" gap="2">
      <Heading className="col-span-full" size="2" weight="medium">
        Primary
      </Heading>
      <DetailBox
        title="Address 1"
        content="13th Street. 47 W 13th St, New York, NY 10011, USA."
        className="col-span-full"
        required
      />
      <DetailBox
        title="Address 2"
        content="13th Street. 47 W 13th St, New York, NY 10011, USA."
        className="col-span-full"
      />
      <DetailBox title="City" content="New York" required />
      <DetailBox title="State" content="New York" required />
      <DetailBox title="Zip" content="1234332" required />
    </Grid>
  )
}

export { Primary }
