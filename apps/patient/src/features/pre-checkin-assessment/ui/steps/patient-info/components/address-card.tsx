import {
  FeatureCard,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PlacesAutocomplete,
} from '@/components-v2'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext, UseFormReturn } from 'react-hook-form'

const secondaryFields = [
  'secondaryCity',
  'secondaryState',
  'secondaryPostalCode',
  'secondaryZipLast4',
  'secondaryStreet1',
  'secondaryStreet2',
]

const AddressCard = () => {
  const form = useFormContext()
  const mailingSameAsPrimary = form.watch('isMailingAddressSameAsPrimary')

  return (
    <Flex
      direction={{ initial: 'column', sm: 'row' }}
      className="w-full overflow-hidden rounded-2 border border-gray-5"
      align="baseline"
    >
      <Box className="w-full md:w-1/2">
        <FeatureCard
          title="Primary Address"
          showTitleInsideCard
          containerClassName="border-none"
          contentClassName="px-3 md:px-5"
        >
          <PlacesAutocomplete
            name="primary"
            label="Primary"
            direction="row"
            containerClassName="mt-1"
          />
        </FeatureCard>
      </Box>
      <Box className="w-full md:w-1/2">
        <FeatureCard
          title={mailingAddressTitle(mailingSameAsPrimary, form)}
          showTitleInsideCard
          containerClassName="border-none"
          contentClassName="px-3 md:px-5"
        >
          <PlacesAutocomplete
            name="secondary"
            label="Mailing"
            direction="row"
            editable={mailingSameAsPrimary}
          />
        </FeatureCard>
      </Box>
    </Flex>
  )
}

const mailingAddressTitle = (
  mailingSameAsPrimary: boolean,
  form: UseFormReturn,
) => {
  return (
    <Flex className="flex-1" gap="2"  align={{ initial: 'start', sm: 'center' }} direction={{ initial: 'column', sm: 'row' }}>
      <Text className="whitespace-nowrap text-[20px] font-medium text-[#1C2024]">
        Mailing Address
      </Text>
      <FormFieldContainer className="mr-auto flex-1">
        <Flex
          className="h-fit md:h-[35px] rounded-1 bg-[#f0f4ff] px-[6px] py-2 md:py-0"
          align={{ initial: 'start', sm: 'center' }}
          direction={{ initial: 'column', sm: 'row' }}
          gap="2"
        >
          <FormFieldLabel className="text-[12px] font-medium">
            Is your mailing address same as primary?
          </FormFieldLabel>
          <RadioGroup.Root
            name="isMailingAddressSameAsPrimary"
            value={String(mailingSameAsPrimary)}
            onValueChange={(value) => onChangeMailingSameAsPrimary(value, form)}
          >
            <Flex gap="1">
              {['true', 'false'].map((option) => (
                <>
                  <RadioGroup.Item
                    key={option}
                    className="size-[18px] rounded-full bg-white cursor-default border border-gray-6"
                    value={option}
                    id={option}
                  >
                    <RadioGroup.Indicator className="rounded-full border-1 relative flex h-full w-full items-center justify-center border-gray-4 bg-accent-11">
                      <div className="rounded-full bg-white h-1.5 w-1.5" />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <Text
                    className="leading-none text-[12px] font-medium"
                    id={option}
                  >
                    {option === 'true' ? 'Yes' : 'No'}
                  </Text>
                </>
              ))}
            </Flex>
          </RadioGroup.Root>
        </Flex>
        <FormFieldError name="isMailingAddressSameAsPrimary" />
      </FormFieldContainer>
    </Flex>
  )
}

const onChangeMailingSameAsPrimary = (value: string, form: UseFormReturn) => {
  const isSame = value === 'true'
  form.setValue('isMailingAddressSameAsPrimary', isSame)

  if (isSame) {
    form.setValue('secondaryCity', form.getValues('primaryCity') || '')
    form.setValue('secondaryState', form.getValues('primaryState') || '')
    form.setValue(
      'secondaryPostalCode',
      form.getValues('primaryPostalCode') || '',
    )
    form.setValue('secondaryZipLast4', form.getValues('primaryZipLast4') || '')
    form.setValue('secondaryStreet1', form.getValues('primaryStreet1') || '')
    form.setValue('secondaryStreet2', form.getValues('primaryStreet2') || '')
  } else {
    secondaryFields.forEach((field) => {
      form.setValue(field, '')
    })
  }

  if (form.formState.isSubmitted) form.trigger(secondaryFields)
}

export default AddressCard
