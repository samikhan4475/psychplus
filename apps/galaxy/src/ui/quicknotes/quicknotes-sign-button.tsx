/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { useCallback, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import { useStore as useAllergiesStore } from '@/ui/allergy/patient-allergies-widget/store'
import { useStore as useDiagnosisStore } from '@/ui/diagnosis/store'
import { AlertDialog } from '../alerts'
import { ALLERGIES_ERROR_MESSAGE } from '../allergy/patient-allergies-widget/constants'
import {
  SEND_TO_SIGNATURE_BUTTON,
  SIGN_BUTTON,
  SIGN_CONSENT_WARNING,
  SIGN_PRIMARY_NOTE_EXIST,
  SIGN_PRIOR_VISIT_TIME_WARNING,
  SIGN_PROVIDER_NOTE_WARNING,
} from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PolicyConsentDialog } from './policy-consent-dialog'
import { useStore, validateAllergies, validateDiagnosis } from './store'

interface QuickNotesSignButtonProps {
  appointment: Appointment
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

const QuickNotesSignButton = ({ appointment }: QuickNotesSignButtonProps) => {
  const { allergiesData, setAllergiesError } = useAllergiesStore((state) => ({
    allergiesData: state.allergiesListData,
    setAllergiesError: state.setAllergiesError,
  }))
  const [isPolicyAlertOpen, setIsPolicyAlertOpen] = useState(false)
  const [alertInfo, setAlertInfo] = useState(initialAlertInfo)

  const { workingDiagnosisData, saveWorkingDiagnosis } = useDiagnosisStore()
  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
    staffId: state.user.staffId,
    staffRoleCode: state.staffResource.staffRoleCode,
  }))
  const { loading, sign, markAsError, setWidgetsData, patient } = useStore(
    (state) => ({
      loading: state.loading,
      sign: state.sign,
      setWidgetsData: state.setWidgetsData,
      markAsError: state.markAsError,
      patient: state.patient,
    }),
  )

  const { canSignButtonQuickNotePage, canSendToSignatureButtonQuickNotePage } =
    useQuickNotesPermissions()
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string
  const visitType = useSearchParams().get('visitType') as string
  const isAppointmentProvider = appointment.providerStaffId === staffId
  const isFutureAppointment =
    appointment?.startDate && new Date(appointment.startDate) > new Date()

  const signPayload = {
    patientId,
    appointmentId,
    appointment,
    signedByUserId: appointment.providerUserId ?? staffId,
    signedDate: isPrescriber ? new Date().toISOString() : undefined,
    noteTitleCode: appointment.visitNoteTitle,
  }

  const showAlert = useCallback((info: Partial<AlertInfo>) => {
    setAlertInfo({ ...initialAlertInfo, ...info, show: true })
  }, [])

  const signNoteHandler = async () => {
    if (patient.patientConsent === 'Unverifiable') {
      setIsPolicyAlertOpen(true)
      return
    }

    const diagnosisError = validateDiagnosis({
      workingDiagnosisData,
      visitType,
    })
    if (diagnosisError) {
      toast.error(diagnosisError)
      return
    }
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

    const missingAllergies = validateAllergies({
      allergiesData,
      visitType,
    })

    if (missingAllergies) {
      setAllergiesError(true)
      toast.error(ALLERGIES_ERROR_MESSAGE)
      return
    }

    signNote()
  }

  const signNote = async () => {
    const signResults = await sign(signPayload)

    if (signResults.state === 'success') {
      setAlertInfo(initialAlertInfo)
      toast.success('Quicknote signed!')
      return
    }

    if (signResults.error.includes('mark that note as error?')) {
      showAlert({
        title: 'Warning',
        message: SIGN_PRIMARY_NOTE_EXIST,
        okButton: { text: 'Proceed', onClick: () => markAsError(signPayload) },
      })
      return
    }

    setAlertInfo(initialAlertInfo)
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
        message={SIGN_CONSENT_WARNING}
        patientId={patientId}
      />
    </>
  )
}

export { QuickNotesSignButton }
