import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer, FormSubmitButton } from '@/components'
import { schema, SchemaType } from '../schema'
import { StateCodeSet } from '../types'
import { LocationDropdown } from './location-select'
import { PatientSelect } from './patient-select'
import { ServiceDropdown } from './service-select'
import { StateDropdown } from './state-select'
import './style.css'
import TimedVisitForm from './timed/timed-visit-form'
import UntimedVisitForm from './untimed/untimed-visit-form'

const AddVisitForm = ({ states }: { states: StateCodeSet[] }) => {
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
      dcDate: undefined,
      dcHospitalName: undefined,
      visitDate: undefined,
      visitTime: '',
      duration: '',
      frequency: '',
    },
  })

  const isServiceTimeDependent = form.watch('isServiceTimeDependent')

  const onCreateNew: SubmitHandler<SchemaType> = (data) => {
    // addVisit(data).catch((error) => {
    //   console.log('Error adding visit', error)
    // })
  }

  const onAddUser = () => {
    alert('Add User Popup')
  }

  return (
    <FormContainer form={form} onSubmit={onCreateNew}>
      <Grid columns="12" className="min-w-[648px] gap-3">
        <Box className="col-span-10">
          <PatientSelect />
        </Box>

        <Box
          className={`col-span-2 flex ${
            form.formState?.errors?.patient ? 'items-center' : 'items-end'
          }`}
        >
          <Button
            size="1"
            className="bg-pp-black-1 text-white flex-1 cursor-pointer px-3 py-1.5 h-[21px]"
            onClick={onAddUser}
          >
            <Text size="1">Add User</Text>
          </Button>
        </Box>

        <Box className="col-span-4">
          <StateDropdown states={states} />
        </Box>
        <Box className="col-span-4">
          <LocationDropdown states={states} />
        </Box>
        <Box className="col-span-4">
          <ServiceDropdown />
        </Box>

        {isServiceTimeDependent ? <TimedVisitForm /> : <UntimedVisitForm />}
      </Grid>
      <Flex justify="between" mt="3">
        <Button
          className="text-xs bg-white text-pp-black-3
          active:bg-pp-focus-bg active:text-pp-blue border-pp-black-3 cursor-pointer border px-3 py-1.5"
          color="gray"
          variant="outline"
        >
          <Text size="1">Add Vacation</Text>
        </Button>
        <FormSubmitButton
          className="bg-pp-black-1 text-white cursor-pointer px-3 py-1.5"
          form={form}
        >
          <Text size="1">Save</Text>
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { AddVisitForm }
