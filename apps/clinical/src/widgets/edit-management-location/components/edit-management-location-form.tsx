import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { Save } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSubmitButton, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { GooglePlacesContextProvider } from '@/providers'
import { LocationInfo } from './location-info'

interface EditManagementLocationFormProps {
  googleApiKey: string
}

const schema = z.object({
  name: validate.requiredString,
  npi: validate.requiredString,
  taxonomy: validate.requiredString,
  phone: validate.phoneNumber,
  fax: validate.requiredString,
  status: validate.requiredString,
  testLocation: validate.requiredString,
  id: validate.requiredString,
  address1: validate.requiredString,
  address2: validate.optionalString,
  locationType: validate.requiredString,
  zip: validate.requiredString,
  city: validate.requiredString,
  state: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const EditManagementLocationForm = ({
  googleApiKey,
}: EditManagementLocationFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: '123455',
      name: 'Willow brook',
      npi: '1234567890',
      taxonomy: '207Q00000X',
      phone: '+1 (XXX) XXX-XXXX',
      fax: '+1 (555) 123-4567',
      status: '',
      testLocation: 'Yes',
      address1: '',
      address2: '',
      locationType: 'Clinic',
      zip: '',
      city: '',
      state: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="gap-0">
      <Flex
        align={'center'}
        justify={'between'}
        className="rounded-br-1 rounded-tr-1 bg-[#fff] px-2 py-1 "
      >
        <Heading weight={'bold'} size={'4'}>
          Profile
        </Heading>
        <Flex align={'center'} className="gap-[9px]">
          <Button className="h-6 border border-solid border-[#9E9898] bg-transparent text-[12px] font-medium text-[#1C2024]">
            Hx
          </Button>
          <FormSubmitButton
            size={'2'}
            className="h-6 bg-[#151B4A] text-[12px] font-regular"
          >
            <Save width={'12px'} height={'12px'} /> Save
          </FormSubmitButton>
        </Flex>
      </Flex>
      <GooglePlacesContextProvider apiKey={googleApiKey}>
        <Box className="mt-[1px] rounded-[4px] bg-[#fff]">
          <LocationInfo />
        </Box>
      </GooglePlacesContextProvider>
    </FormContainer>
  )
}

export { EditManagementLocationForm }
