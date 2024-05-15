import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { zipCodeSchema } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormFieldContainer,
  FormFieldError,
  FormSubmitButton,
  ZipcodeInput,
} from '@/components-v2'
import { useStore } from '@/features/appointments/search/store'
import { FilterFieldLabel } from './filter-field-label'
import { NearbyLocationsFinder } from './nearby-locations-finder'

const schema = z.object({
  zipCode: zipCodeSchema,
})

type SchemaType = z.infer<typeof schema>

const ZipCodeSearchForm = () => {
  const { zipCode, setZipCode } = useStore((state) => ({
    zipCode: state.zipCode,
    setZipCode: state.setZipCode,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      zipCode,
    },
  })

  const onSubmit = (data: SchemaType) => {
    form.reset(form.getValues())
    setZipCode(data.zipCode)
  }

  return (
    <Flex direction="column" gap="2">
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex align="end" gap="2">
          <FormFieldContainer className="flex-1">
            <Flex align="center" gap="2">
              <FilterFieldLabel>ZIP</FilterFieldLabel>
              <FormFieldError name="zipCode" />
            </Flex>
            <ZipcodeInput
              size={{ initial: '2' }}
              className="sm:w-[105px]"
              {...form.register('zipCode')}
              placeholder="Enter ZIP"
              value={form.watch('zipCode')}
            />
          </FormFieldContainer>
          <FormSubmitButton
            size={{ initial: '2' }}
            className="flex-1 sm:flex-initial"
          >
            Search ZIP
          </FormSubmitButton>
        </Flex>
      </FormContainer>
      <NearbyLocationsFinder />
    </Flex>
  )
}

export { ZipCodeSearchForm }
