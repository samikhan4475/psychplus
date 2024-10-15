import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer, FormSubmitButton } from '@/components'
import { AddVacation } from '@/ui/vacation/add-vacation'
import { cn } from '@/utils'
import { schema, SchemaType } from '../schema'
import { LocationDropdown } from './location-select'
import { PatientSelect } from './patient-select'
import { ServiceDropdown } from './service-select'
import { StateDropdown } from './state-select'
import './style.css'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { State } from '@/types'
import { AddPatient } from '@/ui/patient/add-patient'
import { getUsStatesAction } from '../../actions'
import TimedVisitForm from './timed/timed-visit-form'
import UntimedVisitForm from './untimed/untimed-visit-form'

const AddVisitForm = ({ showAddUser = true }: { showAddUser?: Boolean }) => {
  const [states, setStates] = useState<State[]>([])
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

  const onPatientAdd = (newPatient: any) => {
    // onPatientAdd
  }

  const provider = form.watch('provider')

  useEffect(() => {
    getUsStatesAction().then((response) => {
      if (response.state === 'error') {
        toast.error('Failed to fetch US States')
        setStates([])
      } else {
        setStates(response.data)
      }
    })
  }, [])

  return (
    <FormContainer form={form} onSubmit={onCreateNew}>
      <Grid columns="12" className="min-w-[648px] gap-3">
        <Box className="col-span-10">
          <PatientSelect />
        </Box>

        {showAddUser && (
          <Box
            className={`col-span-2 flex ${
              form.formState?.errors?.patient ? 'items-center' : 'items-end'
            }`}
          >
            <AddPatient onPatientAdd={onPatientAdd}>
              <Button
                size="1"
                className="bg-pp-black-1 text-white h-[21px] flex-1 cursor-pointer px-3 py-1.5"
              >
                <Text size="1">Add User</Text>
              </Button>
            </AddPatient>
          </Box>
        )}

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
        {isServiceTimeDependent && (
          <AddVacation staffId={provider}>
            <Button
              className={cn(
                'text-xs bg-white text-pp-black-3 active:bg-pp-focus-bg active:text-pp-blue border-pp-black-3 cursor-pointer border px-3 py-1.5',
                !provider ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
              )}
              color="gray"
              variant="outline"
              disabled={!provider}
            >
              <Text size="1">Add Vacation</Text>
            </Button>
          </AddVacation>
        )}
        <FormSubmitButton
          className="bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5"
          form={form}
        >
          <Text size="1">Save</Text>
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { AddVisitForm }
