import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { updateVisitAction } from '@/actions/update-visit'
import {
  FormContainer,
  FormSubmitButton,
  LoadingPlaceholder,
} from '@/components'
import { useHasPermission } from '@/hooks'
import { Appointment, BookVisitPayload, VisitSequenceTypes } from '@/types'
import { isDirty } from '@/ui/schedule/utils'
import { cn, getCalendarDate } from '@/utils'
import { SAVE_APPOINTMENT } from '../../constants'
import {
  convertToTimezone,
  isVisitRescheduled,
  sanitizeFormData,
} from '../../utils'
import { StaffComments } from '../components/staff-comments'
import { schema, SchemaType } from '../schema'
import { useEditVisitStore } from '../store'
import { transformRequestPayload } from '../transform'
import { EditVisitAlert } from './edit-visit-alert'
import { PatientText } from './patient-text'
import { ServiceSelect } from './service-select'
import { StateAndLocationFilters } from './state-and-location-filters'
import { TimedVisitForm } from './timed/timed-visit-form'
import { UntimedVisitForm } from './untimed/untimed-visit-form'

const EditVisitForm = ({
  appointmentId,
  onEdit,
  isPsychiatristVisitTypeSequence,
  isLoading,
  visitDetails,
  onClose,
  isFormDisabled,
}: {
  appointmentId: number
  onEdit?: () => void
  isLoading: boolean
  isPsychiatristVisitTypeSequence?: boolean
  visitDetails: Appointment
  onClose: () => void
  isFormDisabled?: boolean
}) => {
  const [alertInfo, setAlertInfo] = useState<{
    statusCode: number
    message: string
  }>({
    message: '',
    statusCode: 0,
  })
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { visitTypes } = useEditVisitStore()
  const hasPermissionToClickSaveButton = useHasPermission(
    'clickSaveOnEditVisit',
  )
  const { date, time } = convertToTimezone(
    visitDetails?.appointmentDate,
    visitDetails?.locationTimezoneId,
  )
  const { date: dateOfAdmission, time: timeOfAdmission } = convertToTimezone(
    visitDetails?.dateOfAdmission,
    visitDetails?.locationTimezoneId,
  )
  const { date: dischargeDate } = convertToTimezone(
    visitDetails?.dischargeDate,
    visitDetails?.locationTimezoneId,
  )
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    disabled: isFormDisabled,
    mode: 'onChange',
    defaultValues: {
      appointmentId: visitDetails?.appointmentId,
      patient: {
        firstName: visitDetails?.name,
        status: visitDetails?.patientStatus,
        id: visitDetails?.patientId,
        middleName: '',
        lastName: '',
        gender: visitDetails?.gender,
        state: visitDetails?.state,
        medicalRecordNumber: '',
        birthdate: visitDetails?.dob,
      },
      visitDate: date,
      duration: visitDetails?.appointmentDuration?.toString(),
      frequency: visitDetails?.appointmentInterval?.toString(),
      state: visitDetails?.stateCode,
      location: visitDetails?.locationId,
      timeZoneId: visitDetails?.locationTimezoneId,
      isServiceTimeDependent: visitDetails?.isServiceTimeDependent,
      service: visitDetails?.serviceId,
      visitType: visitDetails?.visitTypeCode,
      providerType: visitDetails?.providerType,
      dcDate: visitDetails?.dischargeDate
        ? getCalendarDate(visitDetails?.dischargeDate)
        : undefined,
      dischargeDate: dischargeDate,
      dcLocation: visitDetails?.dischargeLocationName,
      edDischarge: visitDetails?.isEdDischarge ? 'Yes' : 'No',
      provider: visitDetails?.providerId?.toString(),
      visitTime: time,
      visitSequence: visitDetails?.visitSequence,
      visitMedium: visitDetails?.visitMedium,
      facilityAdmissionDetailId: visitDetails?.facilityAdmissionDetailId,
      facilityAdmissionId: visitDetails?.facilityAdmissionId,
      dateOfAdmission: dateOfAdmission,
      timeOfAdmission: timeOfAdmission,
      groupType: visitDetails?.groupTherapyTypeCode ?? '',
      visitStatus: visitDetails?.visitStatus,
      insuranceVerificationStatus: visitDetails?.insuranceVerification,
      legal: visitDetails?.legalStatus,
      insuranceAuthorizationNumber: visitDetails?.authorizationNumber,
      authDate: visitDetails?.authorizationDate
        ? getCalendarDate(visitDetails?.authorizationDate)
        : undefined,
      unit: visitDetails?.unitResource?.unit,
      room: visitDetails?.roomResource?.room,
      group: visitDetails?.groupResource?.group,

      admittingProvider: visitDetails?.providerId?.toString(),
      visitFrequency: '1',
      paymentResponsibility: visitDetails?.paymentResponsibility,
      lastCoverageDate: visitDetails?.lastCoverageDate
        ? getCalendarDate(visitDetails?.lastCoverageDate)
        : undefined,
      isPrimaryProviderType: visitDetails?.isPrimaryProviderType,
      isOverridePermissionProvided: false,
      isProceedPermissionProvided: false,
    },
  })

  const isServiceTimeDependent = useWatch({
    control: form.control,
    name: 'isServiceTimeDependent',
  })
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { dirtyFields } = form.formState
    if (!isDirty(dirtyFields)) return
    if (!hasPermissionToClickSaveButton) {
      setIsAlertOpen(true)
      setAlertInfo({
        message: SAVE_APPOINTMENT,
        statusCode: 0,
      })
      return
    }
    setIsSubmitting(true)
    const selectedVisitType = visitTypes.find((type) =>
      [type.visitTypeCode, type.encouterType].includes(data.visitType),
    )
    const payload: BookVisitPayload = transformRequestPayload(
      data,
      selectedVisitType,
    )
    if (
      visitDetails.visitSequence === VisitSequenceTypes.Discharge &&
      form.getValues('visitSequence') === VisitSequenceTypes.Subsequent
    ) {
      delete payload.dischargeDate
    }
    const sanitizedData = sanitizeFormData(payload)
    const isRescheduled =
      isServiceTimeDependent &&
      isVisitRescheduled(
        form.formState.dirtyFields,
        visitDetails.appointmentDate,
        visitDetails.locationTimezoneId,
      )

    updateVisitAction(sanitizedData).then((res) => {
      setIsSubmitting(false)
      if (res.state === 'error') {
        if (res.status) {
          setIsAlertOpen(true)
          setAlertInfo({
            message: res.error,
            statusCode: res.status ?? 0,
          })
          return
        }
        toast.error(res.error || 'Failed to update visit')
        return
      }
      if (onEdit) {
        onEdit()
      }
      toast.success(
        isRescheduled
          ? 'Visit status is set as Rescheduled'
          : 'Visit updated successfully',
      )
      onClose()
    })
  }

  if (isLoading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />

  return (
    <>
      <FormContainer form={form} onSubmit={onSubmit}>
        <EditVisitAlert
          isOpen={isAlertOpen}
          alertInfo={alertInfo}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={(data) => {
            setIsAlertOpen(false)
            onSubmit(data)
            setAlertInfo({ message: '', statusCode: 0 })
          }}
        />
        <Grid columns="12" className="min-w-[648px] gap-3">
          <Box className="col-span-12">
            <PatientText visitDetails={visitDetails} />
          </Box>
          <StateAndLocationFilters />
          <Box className="col-span-4">
            <ServiceSelect />
          </Box>

          {isServiceTimeDependent ? (
            <TimedVisitForm
              isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
            />
          ) : (
            <UntimedVisitForm
              isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
              visitDetails={visitDetails}
            />
          )}
        </Grid>
        <Flex justify="between" mt="3">
          <FormSubmitButton
            className={cn(
              'bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5',
              {
                'cursor-not-allowed': isFormDisabled || isSubmitting,
              },
            )}
            form={form}
            loading={isSubmitting}
          >
            <Text size="2">Save</Text>
          </FormSubmitButton>
        </Flex>
      </FormContainer>

      {!isFormDisabled && (
        <>
          <Separator size={'4'} className="bg-pp-gray-2 my-3 h-px w-full" />
          <StaffComments appointmentId={appointmentId} />
        </>
      )}
    </>
  )
}

export { EditVisitForm }
