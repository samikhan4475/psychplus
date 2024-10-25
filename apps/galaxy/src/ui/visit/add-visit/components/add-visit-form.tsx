import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormSubmitButton } from '@/components'
import { NewPatient, State } from '@/types'
import { AddPatient } from '@/ui/patient/add-patient'
import { AddVacation } from '@/ui/vacation/add-vacation'
import { cn } from '@/utils'
import { getUsStatesAction } from '../../actions'
import { schema, SchemaType } from '../schema'
import { LocationDropdown } from './location-select'
import { PatientSelect } from './patient-select'
import { PatientText } from './patient-text'
import { ServiceDropdown } from './service-select'
import { StateDropdown } from './state-select'
import './style.css'
import { ProviderTypeDropdown } from './timed/provider-type-select'
import TimedVisitForm from './timed/timed-visit-form'
import UntimedVisitForm from './untimed/untimed-visit-form'

interface AddVisitFormProps {
  showAddUser?: boolean
  patient?: NewPatient
}

const AddVisitForm = ({ showAddUser = true, patient }: AddVisitFormProps) => {
  const [newPatient, setNewPatient] = useState<NewPatient>()
  const [states, setStates] = useState<State[]>([])
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patient: patient ?? undefined,
      state: patient?.state ?? '',
      location: '',
      service: '',
      providerType: '',
      provider: '',
      visitType: '',
      dcDate: undefined,
      dcLocation: undefined,
      visitDate: undefined,
      visitTime: '',
      duration: '',
      frequency: '',
      visitStatus: 'Unseen',
      visitFrequency: 'Daily',
      legal: 'Voluntary',
    },
  })

  const [isServiceTimeDependent, provider] = useWatch({
    control: form.control,
    name: ['isServiceTimeDependent', 'provider'],
  })

  useEffect(() => {
    if (!patient) return
    onPatientAdd(patient)
  }, [patient])

  const onCreateNew: SubmitHandler<SchemaType> = (data) => {}

  const onPatientAdd = (newPatient: NewPatient) => {
    form.setValue('patient', {
      id: Number(newPatient.accessToken),
      birthdate: newPatient.dob,
      firstName: newPatient.user.legalName.firstName,
      middleName: newPatient.user.legalName.middleName ?? '',
      lastName: newPatient.user.legalName.lastName,
      gender: newPatient.gender ?? '',
      medicalRecordNumber: newPatient.patientMrn ?? '',
      status: newPatient.patientStatus ?? '',
      state: newPatient.state ?? '',
    })
    setNewPatient(newPatient)
  }

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
          {newPatient ? (
            <PatientText patient={newPatient} />
          ) : (
            <PatientSelect />
          )}
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
                className="bg-pp-black-1 text-white h-6 flex-1 cursor-pointer px-3 py-1.5"
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

        <Box className="col-span-4">
          <ProviderTypeDropdown />
        </Box>

        {isServiceTimeDependent ? (
          <TimedVisitForm states={states} />
        ) : (
          <UntimedVisitForm />
        )}
      </Grid>
      <Flex justify="between" mt="3">
        {isServiceTimeDependent && provider && (
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
