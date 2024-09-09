'use client'

import { Box, Flex, Grid, Heading } from '@radix-ui/themes'
import { Address1Field } from './address1-field'
import { Address2Field } from './address2-field'
import { CitySelect } from './city-select'
import { StateSelect } from './state-select'
import { ZipCodeField } from './zip-code-field'

const BillingAddress = () => {
  return (
    <Flex
      direction={'column'}
      width={'100%'}
      className="bg-white rounded-1 shadow-2"
    >
      <Box className="w-full bg-indigo-3 px-2 py-0.5">
        <Heading size={'2'}>Billing Address</Heading>
      </Box>
      <Grid columns={'6'} p={'2'} gap={'2'}>
        <Address1Field />
        <Address2Field />
        <CitySelect />
        <StateSelect />
        <ZipCodeField />
      </Grid>
    </Flex>
  )
}
export { BillingAddress }
