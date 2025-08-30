import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone } from '@internationalized/date'
import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { saveWidgetClientAction } from '@/actions'
import { updateVisitAction } from '@/actions/update-visit'
import {
  FormContainer,
  FormSubmitButton,
  LoadingPlaceholder,
} from '@/components'
import { CODESETS, FEATURE_FLAGS } from '@/constants'
import { useCodesetCodes, useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import {
  Appointment,
  BookVisitPayload,
  visitFrequency,
  VisitSequenceTypes,
} from '@/types'
import { signNoteAction } from '@/ui/quicknotes/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { isDirty } from '@/ui/schedule/utils'
import { cn, getCalendarDate } from '@/utils'
import { AuthorizationDateField } from '../../add-visit/components/authorization-date-field'
import { BillingProviderInfoPhoneNum } from '../../add-visit/components/billing-provider-info-select'
import { CosignerSelect } from '../../add-visit/components/cosigner-select'
import { InsuranceAuthNumberField } from '../../add-visit/components/insurance-authorization-number-field'
import { PracticeSelect } from '../../add-visit/components/practice-select'
import { sectionCodesMapping } from '../../add-visit/util'
import { getProviders } from '../../client-actions'
import { SAVE_APPOINTMENT } from '../../constants'
import { useUpdateVisitInsuranceVerificationStatus } from '../../hooks/use-update-visit-insurance-verfication-status'
import {
  convertToTimezone,
  isVisitRescheduled,
  sanitizeFormData,
} from '../../utils'
import { StaffComments } from '../components/staff-comments'
import { schema, SchemaType } from '../schema'
import { useEditVisitStore } from '../store'
import {
  transformClaimServiceLines,
  transformRequestPayload,
} from '../transform'
import { AddonsSelect } from './addons-select'
import { CptCodeSelect } from './cpt-code-select'
import { DiagnosisSelect } from './diagnosis-select'
import { EditVisitAlert } from './edit-visit-alert'
import { PatientPhoneText } from './patient-phone-text'
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
  const { updateVisitInsuranceVerificationStatus } =
    useUpdateVisitInsuranceVerificationStatus()
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

  const { billingProviderType, practiceId, supervisingProviderId } =
    visitDetails?.claimData ?? {}
  const dischargeDate = visitDetails?.dischargeDate
    ? getCalendarDate(visitDetails?.dischargeDate)
    : undefined

  const customVisitFeatureEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr16012GalaxyPracticeDropdownAddVisitPopup,
  )
  const appointmentSchema = schema(customVisitFeatureEnabled)
  const form = useForm<SchemaType>({
    resolver: zodResolver(appointmentSchema),
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
        phone: visitDetails?.patientPhoneNumber?.number || '',
      },
      visitDate: date,
      duration: visitDetails?.appointmentDuration?.toString(),
      frequency: visitDetails?.visitFrequency ?? '',
      state: visitDetails?.stateCode,
      location: visitDetails?.locationId,
      timeZoneId: visitDetails?.locationTimezoneId,
      isServiceTimeDependent: visitDetails?.isServiceTimeDependent,
      service: visitDetails?.serviceId,
      visitType: visitDetails?.visitTypeCode,
      providerType: visitDetails?.providerType,
      dcDate: dischargeDate,
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
      billingProviderInfo: billingProviderType,
      insuranceVerificationStatus: visitDetails?.insuranceVerification,
      legal: visitDetails?.legalStatus,
      insuranceAuthorizationNumber: visitDetails?.authorizationNumber,
      authDate: visitDetails?.authorizationDate
        ? getCalendarDate(visitDetails?.authorizationDate)
        : undefined,
      unit: visitDetails?.unitResource?.unit,
      room: visitDetails?.roomResource?.room,
      group: visitDetails?.groupResource?.group,

      admittingProvider: visitDetails?.admittingProviderId?.toString(),
      visitFrequency: visitFrequency.Daily,
      paymentResponsibility: visitDetails?.paymentResponsibility,
      lastCoverageDate: visitDetails?.lastCoverageDate
        ? getCalendarDate(visitDetails?.lastCoverageDate)
        : undefined,
      isPrimaryProviderType: visitDetails?.isPrimaryProviderType,
      isOverridePermissionProvided: false,
      isProceedPermissionProvided: false,
      isCustomAppointment: visitDetails.isCustomAppointment ?? false,
      customAddons: visitDetails.customAddons ?? '',
      customDiagnosis: visitDetails.customDiagnosis ?? '',
      authorizationDate: visitDetails?.authorizationDate
        ? getCalendarDate(visitDetails?.authorizationDate)
        : null,
      authorizationNumber: visitDetails?.authorizationNumber,
      customCptCodes: visitDetails.customCptCodes ?? '',
      practiceId,
      cosignerId: supervisingProviderId
        ? String(supervisingProviderId)
        : undefined,
      isOverridePrimaryProvider: undefined,
    },
  })

  const isServiceTimeDependent = useWatch({
    control: form.control,
    name: 'isServiceTimeDependent',
  })
  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType).find(
    (code) => code.groupingCode === 'Primary',
  )
  const noteTitleCode = useCodesetCodes(CODESETS.NoteTitle).find(
    (code) => code.groupingCode === 'Primary' && code.value === 'Evaluation',
  )

  const handleCustomAppointment = async (newAppointmentId: number) => {
    const {
      customAddons = '',
      customCptCodes = '',
      customDiagnosis = '',
      patient: { id: patientId },
      provider,
      appointmentId: oldAppointmentId,
    } = form.getValues()
    const appointmentId = newAppointmentId || oldAppointmentId
    const addonCodesSections = sectionCodesMapping(
      customAddons,
      QuickNoteSectionName.QuicknoteSectionCodes,
      'cptAddonCodes',
      appointmentId,
      +patientId,
    )

    const cptCodesSections = sectionCodesMapping(
      customCptCodes,
      QuickNoteSectionName.QuicknoteSectionCodes,
      'cptPrimaryCodes',
      appointmentId,
      +patientId,
    )

    const diagnosisCodesSections = {
      sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
      sectionItem: 'diagnosis',
      sectionItemValue: customDiagnosis,
      appId: appointmentId,
      pid: +patientId,
    }
    const data = [
      diagnosisCodesSections,
      ...addonCodesSections,
      ...cptCodesSections,
    ].filter((section) => section.sectionItemValue)
    const resultWidgets = await saveWidgetClientAction({
      patientId: String(patientId),
      data,
    })

    if (resultWidgets.state === 'error')
      return toast.error(
        resultWidgets.error ?? 'Failed to save widgets for custom visit',
      )
    const billingProviderType = form.getValues('billingProviderInfo')
    const cosignerId = form.getValues('cosignerId')
    if (visitDetails.claimData) {
      const cptCodesAndAddons = [
        form.getValues('customCptCodes'),
        form.getValues('customAddons'),
      ]
        .filter(Boolean)
        .join(',')

      const { updatedDiagnoses, updatedServiceLines } =
        transformClaimServiceLines({
          timeZone: getLocalTimeZone(),
          rawCptCodes: cptCodesAndAddons,
          rawDiagnosisCodes: form.getValues('customDiagnosis') ?? '',
          claim: visitDetails.claimData,
        })

      visitDetails.claimData.claimServiceLines = updatedServiceLines
      visitDetails.claimData.claimDiagnosis = updatedDiagnoses
    }

    if (appointmentId === oldAppointmentId)
      delete visitDetails.claimData?.cptCodes

    const [cosignerStaffId, providerType, location] = form.getValues([
      'cosignerId',
      'providerType',
      'location',
    ])
    let coSignedByUserId = ''
    if (cosignerStaffId) {
      const res = await getProviders({
        locationIds: [location],
        providerType,
        staffIds: [cosignerStaffId],
      })
      if (res.state === 'success' && res.data.length > 0)
        coSignedByUserId = String(res.data[0].userId)
    }
    const resultSignNote = await signNoteAction({
      patientId: String(patientId),
      appointmentId: String(appointmentId),
      isCustomAppointment: true,
      noteTypeCode: noteTypeCodes?.value ?? '',
      noteTitleCode: noteTitleCode?.value ?? '',
      signedByUserId: +provider!,
      billingProviderType,
      coSignedByUserId,
      ...(appointmentId === oldAppointmentId && {
        claimModel: JSON.parse(
          JSON.stringify({
            ...visitDetails.claimData,
            supervisingProviderId: cosignerId,
            billingProviderType,
          }),
        ),
      }),
      isError: appointmentId === oldAppointmentId,
    })

    if (resultSignNote.state === 'error')
      return toast.error(
        resultSignNote.error ?? 'Failed to sign note for custom visit',
      )
  }
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
      visitDetails,
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

    updateVisitAction(sanitizedData).then(async (res) => {
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

      const newAppointmentId = res.data?.appointments[0]?.id
      const handleSuccess = () => {
        setIsSubmitting(false)
        if (onEdit) onEdit()
        onClose()

        const toastMessage = `${isCustomAppointment ? 'Custom ' : ''}Visit ${
          isRescheduled
            ? 'status is set as Rescheduled'
            : 'updated successfully'
        }`
        toast.success(toastMessage)
      }

      if (isCustomAppointment) {
        await handleCustomAppointment(newAppointmentId)
      }

      if (data.insuranceVerificationStatus) {
        await updateVisitInsuranceVerificationStatus({
          appointmentId: visitDetails.appointmentId,
          newStatus: data.insuranceVerificationStatus,
          successMessage: 'Insurance verification status updated successfully',
          onSuccess: handleSuccess,
          onError: () => setIsSubmitting(false),
        })
      } else {
        handleSuccess()
      }
    })
  }

  if (isLoading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  const isCustomAppointment = form.watch('isCustomAppointment')
  return (
    <>
      <FormContainer form={form} onSubmit={onSubmit}>
        <EditVisitAlert
          isOpen={isAlertOpen}
          alertInfo={alertInfo}
          onClose={() => {
            setIsAlertOpen(false)
            setIsSubmitting(false)
          }}
          onConfirm={(data) => {
            setIsAlertOpen(false)
            onSubmit(data)
            setAlertInfo({ message: '', statusCode: 0 })
          }}
        />
        <Grid columns="12" className="min-w-[648px] gap-3">
          <Box className="col-span-8">
            <PatientText visitDetails={visitDetails} />
          </Box>
          <Box className="col-span-4">
            <PatientPhoneText />
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
          {customVisitFeatureEnabled && (
            <Grid columns="3" className="col-span-12" gap="3">
              <PracticeSelect />
              <BillingProviderInfoPhoneNum />
              {isCustomAppointment && <CosignerSelect />}
            </Grid>
          )}
        </Grid>
        {isCustomAppointment && customVisitFeatureEnabled && (
          <Grid
            columns="1"
            mt="3"
            py="2"
            gapY="3"
            className="border-t border-t-gray-4"
          >
            <Text size="2" weight="medium">
              Additional Information
            </Text>
            <Grid columns="3" gap="2">
              <InsuranceAuthNumberField />
              <AuthorizationDateField />
            </Grid>
            <Grid columns="3" gapX="2">
              <DiagnosisSelect />
              <CptCodeSelect />
              <AddonsSelect />
            </Grid>
          </Grid>
        )}
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
