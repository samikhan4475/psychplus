/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { revalidateAction } from '@/actions/revalidate'
import { CODESETS, STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { VisitTypeEnum } from '@/enum'
import { useCodesetCodes } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { Appointment, PatientConsent } from '@/types'
import { useStore as useDiagnosisStore } from '@/ui/diagnosis/store'
import { useStore as useDischargeDiagnosisStore } from '@/ui/discharge-diagnosis/store'
import { useStore as useFollowupStore } from '@/ui/follow-up/follow-up-widget/store'
import { useStore as useMedicationStore } from '@/ui/medications/patient-medications-widget/store'
import { filterDefaultCosigner } from '@/utils'
import { AlertDialog } from '../alerts'
import { shouldDisableDiagnosisActions } from '../diagnosis/diagnosis/utils'
import { PatientMedication } from '../medications/patient-medications-widget/types'
import {
  SEND_TO_SIGNATURE_BUTTON,
  SIGN_BUTTON,
  SIGN_FOLLOW_UP_WARNING,
  SIGN_PMP_WARNING,
  SIGN_PRIMARY_NOTE_EXIST,
  SIGN_PRIOR_VISIT_TIME_WARNING,
  SIGN_PROVIDER_NOTE_WARNING,
} from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PolicyConsentDialog } from './policy-consent-dialog'
import { useStore, validateDiagnosis } from './store'
import { SignPayloadProps } from './types'

interface QuickNotesSignButtonProps {
  appointment: Appointment
  patientConsents: PatientConsent[]
}

interface AlertInfo {
  show: boolean
  title: string
  message: string
  okButton: { text: string; onClick: () => void }
  cancelButton: { text: string; onClick: () => void }
  disableClose: boolean
}

const initialAlertInfo: AlertInfo = {
  show: false,
  title: 'Warning',
  message: '',
  okButton: { text: '', onClick: () => {} },
  cancelButton: { text: '', onClick: () => {} },
  disableClose: false,
}

const QuickNotesSignButton = ({
  appointment,
  patientConsents,
}: QuickNotesSignButtonProps) => {
  const [isPolicyAlertOpen, setIsPolicyAlertOpen] = useState(false)
  const [alertInfo, setAlertInfo] = useState(initialAlertInfo)

  const { workingDischargeDiagnosisData } = useDischargeDiagnosisStore()
  const { workingDiagnosisData, saveWorkingDiagnosis } = useDiagnosisStore()
  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
    staffId: state.user.staffId,
    staffRoleCode: state.staffResource.staffRoleCode,
  }))
  const {
    data: medicationData,
    isPmpReviewed,
    saveIsPmpReviewedForMedication,
  } = useMedicationStore((state) => ({
    data: state.data,
    isPmpReviewed: state.isPmpReviewed,
    saveIsPmpReviewedForMedication: state.saveIsPmpReviewedForMedication,
  }))

  const {
    isFollowupDeniedWithoutReason,
    updateFollowupDenialStatus,
    isFollowupRequired,
    getAutoFollowupDate,
    refetchFollowup,
  } = useFollowupStore((state) => ({
    isFollowupDeniedWithoutReason: state.isFollowupDeniedWithoutReason,
    updateFollowupDenialStatus: state.updateFollowupDenialStatus,
    isFollowupRequired: state.isFollowupRequired,
    getAutoFollowupDate: state.getAutoFollowupDate,
    refetchFollowup: state.search,
  }))

  const {
    loading,
    sign,
    markAsError,
    setWidgetsData,
    patient,
    isMarkedAsError,
    signOptions,
    setMarkedStatus,
  } = useStore((state) => ({
    loading: state.loading,
    sign: state.sign,
    setWidgetsData: state.setWidgetsData,
    markAsError: state.markAsError,
    isMarkedAsError: state.isMarkedAsError,
    signOptions: state.signOptions,
    patient: state.patient,
    setMarkedStatus: state.setMarkedStatus,
  }))

  const coSignedByUserId =
    signOptions.coSignedByUserId !== undefined &&
    signOptions.coSignedByUserId !== null
      ? String(signOptions.coSignedByUserId)
      : String(filterDefaultCosigner(appointment.cosigners ?? [])?.userId ?? '')

  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType).find(
    (code) => code.groupingCode === 'Primary',
  )

  const codes = useCodesetCodes(CODESETS.PatientConsentPolicyType)
  const policyDescriptions = useMemo(() => {
    const notVerifiedPolicyTypes = patientConsents
      .filter((policy) => policy.verificationStatus !== 'Verified')
      .map((policy) => policy.type)

    return notVerifiedPolicyTypes
      .map((type) => {
        const policy = codes.find((code) => code.value === type)
        return policy
          ? policy.attributes?.find((attr) => attr.name === 'PolicyName')?.value
          : null
      })
      .filter(Boolean)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientConsents])
  const { canSignButtonQuickNotePage, canSendToSignatureButtonQuickNotePage } =
    useQuickNotesPermissions()
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string
  const visitType = useSearchParams().get('visitType') as VisitTypeEnum
  const visitSequence = useSearchParams().get('visitSequence') ?? ''
  const isHospitalDischargeView = useMemo(
    () => shouldDisableDiagnosisActions(visitType, visitSequence),
    [visitType, visitSequence],
  )
  const isAppointmentProvider = appointment.providerStaffId === staffId
  const isFutureAppointment =
    appointment?.startDate && new Date(appointment.startDate) > new Date()

  const signPayload: SignPayloadProps = {
    patientId,
    appointmentId,
    appointment,
    signedByUserId: appointment.providerUserId,
    signedDate: isPrescriber ? new Date().toISOString() : undefined,
    noteTitleCode: appointment.visitNoteTitle,
    noteTypeCode: noteTypeCodes?.value,
    coSignedByUserId,
  }

  const showAlert = useCallback((info: Partial<AlertInfo>) => {
    setAlertInfo({ ...initialAlertInfo, ...info, show: true })
  }, [])

  useEffect(() => {
    if (isMarkedAsError) {
      setAlertInfo({ ...initialAlertInfo, show: false })
      setMarkedStatus(false)
    }
  }, [isMarkedAsError, setMarkedStatus])

  const checkIfPmpReviewRequired = (
    medications: PatientMedication[] | undefined,
  ) => {
    const hasControlledSubstanceMedication = medications?.some(
      (med) => med.isControlledSubstance === true,
    )

    if (hasControlledSubstanceMedication) {
      return !isPmpReviewed
    }
    return false
  }

  const updateSignPayloadForAutoFollowup = () => {
    if (isFollowupRequired()) {
      signPayload.isAllowedFollowupForNextAvailableSlot = true
      signPayload.autoFollowUpDate = getAutoFollowupDate(
        appointment.visitTypeCode ?? '',
      )
    }
  }

  const saveFollowupDeniedStatus = () => {
    updateFollowupDenialStatus({
      appointmentId: Number(appointmentId),
      shouldShowToast: false,
    })
  }

  const handleAutoFollowupGeneration = () => {
    saveFollowupDeniedStatus()
    updateSignPayloadForAutoFollowup()
  }

  const signNoteHandler = async () => {
    if (
      appointment?.isRequiredPolicy &&
      patient.patientConsent === 'Unverifiable'
    ) {
      setIsPolicyAlertOpen(true)
      return
    }

    if (isFollowupDeniedWithoutReason()) {
      showAlert({
        title: 'Validation Error',
        message: SIGN_FOLLOW_UP_WARNING,
        disableClose: true,
      })
      return
    }
    handleAutoFollowupGeneration()

    if (checkIfPmpReviewRequired(medicationData?.medications)) {
      toast.error(SIGN_PMP_WARNING)
      return
    }
    saveIsPmpReviewedForMedication(patientId)

    const diagnosisError = validateDiagnosis({
      workingDiagnosisData: isHospitalDischargeView
        ? workingDischargeDiagnosisData
        : workingDiagnosisData,
      visitType,
    })
    if (diagnosisError) {
      return toast.error(diagnosisError)
    }
    !isHospitalDischargeView &&
      saveWorkingDiagnosis(patientId, setWidgetsData, false)

    if (isPrescriber && !canSignButtonQuickNotePage) {
      showAlert({
        title: 'Error',
        message: SIGN_BUTTON,
        disableClose: true,
      })
      return
    }

    if (!isPrescriber && !canSendToSignatureButtonQuickNotePage) {
      showAlert({
        title: 'Error',
        message: SEND_TO_SIGNATURE_BUTTON,
        disableClose: true,
      })
      return
    }

    if (!isAppointmentProvider && isPrescriber) {
      showAlert({
        title: 'Error',
        message: SIGN_PROVIDER_NOTE_WARNING,
        disableClose: true,
      })
      return
    }

    if (isFutureAppointment) {
      showAlert({
        title: 'Warning',
        message: SIGN_PRIOR_VISIT_TIME_WARNING,
        okButton: { text: 'Proceed', onClick: signNote },
      })
      return
    }

    signNote()
  }

  const refetchFollowupOnSign = () => {
    refetchFollowup({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
    })
  }

  const signNote = async () => {
    const signResults = await sign(signPayload)

    if (signResults.state === 'success') {
      const toastMessage = isPrescriber ? 'signed' : 'send to signed'
      setAlertInfo(initialAlertInfo)
      refetchFollowupOnSign()
      toast.success(`Quicknote ${toastMessage}!`)
      return
    }

    if (signResults?.error?.includes('Validation error')) {
      setAlertInfo({ ...initialAlertInfo, show: false })
      return
    }

    if (signResults.error.includes('mark that note as error?')) {
      showAlert({
        title: 'Warning',
        message: SIGN_PRIMARY_NOTE_EXIST,
        okButton: {
          text: 'Proceed',
          onClick: async () => {
            setAlertInfo(initialAlertInfo)
            markAsError(signPayload, refetchFollowupOnSign)
          },
        },
      })
      return
    }
    toast.error(signResults.error)
    setAlertInfo(initialAlertInfo)
    revalidateAction(false)
  }

  return (
    <>
      <Button
        size="1"
        onClick={signNoteHandler}
        disabled={loading}
        highContrast
      >
        <PenLineIcon height={14} width={14} strokeWidth={2} />
        {isPrescriber ? 'Sign' : 'Send To Sign'}
      </Button>

      <AlertDialog
        open={!!alertInfo.show}
        onOpenChange={(open) => !open && setAlertInfo(initialAlertInfo)}
        loading={loading}
        {...alertInfo}
      />

      <PolicyConsentDialog
        open={isPolicyAlertOpen}
        onOpenChange={setIsPolicyAlertOpen}
        title="Warning"
        message={`Patient needs to sign policy: ${policyDescriptions.join(
          ', ',
        )}`}
        patientId={patientId}
      />
    </>
  )
}

export { QuickNotesSignButton }
