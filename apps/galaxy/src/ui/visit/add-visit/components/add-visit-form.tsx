import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormSubmitButton } from '@/components'
import { Appointment, NewPatient } from '@/types'
import { AddPatient } from '@/ui/patient/add-patient'
import { AddVacation } from '@/ui/vacation/add-vacation'
import { cn } from '@/utils'
import { bookVisitAction } from '../../client-actions'
import { BookVisitPayload, BookVisitResponse } from '../../types'
import { schema, SchemaType } from '../schema'
import { useAddVisitStore } from '../store'
import { AddVisitAlert } from './add-visit-alerts'
import { PatientSelect } from './patient-select'
import { PatientText } from './patient-text'
import { ServiceDropdown } from './service-select'
import './style.css'
import { saveWidgetClientAction } from '@/actions'
import { getLocations } from '@/actions/get-locations'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { signNoteAction } from '@/ui/quicknotes/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useRefetchAppointments } from '@/ui/schedule/hooks'
import { useRefetchAppointments as useRefetchProviderCodingAppointments } from '@/ui/schedule/provider-coding/hooks'
import { useStore as useSchedulerStore } from '@/ui/schedule/store'
import { TabValue } from '@/ui/schedule/types'
import {
  ADD_VACATION,
  ADMIT_DATE_30_DAYS_PRIOR_POLICY,
  OVERRIDE_OTHER_PROVIDER_SCHEDULE_PREFERENCE,
  OVERRIDE_SELF_SCHEDULE_PREFERENCE,
  SAVE_APPOINTMENT,
} from '../../constants'
import { convertToTimezone, sanitizeFormData } from '../../utils'
import { transformRequestPayload } from '../transform'
import { AppointmentData, SlotDetails } from '../types'
import { isDatePriorTo30Days, sectionCodesMapping } from '../util'
import { AddonsSelect } from './addons-select'
import { AuthorizationDateField } from './authorization-date-field'
import { BillingProviderInfoPhoneNum } from './billing-provider-info-select'
import { CosignerSelect } from './cosigner-select'
import { CptCodeSelect } from './cpt-code-select'
import { DiagnosisSelect } from './diagnosis-select'
import { InsuranceAuthNumberField } from './insurance-authorization-number-field'
import { PracticeSelect } from './practice-select'
import { StateAndLocationFilters } from './state-and-location-filters'
import TimedVisitForm from './timed/timed-visit-form'
import { NonTimedVisitForm } from './untimed/non-timed-visit-form'

interface AddVisitFormProps {
  isTimed?: boolean
  dateTime?: string
  timezone?: string
  onAdd?: (responseData?: AppointmentData) => void
  onClose: () => void
  showAddUser?: boolean
  patient?: NewPatient
  slotDetails?: SlotDetails
  isSlot?: boolean
  isFollowup: boolean
  consultationDate?: string
  isCustomAppointment?: boolean
}

const AddVisitForm = ({
  showAddUser = true,
  isTimed = true,
  dateTime,
  onAdd,
  slotDetails,
  timezone,
  onClose,
  patient,
  isFollowup,
  consultationDate,
  isCustomAppointment = false,
}: AddVisitFormProps) => {
  const [newPatient, setNewPatient] = useState<NewPatient>()
  const { staffId } = useGlobalStore((state) => state.user)
  const hasPermissionToClickSaveButton = useHasPermission(
    'clickSaveButtonOnAddVisitPopUp',
  )
  const hasPermissionToAddVisit30DaysPriorFromTheCurrentDate = useHasPermission(
    'addTheAdmitDateTimeUpTo_30DaysPriorFromTheCurrentDate',
  )
  const hasPermissionToClickAddVacation = useHasPermission(
    'clickAddVacationButtonOnAddVisitPopUp',
  )
  const overrideSelfSchedule = useHasPermission(
    'overrideSelfSchedulePreference',
  )
  const overrideOtherProvidersSchedule = useHasPermission(
    'overrideOtherProviderSchedulePreference',
  )
  const { activeTab } = useSchedulerStore((state) => ({
    activeTab: state.activeTab,
  }))
  const [alertInfo, setAlertInfo] = useState<{
    statusCode: number
    message: string
  }>({
    message: '',
    statusCode: 0,
  })
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { visitTypes } = useAddVisitStore()
  const { date, time } = convertToTimezone(dateTime, timezone)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const refetch = useRefetchAppointments()
  const refetchProviderCoding = useRefetchProviderCodingAppointments()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      patient: patient ?? undefined,
      state: patient?.state ?? slotDetails?.state ?? '',
      location: slotDetails?.location ?? '',
      service: slotDetails?.service ?? '',
      providerType: slotDetails?.providerType ?? '',
      provider: slotDetails?.providerId ?? '',
      visitType: '',
      visitSequence: '',
      visitMedium: '',
      visitDate: date,
      visitTime: time,
      dcDate: undefined,
      dcLocation: undefined,
      edDischarge: 'No',
      duration: slotDetails?.duration ?? '',
      insuranceAuthorizationNumber: '',
      frequency: '0',
      admittingProvider: '',
      facilityAdmissionId: 'createNew',
      dateOfAdmission: date,
      timeOfAdmission: '00:00',
      visitStatus: 'Unseen',
      visitFrequency: '1',
      authDate: undefined,
      legal: 'Voluntary',
      unit: '',
      room: '',
      group: '',
      isServiceTimeDependent: isTimed,
      isPrimaryProviderType: false,
      isOverridePermissionProvided: false,
      isProceedPermissionProvided: false,
      isCustomAppointment: false,
      cptCodes: '',
      diagnosisCodes: '',
      addOnCodes: '',
      authorizationNumber: '',
      authorizationDate: null,
      billingProviderInfo: undefined,
      isOverridePrimaryProvider: undefined,
    },
  })

  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType).find(
    (code) => code.groupingCode === 'Primary',
  )
  const noteTitleCode = useCodesetCodes(CODESETS.NoteTitle).find(
    (code) => code.groupingCode === 'Primary' && code.value === 'Evaluation',
  )

  const [isServiceTimeDependent, provider, location] = useWatch({
    control: form.control,
    name: ['isServiceTimeDependent', 'provider', 'location'],
  })

  useEffect(() => {
    if (!patient) return
    onPatientAdd(patient)
  }, [patient])

  useEffect(() => {
    if (!location) return
    getLocations(location).then((res) => {
      if (res.state === 'error') return
      const address = res.data?.[0]?.address
      if (address?.timeZoneId) form.setValue('timeZoneId', address.timeZoneId)
    })
  }, [location])

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
      state: newPatient?.state ?? '',
    })
    form.setValue('state', newPatient?.state ?? '')
    setNewPatient(newPatient)
  }

  const handleCustomAppointment = async (appointment: BookVisitResponse) => {
    const {
      addOnCodes = '',
      cptCodes = '',
      diagnosisCodes = '',
    } = form.getValues()

    const { id: appointmentId, patientId, providerUserId } = appointment

    const addonCodesSections = sectionCodesMapping(
      addOnCodes,
      QuickNoteSectionName.QuicknoteSectionCodes,
      'cptAddonCodes',
      appointmentId,
      +patientId,
    )

    const cptCodesSections = sectionCodesMapping(
      cptCodes,
      QuickNoteSectionName.QuicknoteSectionCodes,
      'cptPrimaryCodes',
      appointmentId,
      +patientId,
    )

    const diagnosisCodesSections = {
      sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
      sectionItem: 'diagnosis',
      sectionItemValue: diagnosisCodes,
      appId: appointmentId,
      pid: +patientId,
    }

    const data = [
      diagnosisCodesSections,
      ...addonCodesSections,
      ...cptCodesSections,
    ].filter((section) => section.sectionItemValue)
    const resultWidgets = await saveWidgetClientAction({
      patientId,
      data,
    })

    if (resultWidgets.state === 'error')
      return toast.error(
        resultWidgets.error ?? 'Failed to save widgets for custom visit',
      )
    const billingProviderType = form.getValues('billingProviderInfo')
    const cosignerId = form.getValues('cosignerId')
    const resultSignNote = await signNoteAction({
      patientId: String(patientId),
      appointmentId: String(appointmentId),
      isCustomAppointment: true,
      noteTypeCode: noteTypeCodes?.value ?? '',
      noteTitleCode: noteTitleCode?.value ?? '',
      signedByUserId: providerUserId,
      billingProviderType,
      coSignedByUserId: cosignerId,
    })

    if (resultSignNote.state === 'error')
      return toast.error(
        resultSignNote.error ?? 'Failed to sign note for custom visit',
      )

    toast.success('Custom visit created successfully')
  }

  const onCreateNew: SubmitHandler<SchemaType> = (data) => {
    if (
      !data.isServiceTimeDependent &&
      data.dateOfAdmission &&
      isDatePriorTo30Days(data.dateOfAdmission) &&
      hasPermissionToAddVisit30DaysPriorFromTheCurrentDate &&
      data.visitSequence === 'Initial'
    ) {
      setIsAlertOpen(true)
      setAlertInfo({
        message: ADMIT_DATE_30_DAYS_PRIOR_POLICY,
        statusCode: 0,
      })
      return
    }
    if (
      data.isServiceTimeDependent &&
      (data.isOverridePermissionProvided || data.isProceedPermissionProvided)
    ) {
      const providerId = form.getValues('provider')
      const isSelfSchedule = String(staffId) === providerId
      if (isSelfSchedule && !overrideSelfSchedule) {
        setIsAlertOpen(true)
        setAlertInfo({
          message: OVERRIDE_SELF_SCHEDULE_PREFERENCE,
          statusCode: 0,
        })
        return
      }
      if (!isSelfSchedule && !overrideOtherProvidersSchedule) {
        setIsAlertOpen(true)
        setAlertInfo({
          message: OVERRIDE_OTHER_PROVIDER_SCHEDULE_PREFERENCE,
          statusCode: 0,
        })
        return
      }
    }
    if (!hasPermissionToClickSaveButton) {
      setIsAlertOpen(true)
      setAlertInfo({
        message: SAVE_APPOINTMENT,
        statusCode: 0,
      })
      return
    }
    setIsLoading(true)
    const selectedVisitType = visitTypes.find((type) =>
      [type.visitTypeCode, type.encouterType].includes(data.visitType),
    )
    const payload: BookVisitPayload = transformRequestPayload(
      data,
      selectedVisitType,
    )
    const sanitizedData = sanitizeFormData({
      ...payload,
      isFollowup,
      consultationDate,
      isCustomAppointment,
    })

    bookVisitAction(sanitizedData).then(async (res) => {
      if (res.state === 'error') {
        if (res.status) {
          setIsAlertOpen(true)
          setAlertInfo({
            message: res.error,
            statusCode: res.status ?? 0,
          })
          return
        }
        toast.error(res.error || 'Failed to Add Visit')
        return
      }

      if (isCustomAppointment) {
        await handleCustomAppointment(res.data.appointments[0])
      } else {
        toast.success(
          isServiceTimeDependent
            ? 'Visit status is set as scheduled'
            : 'Visit created successfully',
        )
      }
      setIsLoading(false)
      onAdd?.(res?.data)
      onClose()
      if (activeTab === TabValue.ProviderCoding) refetchProviderCoding()
      else refetch()
    })
  }
  useEffect(() => {
    form.setValue('isCustomAppointment', isCustomAppointment)
  }, [isCustomAppointment])
  return (
    <FormContainer form={form} onSubmit={onCreateNew}>
      <AddVisitAlert
        isOpen={isAlertOpen}
        alertInfo={alertInfo}
        onClose={() => {
          setIsAlertOpen(false)
          setIsLoading(false)
        }}
        onConfirm={(data) => {
          setIsAlertOpen(false)
          setAlertInfo({ message: '', statusCode: 0 })
          onCreateNew(data)
        }}
      />
      <Grid columns="12" className="min-w-[648px] gap-3">
        <Box className="col-span-10">
          {newPatient ? (
            <PatientText patient={newPatient} />
          ) : (
            <PatientSelect slotDetails={slotDetails} />
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
        <StateAndLocationFilters />
        <Box className="col-span-4">
          <ServiceDropdown />
        </Box>
        {isServiceTimeDependent ? (
          <TimedVisitForm slotDetails={slotDetails} />
        ) : (
          <NonTimedVisitForm />
        )}
        <Grid columns="3" className="col-span-12" gap="3">
          <PracticeSelect />
          <BillingProviderInfoPhoneNum />
          {isCustomAppointment && <CosignerSelect />}
        </Grid>
      </Grid>
      {isCustomAppointment && (
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
        {isServiceTimeDependent &&
          provider &&
          (hasPermissionToClickAddVacation ? (
            <AddVacation staffId={provider}>
              <Button
                className={cn(
                  'text-xs bg-white text-pp-black-3 active:bg-pp-focus-bg active:text-pp-blue border-pp-black-3 cursor-pointer border px-3 py-1.5',
                  !provider ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
                )}
                color="gray"
                variant="outline"
              >
                <Text size="1">Add Vacation</Text>
              </Button>
            </AddVacation>
          ) : (
            <Button
              className={cn(
                'text-xs bg-white text-pp-black-3 active:bg-pp-focus-bg active:text-pp-blue border-pp-black-3 cursor-pointer border px-3 py-1.5',
                !provider ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
              )}
              color="gray"
              variant="outline"
              type="button"
              onClick={() => {
                setIsAlertOpen(true)
                setAlertInfo({
                  message: ADD_VACATION,
                  statusCode: 0,
                })
              }}
            >
              <Text size="1">Add Vacation</Text>
            </Button>
          ))}
        <FormSubmitButton
          className={cn(
            'bg-pp-black-1 text-white ml-auto cursor-pointer px-3 py-1.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75',
          )}
          form={form}
          loading={isLoading}
          disabled={isLoading}
        >
          Save
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { AddVisitForm }
