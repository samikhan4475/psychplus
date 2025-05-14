import React from 'react'
import { Flex, Grid, RadioGroup, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  AddressFieldsGroup,
  DatePickerInput,
  FormContainer,
  FormFieldContainer,
  FormFieldLabel,
  TabContentHeading,
} from '@/components'
import { GOOGLE_MAPS_API_KEY } from '@/constants'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { SavePreferredPartnerProfileButton } from './save-preferred-partner-profile-button'

const textFieldClass =
  'border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]'

const PreferredPartnerProfileForm = () => {
  const form = useForm()

  const onSubmit = () => {
    console.log('Form submitted:')
  }
  return (
    <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <FormContainer className="bg-white" form={form} onSubmit={onSubmit}>
        <TabContentHeading title="Profile">
          <Flex align="center" gap="2">
            <SavePreferredPartnerProfileButton />
          </Flex>
        </TabContentHeading>

        <Grid columns="8" gap="3" p="4">
          <FormFieldContainer>
            <FormFieldLabel>PP Name</FormFieldLabel>
            <TextField.Root size="1" className={textFieldClass} />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel>ID (internal ID)</FormFieldLabel>
            <TextField.Root size="1" className={textFieldClass} />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel required>Total Users</FormFieldLabel>
            <TextField.Root size="1" className={textFieldClass} />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel required>Total Users IDs</FormFieldLabel>
            <TextField.Root size="1" className={textFieldClass} />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel className="mb-2" required>
              PP Status
            </FormFieldLabel>
            <RadioGroup.Root className="flex-row gap-2" size="1" highContrast>
              <RadioGroup.Item value="Basic">Basic</RadioGroup.Item>
              <RadioGroup.Item value="Plus">Plus</RadioGroup.Item>
            </RadioGroup.Root>
          </FormFieldContainer>
          <FormFieldContainer className="col-span-3">
            <FormFieldLabel className="mb-2" required>
              -PP Payer Status
            </FormFieldLabel>
            <RadioGroup.Root className="flex-row gap-2" size="1" highContrast>
              <RadioGroup.Item value="Self-pay">Self-Pay</RadioGroup.Item>
              <RadioGroup.Item value="Insurance">Insurance</RadioGroup.Item>
              <RadioGroup.Item value="Custom">Custom</RadioGroup.Item>
            </RadioGroup.Root>
          </FormFieldContainer>
        </Grid>
        <Grid columns="3" gap="2" px="4">
          <FormFieldContainer className="bg-gray-2 px-1 py-2">
            <FormFieldLabel required className="mb-1">
              Individual
            </FormFieldLabel>
            <Flex gap="2">
              <FormFieldContainer>
                <FormFieldLabel>Number</FormFieldLabel>
                <TextField.Root size="1" className={textFieldClass} />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldLabel>Rate</FormFieldLabel>
                <TextField.Root size="1" className={textFieldClass} />
              </FormFieldContainer>
            </Flex>
          </FormFieldContainer>
          <FormFieldContainer className="bg-gray-2 px-1 py-2">
            <FormFieldLabel required className="mb-1">
              Couple
            </FormFieldLabel>
            <Flex gap="2">
              <FormFieldContainer>
                <FormFieldLabel>Number</FormFieldLabel>
                <TextField.Root size="1" className={textFieldClass} />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldLabel>Rate</FormFieldLabel>
                <TextField.Root size="1" className={textFieldClass} />
              </FormFieldContainer>
            </Flex>
          </FormFieldContainer>
          <FormFieldContainer className="bg-gray-2 px-1 py-2">
            <FormFieldLabel required className="mb-1">
              Family
            </FormFieldLabel>
            <Flex gap="2">
              <FormFieldContainer>
                <FormFieldLabel>Number</FormFieldLabel>
                <TextField.Root size="1" className={textFieldClass} />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldLabel>Rate</FormFieldLabel>
                <TextField.Root size="1" className={textFieldClass} />
              </FormFieldContainer>
            </Flex>
          </FormFieldContainer>
        </Grid>
        <Grid columns="6" gap="2" p="4">
          <FormFieldContainer>
            <FormFieldLabel required>Total Charge Amount Plus</FormFieldLabel>
            <TextField.Root size="1" className={textFieldClass} />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel required>
              Total Charge Amount Service
            </FormFieldLabel>
            <TextField.Root size="1" className={textFieldClass} />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel className="mb-2" required>
              Billing Frequency
            </FormFieldLabel>
            <RadioGroup.Root className="flex-row gap-2 " size="1" highContrast>
              <RadioGroup.Item value="Monthly">Monthly</RadioGroup.Item>
              <RadioGroup.Item value="Annual">Annual</RadioGroup.Item>
            </RadioGroup.Root>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel>Start Date</FormFieldLabel>
            <DatePickerInput field="startDate" />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel>Next Payment</FormFieldLabel>
            <DatePickerInput field="endDate" />
          </FormFieldContainer>
        </Grid>
        <Flex direction={'row'} justify="between" align="center" px="4">
          <FormFieldContainer>
            <FormFieldLabel required className="mb-1">
              Primary Address
            </FormFieldLabel>
          </FormFieldContainer>
          <FormFieldContainer className="w-fit flex-row gap-3 bg-[#f0f4ff] px-2 py-1">
            <FormFieldLabel>
              Does your Mailing Address is the Same as Primary Address
            </FormFieldLabel>
            <RadioGroup.Root className="flex-row gap-2" size="1" highContrast>
              <RadioGroup.Item value="Yes">Yes</RadioGroup.Item>
              <RadioGroup.Item value="No">No</RadioGroup.Item>
            </RadioGroup.Root>
          </FormFieldContainer>
        </Flex>
        <Grid columns="2" gap="2" p="4" pt="0">
          <AddressFieldsGroup columnsPerRow="2" />
          <AddressFieldsGroup columnsPerRow="2" disabled />
        </Grid>
      </FormContainer>
    </GooglePlacesContextProvider>
  )
}

export { PreferredPartnerProfileForm }
