'use client'

import { Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { PatientAddress } from '@/types'
import { LabelledText } from '../../shared'

interface MailAddressProps {
  address?: PatientAddress
  isSameAsPrimary?: boolean
}
const Mail = ({ address, isSameAsPrimary }: MailAddressProps) => {
  return (
    <Grid columns="3" gap="2">
      <Flex gap="4" className="col-span-full">
        <Heading size="2" weight="medium">
          Mail
        </Heading>
        <Text size="1">
          Is your mailing address same as above?
          {isSameAsPrimary ? ' Yes' : ' No'}
        </Text>
      </Flex>
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
    </Grid>
  )
}

export { Mail }
