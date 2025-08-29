import { useState } from 'react'
import { Box, Grid, Text } from '@radix-ui/themes'
import { type SchemaType } from '../schema'
import { ClaimProcessingFaxNumber } from './claim-processing-fax-input'
import { ClaimProcessingPhoneNumber } from './claim-processing-phone-input'
import { CredentialingContractingEmail } from './credentialing-contracting-email-input'
import { CredentialingContractingPhoneNumber } from './credentialing-contracting-phone-input'
import { NetworkRepresentativeEmail } from './network-representative-email-input'
import { PayerNetworkRepresentativeName } from './payer-network-representative-name-input'
import { PayerSelect } from './payer-select-dropdown'
import { PayerStatusSelect } from './payer-status-dropdown'
import { PayerTypeSelect } from './payer-type-dropdown'
import { PlanName } from './plan-name-input'
import { ProviderProtalURL } from './provider-portal-url-input'
import { PublicViewablePlan } from './pubic-viewable-plan-checkbox'
import { TestPlanCheckbox } from './test-plan-checkbox'

interface PayerPlanFormProps {
  isEditMode: boolean
}

const PayerPlanForm = ({ isEditMode }: PayerPlanFormProps) => {
  const [addingNewPayer] = useState(false)
  return (
    <>
      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Payer Information
          </Text>
        </Box>

        <Grid columns="1" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <PayerSelect
            isEditMode={isEditMode}
            addingNewPayer={addingNewPayer}
          />
        </Grid>
      </Box>

      <Box className="border-pp-grey  ml-1 mr-1 mt-2 rounded-[4px] border">
        <Box className="bg-pp-table-subRows pb-1 pl-2 pr-2 pt-1">
          <Text size="2" weight={'bold'} className="text-black mb-2 pb-2">
            Plan General Information
          </Text>
        </Box>

        <Grid columns="4" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <TestPlanCheckbox />
          <PublicViewablePlan />
        </Grid>
        <Grid columns="3" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <PlanName />
          <PayerTypeSelect />
          <PayerStatusSelect />
        </Grid>
        <Grid columns="3" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <ProviderProtalURL />
          <ClaimProcessingPhoneNumber />
          <CredentialingContractingPhoneNumber />
        </Grid>
        <Grid columns="3" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <PayerNetworkRepresentativeName />
          <ClaimProcessingFaxNumber />
          <CredentialingContractingEmail />
        </Grid>
        <Grid columns="3" className="mb-2 mt-2 gap-3 pl-2 pr-2">
          <NetworkRepresentativeEmail />
        </Grid>
      </Box>
    </>
  )
}

export { PayerPlanForm, type SchemaType }
