import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer, FormSubmitButton } from '@/components'
import { schema, SchemaType } from '../schema'
import { StateCodeSet } from '../../types'
import { LocationSelect } from './location-select'
import { PatientText } from './patient-text'
import { ServiceSelect } from './service-select'
import { StateSelect } from './state-select'
import TimedVisitForm from './timed/timed-visit-form'

const EditVisitForm = ({ states }: { states: StateCodeSet[] }) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patient: undefined,
      state: '',
      location: '',
      service: '',
      providerType: '',
      provider: '',
      visitType: '',
      visitDate: undefined,
      visitTime: '',
      duration: '',
      frequency: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    // @Todo: API call
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="12" className="min-w-[648px] gap-3">
        <Box className="col-span-12">
          <PatientText />
        </Box>
        <Box className="col-span-4">
          <StateSelect states={states} />
        </Box>
        <Box className="col-span-4">
          <LocationSelect states={states} />
        </Box>
        <Box className="col-span-4">
          <ServiceSelect />
        </Box>

        <TimedVisitForm />
      </Grid>
      <Flex justify="between" mt="3">
        <FormSubmitButton
          className="bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5"
          form={form}
        >
          <Text size="2">Save</Text>
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { EditVisitForm }
