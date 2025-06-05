import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Flex,
  Grid,
  RadioGroup,
  TextField,
} from '@radix-ui/themes'
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
  YesNoSelect,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { deepSanitizeFormData, getPaddedDateString } from '@/utils'
import { addPreferredPartnerAction } from '../../actions'
import { useStore } from '../../store'
import { getPPStatuses } from '../../utils'
import { BillingAddressGroup } from './billing-address-group'
import { schema, SchemaType } from './schema'
import { getInitialValues } from './utils'

interface AddPreferredPartnerDialogFormProps {
  onClose: (open: boolean) => void
}

const textFieldClass =
  'border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]'
const mailingOptions = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]
const AddPreferredPartnerDialogForm = ({
  onClose,
}: AddPreferredPartnerDialogFormProps) => {
  const search = useStore((state) => state.search)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: getInitialValues(),
  })
  const id = form.watch('id')
  const subscriptionStatus = form.watch('subscriptionStatus')
  const fixedPaymentType = useCodesetOptions(CODESETS.FixedPaymentType)
  const ppStatuses = getPPStatuses(
    useCodesetCodes(CODESETS.PaymentType),
    useCodesetCodes(CODESETS.MembershipType),
  )
    ?.map((option) => ({ label: option.display, value: option.value }))
    .concat(fixedPaymentType)
  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const {
      startDate,
      nextPaymentDate,
      subscriptionStatus,
      isMailingAddressSameAsPrimary,
    } = data

    const isSameAddress = isMailingAddressSameAsPrimary === 'yes'

    let addresses = data.contactDetails.addresses

    if (isSameAddress && addresses.length >= 2) {
      const primary = addresses[0]
      addresses = [
        primary,
        {
          ...primary,
          type: 'Billing',
        },
      ]
    }

    const payload = {
      ...data,
      subscriptionStatus: subscriptionStatus.includes('_')
        ? subscriptionStatus.split('_')?.[0]
        : '',
      startDate: startDate ? getPaddedDateString(startDate) : null,
      nextPaymentDate: nextPaymentDate
        ? getPaddedDateString(nextPaymentDate)
        : null,
      contactDetails: {
        ...data.contactDetails,
        addresses: addresses,
        isMailingAddressSameAsPrimary: isSameAddress,
      },
      isMailingAddressSameAsPrimary: undefined,
    }

    const sanitizedPayload = deepSanitizeFormData(payload)

    const result = await addPreferredPartnerAction(sanitizedPayload)

    if (result.state === 'error') {
      toast.error(result.error)
      return
    }
    toast.success('Preferred Partner Saved Successfully')
    form.reset()
    onClose(false)
    search({}, 1, true)
  }

  useEffect(() => {
    if (subscriptionStatus.includes('_')) {
      const [, paymentType] = subscriptionStatus.split('_')
      form.setValue('payerStatus', paymentType)
      form.setValue('fixedPaymentType', '')
    } else if (subscriptionStatus) {
      form.setValue('fixedPaymentType', subscriptionStatus)
    }
  }, [subscriptionStatus])

  const isNew = !id || id.trim() === ''
  return (
    <FormContainer form={form} className="gap-2" onSubmit={onSubmit}>
      <Grid columns="3" gap="3">
        <FormFieldContainer>
          <FormFieldLabel required>PP Name</FormFieldLabel>
          <TextField.Root
            {...form.register('name')}
            size="1"
            className={textFieldClass}
          />
          <FormFieldError name="name" />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel required={!isNew}>Total Users</FormFieldLabel>
          <TextField.Root disabled size="1" className={textFieldClass} />
          <FormFieldError name="totalUserIds" />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel required={!isNew}>Total Users IDs</FormFieldLabel>
          <TextField.Root
            disabled
            {...form.register('totalUserIds', { valueAsNumber: true })}
            size="1"
            className={textFieldClass}
            inputMode="numeric"
          />
          <FormFieldError name="totalUserIds" />
        </FormFieldContainer>

        <FormFieldContainer>
          <FormFieldLabel className="mb-2">PP Status</FormFieldLabel>
          <DropdownSelect field="subscriptionStatus" options={ppStatuses} />
          <FormFieldError name="subscriptionStatus" />
        </FormFieldContainer>
        <FormFieldContainer className="col-span-2">
          <FormFieldLabel className="mb-2" required>
            -PP Payer Status
          </FormFieldLabel>

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
      <Grid columns="3" gap="2">
        <FormFieldContainer className="bg-gray-2 px-1 py-2">
          <FormFieldLabel required={!isNew} className="mb-1">
            Individual
          </FormFieldLabel>
          <Flex gap="2">
            <FormFieldContainer>
              <FormFieldLabel>Number</FormFieldLabel>
              <TextField.Root
                disabled={isNew}
                {...form.register('individualsCount', { valueAsNumber: true })}
                size="1"
                className={textFieldClass}
              />
              <FormFieldError name="individualsCount" />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel required>Rate</FormFieldLabel>
              <TextField.Root
                {...form.register('individualRate', { valueAsNumber: true })}
                size="1"
                className={textFieldClass}
                inputMode="numeric"
              />
              <FormFieldError name="individualRate" />
            </FormFieldContainer>
          </Flex>
        </FormFieldContainer>
        <FormFieldContainer className="bg-gray-2 px-1 py-2">
          <FormFieldLabel required={!isNew} className="mb-1">
            Couple
          </FormFieldLabel>
          <Flex gap="2">
            <FormFieldContainer>
              <FormFieldLabel>Number</FormFieldLabel>
              <TextField.Root
                disabled={isNew}
                {...form.register('couplesCount', { valueAsNumber: true })}
                size="1"
                className={textFieldClass}
              />
              <FormFieldError name="couplesCount" />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel required>Rate</FormFieldLabel>
              <TextField.Root
                {...form.register('coupleRate', { valueAsNumber: true })}
                size="1"
                className={textFieldClass}
              />
              <FormFieldError name="coupleRate" />
            </FormFieldContainer>
          </Flex>
        </FormFieldContainer>
        <FormFieldContainer className="bg-gray-2 px-1 py-2">
          <FormFieldLabel required={!isNew} className="mb-1">
            Family
          </FormFieldLabel>
          <Flex gap="2">
            <FormFieldContainer>
              <FormFieldLabel>Number</FormFieldLabel>
              <TextField.Root
                disabled={isNew}
                {...form.register('familiesCount', { valueAsNumber: true })}
                size="1"
                className={textFieldClass}
              />
              <FormFieldError name="familiesCount" />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel required>Rate</FormFieldLabel>
              <TextField.Root
                {...form.register('familyRate', { valueAsNumber: true })}
                size="1"
                className={textFieldClass}
              />
              <FormFieldError name="familyRate" />
            </FormFieldContainer>
          </Flex>
        </FormFieldContainer>
      </Grid>
      <Grid columns="3" gap="3">
        <FormFieldContainer>
          <FormFieldLabel required={!isNew}>
            Total Charge Amount Plus
          </FormFieldLabel>
          <TextField.Root
            disabled={isNew}
            {...form.register('plusChargeAmount', { valueAsNumber: true })}
            size="1"
            className={textFieldClass}
          />
          <FormFieldError name="plusChargeAmount" />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel required={!isNew}>
            Total Charge Amount Service
          </FormFieldLabel>
          <TextField.Root
            disabled={isNew}
            {...form.register('serviceChargeAmount', { valueAsNumber: true })}
            size="1"
            className={textFieldClass}
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
              form.setValue('billingFrequency', val as 'Day' | 'Month' | 'Year')
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
      <FormFieldContainer>
        <FormFieldLabel required className="mb-1">
          Primary Address
        </FormFieldLabel>
        <AddressFieldsGroup
          prefix="contactDetails.addresses.0"
          addressFieldName="street1"
        />
      </FormFieldContainer>
      <Box className="bg-[#f0f4ff] p-1">
        <YesNoSelect
          field="isMailingAddressSameAsPrimary"
          options={mailingOptions}
          label="Is your Billing Address the same as Primary?"
          className="border-none"
          onChange={(val) => {
            form.setValue(
              'isMailingAddressSameAsPrimary',
              val === 'yes' ? 'yes' : 'no',
            )
            form.setValue(
              'contactDetails.isMailingAddressSameAsPrimary',
              val === 'yes',
            )
          }}
        />
      </Box>
      <BillingAddressGroup />
      <Button
        type="submit"
        size="2"
        disabled={form.formState.isSubmitting}
        className="ml-auto w-fit"
        highContrast
        variant="solid"
      >
        Save
      </Button>
    </FormContainer>
  )
}

export { AddPreferredPartnerDialogForm }
