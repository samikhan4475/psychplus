'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { AddressFieldsGroup, CardHeading } from '@/components'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { MiddleNameInput } from './middle-name-input'
import { PrefixInput } from './prefix-input'
import { ProfessionalSuffixSelect } from './profesional-suffix-select'
import { SuffixInput } from './suffix-input'

const AlternativeInfoCard = () => {
  return (
    <Flex direction="column" className="bg-white overflow-visible rounded-1">
      <CardHeading title="Alternate/Previous info" className="rounded-t-1" />
      <Flex direction="column" px="2" py="2" gap="2">
        <Grid columns="6" gap="2">
          <FirstNameInput />
          <MiddleNameInput />
          <LastNameInput />
          <Grid columns="3" gap="2" className="col-span-3">
            <PrefixInput />
            <SuffixInput />
            <ProfessionalSuffixSelect />
          </Grid>
        </Grid>
        <AddressFieldsGroup
          columnsPerRow="2"
          className="flex-row"
          prefix="alternateOrPreviousContactDetails.homeAddress"
          addressFieldName="street1"
          required={false}
        />
      </Flex>
    </Flex>
  )
}

export { AlternativeInfoCard }
