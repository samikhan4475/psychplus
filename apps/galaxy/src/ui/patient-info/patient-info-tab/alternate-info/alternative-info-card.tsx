'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { AddressFieldsGroup, CardHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { MiddleNameInput } from './middle-name-input'
import { PrefixInput } from './prefix-input'
import { ProfessionalSuffixSelect } from './profesional-suffix-select'
import { SuffixInput } from './suffix-input'

interface AlternativeInfoCardProps {
  googleApiKey: string
}

const AlternativeInfoCard = ({ googleApiKey }: AlternativeInfoCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Alternate/Previous info" />
      <Flex direction="column" px="2" py="2" gap="2">
        <Grid columns="6" gap="2">
          <FirstNameInput />
          <MiddleNameInput />
          <LastNameInput />
          <Grid columns="2" gap="2">
            <PrefixInput />
            <SuffixInput />
          </Grid>
          <ProfessionalSuffixSelect />
          <ProfessionalSuffixSelect />
        </Grid>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <AddressFieldsGroup
            columnsPerRow="2"
            className="flex-row"
            required={false}
          />
        </GooglePlacesContextProvider>
      </Flex>
    </Flex>
  )
}

export { AlternativeInfoCard }
