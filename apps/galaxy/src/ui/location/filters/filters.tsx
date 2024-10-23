import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { ResetButton } from '../../revenue-cycle/insurance-payment-tab/reset-button'
import { formSchema, FormSchemaType } from '../form-schema'
import { IdInputField } from './id-input-field'
import { LocationTypeField } from './location-type-field'
import { NameField } from './name-field'
import { NpiField } from './npi-field'
import { PhoneField } from './phone-field'
import { StateField } from './state-field'
import { StatusField } from './status-field'
import { ZipField } from './zip-field'

const Filters = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    criteriaMode: 'all',
    defaultValues: {
      locationId: '',
      locationType: '',
      locationName: '',
      locationState: '',
      locationZip: '',
      locationNpi: '',
      locationPhone: '',
      locationStatus: 'active',
    },
  })
  const onSubmit: SubmitHandler<FormSchemaType> =(data) => {
    return data
  };
  
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex
        gap="2"
        wrap="wrap"
        className="bg-white shadow-light-gray-08 whitespace-nowrap rounded-1 px-2 py-1"
      >
        <IdInputField />
        <LocationTypeField />
        <NameField />
        <StateField />
        <ZipField />
        <NpiField />
        <PhoneField />
        <StatusField />
        <ResetButton />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { Filters }