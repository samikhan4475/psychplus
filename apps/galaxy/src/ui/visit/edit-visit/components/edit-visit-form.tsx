import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAbsolute } from '@internationalized/date'
import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormContainer,
  FormSubmitButton,
  LoadingPlaceholder,
} from '@/components'
import { Appointment, State } from '@/types'
import { getUsStatesAction } from '../../actions'
import { StaffComments } from '../components/staff-comments'
import { schema, SchemaType } from '../schema'
import { LocationSelect } from './location-select'
import { PatientText } from './patient-text'
import { ServiceSelect } from './service-select'
import { StateSelect } from './state-select'
import { TimedVisitForm } from './timed/timed-visit-form'
import { UntimedVisitForm } from './untimed/untimed-visit-form'

const EditVisitForm = ({
  appointmentId,
  isLoading,
  visitDetails,
}: {
  appointmentId: number
  isLoading: boolean
  visitDetails: Appointment
}) => {
  const [states, setStates] = useState<State[]>([])
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patient: {
        firstName: visitDetails.name,
        status: visitDetails.patientStatus,
        id: 0,
        middleName: '',
        lastName: '',
        gender: visitDetails.gender,
        state: visitDetails.state,
        medicalRecordNumber: '',
        birthdate: visitDetails.dob,
      },
      visitDate: visitDetails.appointmentDate
        ? parseAbsolute(
            visitDetails.appointmentDate,
            visitDetails.locationTimezoneId,
          )
        : undefined,
      duration: visitDetails.appointmentDuration?.toString(),
      frequency: visitDetails.appointmentInterval?.toString(),
      state: visitDetails.stateCode || 'TX',
      location: visitDetails.locationId,
      isServiceTimeDependent: visitDetails.isServiceTimeDependent,
      service: visitDetails.serviceId,
      visitType: visitDetails.visitType,
      providerType: visitDetails.providerType,
      provider: visitDetails.providerId?.toString(),
      visitTime: visitDetails.appointmentDate,
      visitSequence: visitDetails.visitSequence,
      visitMedium: visitDetails.visitMedium,
      nonTimeProviderType: visitDetails.providerType,
      facilityAdmissionId: visitDetails.facilityAdmissionId,
      dateOfAdmission: visitDetails.dateOfAdmission
        ? parseAbsolute(
            visitDetails.dateOfAdmission,
            visitDetails.locationTimezoneId,
          )
        : undefined,
      visitStatus: visitDetails.visitStatus,
      insuranceVerificationStatus:
        visitDetails.patientInsuranceVerificationStatus,
      legal: visitDetails.legalStatus,
      insuranceAuthorizationNumber: visitDetails.authorizationNumber,
      authDate: visitDetails.authorizationDate
        ? parseAbsolute(
            visitDetails.authorizationDate,
            visitDetails.locationTimezoneId,
          )
        : undefined,
      unit: visitDetails?.unitResource?.unit,
      group: visitDetails?.groupResource?.group,

      admittingProvider: '',
      timeOfAdmission: '',
      visitFrequency: 'Daily',
      lastCoverageDate: visitDetails.lastCoverageDate
        ? parseAbsolute(
            visitDetails.lastCoverageDate,
            visitDetails.locationTimezoneId,
          )
        : undefined,
    },
  })

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

  const isServiceTimeDependent = useWatch({
    control: form.control,
    name: 'isServiceTimeDependent',
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    // @Todo: API call
  }

  if (isLoading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />

  return (
    <>
      <FormContainer form={form} onSubmit={onSubmit}>
        <Grid columns="12" className="min-w-[648px] gap-3">
          <Box className="col-span-12">
            <PatientText visitDetails={visitDetails} />
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

          {isServiceTimeDependent ? <TimedVisitForm /> : <UntimedVisitForm />}
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

      <Separator size={'4'} className="bg-pp-gray-2 my-3 h-px w-full" />

      <StaffComments appointmentId={appointmentId} />
    </>
  )
}

export { EditVisitForm }
