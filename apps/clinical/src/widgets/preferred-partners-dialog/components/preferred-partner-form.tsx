import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Dialog, Flex, RadioGroup, Switch, Text } from '@radix-ui/themes'
import { FormContainer } from 'node_modules/@psychplus/ui/src/form'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { validate } from '@psychplus/form'
import {
  createPreferredPartners,
  updatePreferredPartner,
} from '@psychplus/preferred-partners/api.client'
import { isEmpty } from '@psychplus/preferred-partners/utils'
import {  PreferredPartner } from '../types'
import AddressComponent from './address-fields'
import TextFieldLabel from './text-field'

const payerStatusMapping = [
  {
    label: 'Self-Pay',
    value: 'SelfPay',
  },
  {
    label: 'Insurance',
    value: 'Insurance',
  },
  {
    label: 'Custom',
    value: 'CustomPayment',
  },
]

const billingFrequencyMapping = [
  { label: 'Monthly', value: 'Month' },
  { label: 'Annualy', value: 'Year' },
]

const AddressSchema = z.object({
  type: z.string().optional(),
  street1: z.string().optional(),
  street2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
})

const ContactDetails = z
  .object({
    addresses: z.array(AddressSchema),
  })
  .optional()

const schema = z.object({
  id: validate.anyString,
  name: validate.anyString,
  individualRate: validate.numberOnly,
  coupleRate: validate.numberOnly,
  familyRate: validate.numberOnly,
  subscriptionStatus: validate.anyString.optional(),
  payerStatus: validate.anyString.optional(),
  billingFrequency: validate.anyString.optional(),
  plusChargeAmount: validate.numberOnly,
  serviceChargeAmount: validate.numberOnly,
  primaryAddress: AddressSchema,
  mailingAddress: AddressSchema.optional(),
  individualsCount: validate.numberOnly,
  couplesCount: validate.numberOnly,
  familiesCount: validate.numberOnly,
  totalIds: validate.numberOnly,
  totalUser: validate.numberOnly,
  contactDetails: ContactDetails.optional(),
})
type SchemaType = z.infer<typeof schema>

const PreferredPartnerForm = ({
  isProfileScreen = false,
  data,
  isEdit = false,
}: {
  isProfileScreen?: boolean
  isEdit?: boolean
  data?: SchemaType
}) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(data),
  });
  
  function getDefaultValues(data: SchemaType | undefined): SchemaType {
    const defaultValues: Partial<SchemaType> = {};
  
    if (data) {
      defaultValues.id = data.id || '';
      defaultValues.name = data.name || '';
      defaultValues.individualRate = Number(data.individualRate) || 0;
      defaultValues.coupleRate = Number(data.coupleRate) || 0;
      defaultValues.familyRate = Number(data.familyRate) || 0;
      defaultValues.subscriptionStatus = data.subscriptionStatus || 'Basic';
      defaultValues.payerStatus = data.payerStatus || 'SelfPay';
      defaultValues.billingFrequency = data.billingFrequency || 'Monthly';
      defaultValues.plusChargeAmount = Number(data.plusChargeAmount) || 0;
      defaultValues.serviceChargeAmount = Number(data.serviceChargeAmount) || 0;
      defaultValues.individualsCount = Number(data.individualsCount) || 0;
      defaultValues.couplesCount = Number(data.couplesCount) || 0;
      defaultValues.familiesCount = Number(data.familiesCount) || 0;
      defaultValues.totalIds = Number(data.totalIds) || 0;
      defaultValues.totalUser = Number(data.totalUser) || 0;
  
      defaultValues.primaryAddress = findAddress(data, 'Home') || {};
      defaultValues.mailingAddress = findAddress(data, 'Billing') || {};
    }
  
    return defaultValues as SchemaType;
  }
  
  function findAddress(data: SchemaType, type: string) {
    return data?.contactDetails?.addresses.find((address) => address.type === type);
  }
  
  const [toggle, setToggle] = useState(false)

  const mailingAddressHandler = () => {
    setToggle(!toggle)
  }

  const onSubmit: SubmitHandler<SchemaType> = (formData: {
    [key: string]: any
  }) => {
    formData.contactDetails = { addresses: [] }
    if (formData.primaryAddress && !isEmpty(formData?.primaryAddress)) {
      formData.contactDetails.addresses.push({
        ...formData.primaryAddress,
        type: 'Home',
      })
    }
    if (
      formData.primaryAddress &&
      !isEmpty(formData?.primaryAddress) &&
      toggle
    ) {
      formData.contactDetails.addresses.push({
        ...formData.primaryAddress,
        type: 'Billing',
      })
    } else if (formData?.mailingAddress && !isEmpty(formData?.mailingAddress)) {
      formData.contactDetails.addresses.push(formData.mailingAddress)
    }
    delete formData.primaryAddress
    delete formData.mailingAddress
    delete formData.id
    if (isEdit && data?.id) {
      updatePreferredPartner(
        {
          ...formData,
          isTest: true,
          recordStatus: 'Active',
        } as PreferredPartner,
        data?.id,
      )
        .then(() => {
          window.location.replace(`/widgets/preferred-partners-list`)
        })
        .catch((err: Error) => {
          alert(err)
        })
    } else {
      createPreferredPartners({
        ...formData,
        isTest: true,
        recordStatus: 'Active',
      } as PreferredPartner)
        .then(() => {
          window.location.replace(`/widgets/preferred-partners-list`)
        })
        .catch((err: Error) => {
          alert(err)
        })
    }
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <div className={`${isProfileScreen && 'grid grid-cols-2 gap-4'}`}>
        <div className={`col-span-1 grid grid-cols-5 gap-4`}>
          <Box className="col-span-2 flex-1">
            <TextFieldLabel
              error={form.formState?.errors?.name?.message}
              type="text"
              label="PP name"
              disabled={!isEdit}
              data-testid="signup-first-name-input"
              register={form.register('name')}
            />
          </Box>
          <Box className="flex-1">
            <TextFieldLabel
              type="text"
              label="ID (internal ID)"
              disabled={true}
            />
          </Box>
          <Box className="flex-1">
            <TextFieldLabel
              type="number"
              label="Total Users"
              disabled={!isEdit || !!data?.totalUser}
              className="bg-[#f2f2f5]"
              data-testid="signup-first-name-input"
              error={form.formState?.errors?.totalUser?.message}
              register={form.register('totalUser', { valueAsNumber: true })}
            />
          </Box>
          <Box className="flex-1">
            <TextFieldLabel
              type="number"
              label="Total Users IDs"
              disabled={!isEdit || !!data?.totalIds}
              className="bg-[#f2f2f5]"
              data-testid="signup-first-name-input"
              error={form.formState?.errors?.totalIds?.message}
              register={form.register('totalIds', { valueAsNumber: true })}
            />
          </Box>
        </div>

        <div
          className={`grid  grid-cols-5 gap-4 ${
            isProfileScreen ? '' : ' mt-4'
          }`}
        >
          <Box
            className={`flex-1 ${
              isProfileScreen ? 'col-span-1' : 'col-span-2'
            }`}
          >
            <Text className="mt-2" size="1">
              PP Status <span className="text-[#FF0000]">*</span>
            </Text>
            <RadioGroup.Root
              color="indigo"
              defaultValue={data?.subscriptionStatus || 'Basic'}
              disabled={!isEdit}
              className="mt-2"
              onValueChange={(value: string) => {
                form.setValue('subscriptionStatus', value)
              }}
            >
              <Flex gap="2">
                {['Basic', 'Plus'].map((option) => (
                  <Text as="label" key={option} size="1">
                    <Flex gap="1">
                      <RadioGroup.Item value={option} />
                      {option}
                    </Flex>
                  </Text>
                ))}
              </Flex>
            </RadioGroup.Root>
          </Box>

          <Box className={`${isProfileScreen ? 'col-span-2' : 'col-span-3'}`}>
            <Text className="mt-2" size="1">
              PP Payer Status <span className="text-[#FF0000]">*</span>
            </Text>
            <RadioGroup.Root
              color="indigo"
              defaultValue={data?.payerStatus || 'SelfPay'}
              disabled={!isEdit}
              className="mt-2 "
              onValueChange={(value: string) => {
                form.setValue('payerStatus', value)
              }}
            >
              <Flex gap="2">
                {payerStatusMapping.map(({ value, label }) => (
                  <Text as="label" key={value} size="1">
                    <Flex gap="1">
                      <RadioGroup.Item value={value} />
                      {label}
                    </Flex>
                  </Text>
                ))}
              </Flex>
            </RadioGroup.Root>
          </Box>
        </div>
      </div>
      <div className={`${isProfileScreen && 'grid grid-cols-2 gap-4'}`}>
        <Flex gap="4">
          <Box className="mb-2 flex-1">
            <Text size="1">
              Individual <span className="text-[#FF0000]">*</span>
            </Text>
            <Flex className="mt-2" gap={'2'}>
              <Box>
                <TextFieldLabel
                  type="number"
                  label="Number"
                  disabled={!isEdit}
                  error={form.formState?.errors?.individualsCount?.message}
                  register={form.register('individualsCount', {
                    valueAsNumber: true,
                  })}
                />
              </Box>
              <Box>
                <TextFieldLabel
                  type="number"
                  disabled={!isEdit}
                  label="Rate"
                  error={form.formState?.errors?.individualRate?.message}
                  register={form.register('individualRate', {
                    valueAsNumber: true,
                  })}
                />
              </Box>
            </Flex>
          </Box>

          <Box className="mb-2 flex-1">
            <Text size="1">
              Couple <span className="text-[#FF0000]">*</span>
            </Text>
            <Flex className="mt-2" gap={'2'}>
              <Box>
                <TextFieldLabel
                  type="number"
                  label="Number"
                  disabled={!isEdit}
                  error={form.formState?.errors?.couplesCount?.message}
                  register={form.register('couplesCount', {
                    valueAsNumber: true,
                  })}
                />
              </Box>
              <Box>
                <TextFieldLabel
                  type="number"
                  label="Rate"
                  disabled={!isEdit}
                  error={form.formState?.errors?.coupleRate?.message}
                  register={form.register('coupleRate', {
                    valueAsNumber: true,
                  })}
                />
              </Box>
            </Flex>
          </Box>

          <Box className="mb-2 flex-1">
            <Text size="1">
              Family <span className="text-[#FF0000]">*</span>
            </Text>
            <Flex className="mt-2" gap={'2'}>
              <Box>
                <TextFieldLabel
                  type="number"
                  label="Number"
                  disabled={!isEdit}
                  error={form.formState?.errors?.familiesCount?.message}
                  register={form.register('familiesCount', {
                    valueAsNumber: true,
                  })}
                />
              </Box>
              <Box>
                <TextFieldLabel
                  type="number"
                  label="Rate"
                  disabled={!isEdit}
                  error={form.formState?.errors?.familyRate?.message}
                  register={form.register('familyRate', {
                    valueAsNumber: true,
                  })}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Flex
          gap={'4'}
          className={`${isProfileScreen ? 'mb-2' : 'mt-2'}`}
          align={'end'}
        >
          <Box>
            <TextFieldLabel
              type="number"
              label="Total Charge Amount Plus"
              disabled={!isEdit}
              error={form.formState?.errors?.plusChargeAmount?.message}
              register={form.register('plusChargeAmount', {
                valueAsNumber: true,
              })}
            />
          </Box>
          <Box>
            <TextFieldLabel
              type="number"
              label="Total Charge Amount Service"
              disabled={!isEdit}
              error={form.formState?.errors?.serviceChargeAmount?.message}
              register={form.register('serviceChargeAmount', {
                valueAsNumber: true,
              })}
            />
          </Box>

          <Box className="flex-2">
            <Text className="pb-2" size="1">
              Billing Frequency <span className="text-[#FF0000]">*</span>
            </Text>
            <RadioGroup.Root
              color="indigo"
              disabled={!isEdit}
              defaultValue={data?.billingFrequency || 'Month'}
              onValueChange={(value: string) => {
                form.setValue('billingFrequency', value)
              }}
            >
              <Flex gap="2">
                {billingFrequencyMapping.map(({ value, label }) => (
                  <Text as="label" key={value} size="1">
                    <Flex gap="1">
                      <RadioGroup.Item value={value} />
                      {label}
                    </Flex>
                  </Text>
                ))}
              </Flex>
            </RadioGroup.Root>
          </Box>
        </Flex>
      </div>

      <AddressComponent
        form={form}
        isProfileScreen={isProfileScreen}
        isEdit={!isEdit}
        title="Primary Address"
      />

      <Flex
        justify={'between'}
        className="rounded-[5px] border border-gray-3 p-2"
      >
        <Text size="1">Does your mailing address same as primary address</Text>
        <Box>
          <Switch
            color="indigo"
            onClick={mailingAddressHandler}
            checked={toggle}
          />
        </Box>
      </Flex>

      {!toggle && (
        <AddressComponent
          form={form}
          isEdit={!isEdit}
          isProfileScreen={isProfileScreen}
          isMailingAddress={true}
        />
      )}

      {!isProfileScreen && (
        <Flex gap="3" justify="end" mt="3">
          <Dialog.Close>
            <button className="rounded-2 border !border-[#151B4A] bg-[white] px-4 py-2 text-[#151B4A]">
              Cancel
            </button>
          </Dialog.Close>
          <button
            type="submit"
            className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
          >
            Save
          </button>
        </Flex>
      )}
    </FormContainer>
  )
}

export { PreferredPartnerForm, type SchemaType }
