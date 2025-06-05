'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, RadioGroup, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  AddressFieldsGroup,
  DatePickerInput,
  DropdownSelect,
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TabContentHeading,
  YesNoSelect,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { deepSanitizeFormDataWithBooleans } from '@/utils'
import {
  schema,
  SchemaType,
} from '../preferred-partner/dialogs/add-preferred-partner/schema'
import { PreferredPartnerItem } from '../preferred-partner/types'
import { getPPStatuses } from '../preferred-partner/utils'
import { updatePreferredPartnerAction } from './actions'
import { BillingAddressGroup } from './billing-address-group'
import { transformIn, transformOut } from './data'
import { SavePreferredPartnerProfileButton } from './save-preferred-partner-profile-button'

const textFieldClass =
  'border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]'

interface PreferredPartnerProfileFormProps {
  profile: PreferredPartnerItem
  googleApiKey: string
}

const PreferredPartnerProfileForm = ({
  profile,
  googleApiKey,
}: PreferredPartnerProfileFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: transformIn(profile),
  })

  const subscriptionStatus = form.watch('subscriptionStatus')
  useEffect(() => {
    if (subscriptionStatus.includes('_')) {
      const [, paymentType] = subscriptionStatus.split('_')
      form.setValue('payerStatus', paymentType)
      form.setValue('fixedPaymentType', '')
    } else if (subscriptionStatus) {
      form.setValue('fixedPaymentType', subscriptionStatus)
    }
  }, [subscriptionStatus, form])
  const fixedPaymentType = useCodesetOptions(CODESETS.FixedPaymentType)
  const ppStatuses = getPPStatuses(
    useCodesetCodes(CODESETS.PaymentType),
    useCodesetCodes(CODESETS.MembershipType),
  )
    ?.map((option) => ({ label: option.display, value: option.value }))
    .concat(fixedPaymentType)

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const payload = transformOut(data)
    const sanitizedPayload = deepSanitizeFormDataWithBooleans(payload)

    const result = await updatePreferredPartnerAction({
      preferredPartnerId: profile.id,
      payload: sanitizedPayload,
    })
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }
    toast.success('Profile Updated Successfully')
  }

  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <FormContainer className="bg-white" form={form} onSubmit={onSubmit}>
        <TabContentHeading title="Profile">
          <Flex align="center" gap="2">
            <SavePreferredPartnerProfileButton />
          </Flex>
        </TabContentHeading>

        <Grid columns="8" gap="3" p="4">
          <FormFieldContainer>
            <FormFieldLabel>PP Name</FormFieldLabel>
            <TextField.Root
              size="1"
              className={textFieldClass}
              {...form.register('name')}
            />
            <FormFieldError name="name" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel required>Total Users</FormFieldLabel>
            <TextField.Root
              disabled
              size="1"
              type="number"
              className={textFieldClass}
              value={form.watch('totalUsers')?.toString() ?? ''}
              readOnly
            />
            <FormFieldError name="totalUsers" />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel required>Total Users IDs</FormFieldLabel>
            <TextField.Root
              size="1"
              disabled
              type="number"
              className={textFieldClass}
              value={form.watch('totalUserIds')?.toString() ?? ''}
              readOnly
            />
            <FormFieldError name="totalUserIds" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel required>PP Status</FormFieldLabel>
            <DropdownSelect field="subscriptionStatus" options={ppStatuses} />
            <FormFieldError name="subscriptionStatus" />
          </FormFieldContainer>
          <FormFieldContainer className="col-span-3">
            <FormFieldLabel required>-PP Payer Status</FormFieldLabel>
            <RadioGroup.Root
              value={form.watch('payerStatus')}
              onValueChange={(val) => form.setValue('payerStatus', val)}
              className="flex-row gap-2"
              size="1"
              highContrast
            >
              <RadioGroup.Item value="SelfPay">Self-Pay</RadioGroup.Item>
              <RadioGroup.Item value="Insurance">Insurance</RadioGroup.Item>
              <RadioGroup.Item value="CustomPayment">Custom</RadioGroup.Item>
            </RadioGroup.Root>
            <FormFieldError name="payerStatus" />
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
                <TextField.Root
                  disabled
                  size="1"
                  type="number"
                  className={textFieldClass}
                  {...form.register('individualsCount', {
                    valueAsNumber: true,
                  })}
                />
                <FormFieldError name="individualsCount" />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldLabel>Rate</FormFieldLabel>
                <TextField.Root
                  size="1"
                  type="number"
                  className={textFieldClass}
                  {...form.register('individualRate', { valueAsNumber: true })}
                />
                <FormFieldError name="individualRate" />
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
                <TextField.Root
                  disabled
                  size="1"
                  type="number"
                  className={textFieldClass}
                  {...form.register('couplesCount', { valueAsNumber: true })}
                />
                <FormFieldError name="couplesCount" />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldLabel>Rate</FormFieldLabel>
                <TextField.Root
                  size="1"
                  type="number"
                  className={textFieldClass}
                  {...form.register('coupleRate', { valueAsNumber: true })}
                />
                <FormFieldError name="coupleRate" />
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
                <TextField.Root
                  disabled
                  size="1"
                  type="number"
                  className={textFieldClass}
                  {...form.register('familiesCount', { valueAsNumber: true })}
                />
                <FormFieldError name="familiesCount" />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldLabel>Rate</FormFieldLabel>
                <TextField.Root
                  size="1"
                  type="number"
                  className={textFieldClass}
                  {...form.register('familyRate', { valueAsNumber: true })}
                />
                <FormFieldError name="familyRate" />
              </FormFieldContainer>
            </Flex>
          </FormFieldContainer>
        </Grid>
        <Grid columns="6" gap="2" p="4">
          <FormFieldContainer>
            <FormFieldLabel required>Total Charge Amount Plus</FormFieldLabel>
            <TextField.Root
              disabled
              size="1"
              type="number"
              className={textFieldClass}
              {...form.register('plusChargeAmount', { valueAsNumber: true })}
            />
            <FormFieldError name="plusChargeAmount" />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel required>
              Total Charge Amount Service
            </FormFieldLabel>
            <TextField.Root
              disabled
              size="1"
              type="number"
              className={textFieldClass}
              {...form.register('serviceChargeAmount', { valueAsNumber: true })}
            />
            <FormFieldError name="serviceChargeAmount" />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel className="mb-2" required>
              Billing Frequency
            </FormFieldLabel>
            <RadioGroup.Root
              value={form.watch('billingFrequency')}
              onValueChange={(val) =>
                form.setValue(
                  'billingFrequency',
                  val as 'Day' | 'Month' | 'Year',
                )
              }
              className="flex-row gap-2"
              size="1"
              highContrast
            >
              <RadioGroup.Item value="Month">Monthly</RadioGroup.Item>
              <RadioGroup.Item value="Year">Annual</RadioGroup.Item>
            </RadioGroup.Root>
            <FormFieldError name="billingFrequency" />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel>Start Date</FormFieldLabel>
            <DatePickerInput field="startDate" />
            <FormFieldError name="startDate" />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormFieldLabel>Next Payment</FormFieldLabel>
            <DatePickerInput field="nextPaymentDate" />
            <FormFieldError name="nextPaymentDate" />
          </FormFieldContainer>
        </Grid>
        <Flex direction={'row'} justify="between" align="center" px="4">
          <FormFieldContainer>
            <FormFieldLabel required className="mb-1">
              Primary Address
            </FormFieldLabel>
          </FormFieldContainer>
          <Box className="bg-[#f0f4ff] p-1">
            <YesNoSelect
              field="isMailingAddressSameAsPrimary"
              label="Does your Billing Address is the Same as Primary Address"
              className="border-none"
              onChange={(val) => {
                form.setValue('isMailingAddressSameAsPrimary', val as 'yes' | 'no')
                form.setValue(
                  'contactDetails.isMailingAddressSameAsPrimary',
                  val === 'yes',
                )
              }}
            />
          </Box>
        </Flex>
        <Grid columns="2" gap="2" p="4" pt="0">
          <AddressFieldsGroup
            columnsPerRow="2"
            prefix="contactDetails.addresses.0"
            addressFieldName="street1"
          />
          <BillingAddressGroup />
        </Grid>
      </FormContainer>
    </GooglePlacesContextProvider>
  )
}

export { PreferredPartnerProfileForm }
