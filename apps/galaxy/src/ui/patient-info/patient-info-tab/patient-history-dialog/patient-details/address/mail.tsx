'use client'

import { Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { DetailBox } from '../../shared'

const Mail = () => {
  return (
    <Grid columns="3" gap="2">
      <Flex gap="4" className="col-span-full">
        <Heading size="2" weight="medium">
          Mail
        </Heading>
        <Text size="1">Is your mailing address same as above? No</Text>
      </Flex>
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

export { Mail }
