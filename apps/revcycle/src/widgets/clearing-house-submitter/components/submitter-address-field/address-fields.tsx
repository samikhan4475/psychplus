import { Box, Flex, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { useGooglePlacesContext } from '@/providers'
import { SubmitterFormSchema } from '../../schema/submitterForm.schema'
import { PlacesAutocomplete } from '../places-autocomplete'
import TextFieldLabel from './text-field'

const AddressComponent = ({
  title,
  form,
}: {
  title?: string
  form: UseFormReturn<SubmitterFormSchema>
}) => {
  const { loaded } = useGooglePlacesContext()

  return (
    <>
      {title &&
        <Flex my="1">
          <Text size="3" weight="bold">
            {title}
          </Text>
        </Flex>
      }

      <Flex gap="2" my="1" >
        <Box className='flex-1'>
          {loaded && <PlacesAutocomplete required name={'address'} form={form} />}
        </Box>
        <Box className='flex-1'>
          <TextFieldLabel
            label="Address 2"
            type="text"
            error={form.formState?.errors?.addressLine2?.message}
            onChange={(value: string) => {
              form.setValue(`addressLine2`, value)
            }}
            register={form.register('addressLine2')}
          />
        </Box>
      </Flex>
    </>
  )
}

export default AddressComponent