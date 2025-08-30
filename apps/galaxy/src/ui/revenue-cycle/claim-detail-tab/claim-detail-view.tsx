import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import * as Accordion from '@radix-ui/react-accordion'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { saveWidgetClientAction } from '@/actions'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { FormContainer } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import {
  ClaimDiagnosisApiResponse,
  ClaimServiceLine,
  ClaimServiceLineApiResponse,
  ClaimUpdate,
  ClaimUpdateApiResponse,
} from '@/types'
import { signNoteAction } from '@/ui/quicknotes/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sectionCodesMapping } from '@/ui/visit/add-visit/util'
import {
  getCalendarDateLabel,
  getLocalCalendarDate,
  sanitizeFormData,
} from '@/utils'
import { CLAIM_PAYMENT_STATUSES, ENABLE_FORM_STATUSES } from '../constants'
import { useStore } from '../store'
import { ClaimDetailsTab, RevenueCycleTab } from '../types'
import { AccidentAndLabView } from './accident-lab-section'
import { getClaimById } from './actions/get-service-claim'
import { updateClaimAction } from './actions/update-claim'
import { AuthAndReferralsView } from './auth-and-referrals-section'
import { BillingProviderView } from './billing-provider-section'
import { ChargesHeaderAction, ChargesTableView } from './charges-section'
import { ClaimAccordionItem } from './claim-accordion-item'
import { ClaimDatesView } from './claim-dates-section'
import {
  ClaimActions,
  ClaimDetailHeader,
  PatientClaimDetails,
} from './claim-header-section'
import {
  ClaimInsuranceHeaders,
  ClaimInsuranceTable,
} from './claim-insurances-section'
import { ClaimNotesHeaderActions, ClaimNotesTable } from './claim-notes-section'
import { ClaimDeletedNotesDialog } from './claim-notes-section/claim-notes-deleted-dialog'
import { ClaimNotesDialog } from './claim-notes-section/claim-notes-dialog'
import { defaultClaimUpdateValues } from './constants'
import { DiagnosisView } from './diagnosis-section'
import { LoadClaimConfrimationDialog } from './load-claim-confirmation-dialog'
import { claimUpdateSchema, ClaimUpdateSchemaType } from './schema'
import { useStore as ClaimDetailStore } from './store'
import { SubmissionInformationView } from './submission-information-section'
import { SubmissionResponseTable } from './submission-response-section'

const ClaimDetailView = () => {
  const { selectedClaimData, setSelectedClaimsData, activeTab } = useStore(
    (state) => ({
      activeTab: state.activeTab,
      selectedClaimData: state.selectedClaimData[state.activeTab],
      setSelectedClaimsData: state.setSelectedClaimsData,
    }),
  )
  const { openAlertModal } = ClaimDetailStore((state) => ({
    openAlertModal: state.openAlertModal,
  }))
  const { claimStatus, claimPrimaryStatus, claimId, isClaimPosted } =
    selectedClaimData ?? {}
  const [openItems, setOpenItems] = useState<string[]>([
    'Billing Provider',
    'Accidents And Labs',
    'Diagnosis',
    'Charges',
    'Claim Dates',
    'Authorizations and Referrals and CLIA',
    'Submission Information',
    'Submission Response',
    'Insurances',
    'Notes',
  ])
  const [openNotesDialog, setOpenNotesDialog] = useState<boolean>(false)
  const [reloadClaimDialog, setReloadClaimDialog] = useState<boolean>(false)
  const [openDeletedNotesDialog, setOpenDeletedNotesDialog] =
    useState<boolean>(false)
  const form = useForm<ClaimUpdateSchemaType>({
    disabled:
      !ENABLE_FORM_STATUSES.includes(claimStatus) ||
      CLAIM_PAYMENT_STATUSES.includes(claimPrimaryStatus),
    resolver: zodResolver(claimUpdateSchema),
    reValidateMode: 'onChange',
    defaultValues: defaultClaimUpdateValues,
  })
  const { control } = form
  const { append } = useFieldArray({
    control,
    name: 'claimServiceLines',
  })

  const getDateString = (date?: DateValue): string | undefined =>
    date ? getCalendarDateLabel(date) : undefined

  const noteTypeCodes = useCodesetCodes(CODESETS.NoteType).find(
    (code) => code.groupingCode === 'Primary',
  )
  const noteTitleCode = useCodesetCodes(CODESETS.NoteTitle).find(
    (code) => code.groupingCode === 'Primary' && code.value === 'Evaluation',
  )

  const handleCustomAppointment = async (visit: ClaimUpdateApiResponse) => {
    const { patientId, appointmentId } = visit
    if (!patientId || !appointmentId) return

    const result = await getQuickNoteDetailAction(
      String(patientId),
      [QuickNoteSectionName.QuicknoteSectionCodes],
      undefined,
      String(appointmentId),
    )

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to quicknote details')
      return
    }

    const rawAddonCodes = result.data
      .filter((item) => item.sectionItem === 'cptAddonCodes')
      .map((item) => item.sectionItemValue.trim())

    const allCptCodes = form
      .getValues('claimServiceLines')
      ?.map((line: ClaimServiceLine) => line.cptCode?.trim())
      .filter((code): code is string => Boolean(code))

    const serviceLineCptCodeSet = new Set(allCptCodes)
    const validAddonCodes = rawAddonCodes.filter((code) =>
      serviceLineCptCodeSet.has(code),
    )
    const filteredCptCodes = [...serviceLineCptCodeSet].filter(
      (code) => !validAddonCodes.includes(code),
    )

    const customAddons = validAddonCodes.join(',')
    const serviceLineCptCodes = filteredCptCodes.join(',')
    const serviceLineDiagnosis = form
      .getValues('claimDiagnosis')
      .reduce((acc: string[], line: ClaimDiagnosisApiResponse) => {
        if (line.diagnosisCode && !acc.includes(line.diagnosisCode)) {
          acc.push(line.diagnosisCode)
        }
        return acc
      }, [])
      .join(',')

    const addonCodesSections = sectionCodesMapping(
      customAddons,
      QuickNoteSectionName.QuicknoteSectionCodes,
      'cptAddonCodes',
      appointmentId,
      patientId,
    )

    const cptCodesSections = sectionCodesMapping(
      serviceLineCptCodes,
      QuickNoteSectionName.QuicknoteSectionCodes,
      'cptPrimaryCodes',
      appointmentId,
      patientId,
    )

    const diagnosisCodesSections = {
      sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
      sectionItem: 'diagnosis',
      sectionItemValue: serviceLineDiagnosis,
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

    if (resultWidgets.state === 'error') {
      toast.error(
        resultWidgets.error ?? 'Failed to save widgets for custom visit',
      )
      return
    }

    const resultSignNote = await signNoteAction({
      patientId: String(patientId),
      appointmentId: String(appointmentId),
      isCustomAppointment: true,
      noteTypeCode: noteTypeCodes?.value ?? '',
      noteTitleCode: noteTitleCode?.value ?? '',
      signedByUserId: visit.renderingProviderId!,
      isError: true,
    })

    if (resultSignNote.state === 'error')
      return toast.error(
        resultSignNote.error ?? 'Failed to sign note for custom visit',
      )
  }

  const onSubmit: SubmitHandler<ClaimUpdateSchemaType> = async (data) => {
    const formattedClaimData = {
      ...data,
      accidentDate: getDateString(data.accidentDate),
      lastSeenDate: getDateString(data.lastSeenDate),
      forceUnlockDate: getDateString(data.forceUnlockDate),
      dateOfServiceFrom: getDateString(data.dateOfServiceFrom),
      dateOfServiceTo: getDateString(data.dateOfServiceTo),
      submittedDate: getDateString(data.submittedDate),
      onsetOfCurrentIllness: getDateString(data.onsetOfCurrentIllness),
      firstSimilarIllness: getDateString(data.firstSimilarIllness),
      lastMenstrualPeriod: getDateString(data.lastMenstrualPeriod),
      admissionDate: getDateString(data.admissionDate),
      dischargeDate: getDateString(data.dischargeDate),
      lastXRayDate: getDateString(data.lastXRayDate),
      lastXRayType: data.lastXRayType,
      startDateOfInabilityToWork: getDateString(
        data.startDateOfInabilityToWork,
      ),
      endDateOfInabilityToWork: getDateString(data.endDateOfInabilityToWork),
      renderingProviderId: data.renderingProviderId
        ? Number(data.renderingProviderId)
        : null,
      attendingProviderId: data.attendingProviderId
        ? Number(data.attendingProviderId)
        : null,
      supervisingProviderId: data.supervisingProviderId
        ? Number(data.supervisingProviderId)
        : null,
      orderingProviderId: data.orderingProviderId
        ? Number(data.orderingProviderId)
        : null,
      referringProviderId: data.referringProviderId
        ? Number(data.referringProviderId)
        : null,
      claimServiceLines: (data.claimServiceLines ?? []).map(
        (line: ClaimServiceLine) => ({
          ...line,
          dateOfServiceFrom: getDateString(line.dateOfServiceFrom),
          dateOfServiceTo: getDateString(line.dateOfServiceTo),
        }),
      ),
    }
    const { claimInsurancePolicies, ...formattedClaimDataWithoutPolicies } =
      formattedClaimData
    const sanitizeClaimData = sanitizeFormData(
      formattedClaimDataWithoutPolicies,
    )
    const result = await updateClaimAction(data.id ?? '', sanitizeClaimData)
    if (result.state === 'error') {
      if (
        result.status === 500 &&
        result.error.includes('ResourceModifiedByAnotherUserException')
      ) {
        setReloadClaimDialog(true)
      } else {
        toast.error(result.error)
      }
    } else {
      const isCustomAppointment = form.getValues('isCustomAppointment')
      if (isCustomAppointment) {
        await handleCustomAppointment(sanitizeClaimData)
      }

      toast.success('Record has been saved successfully')
      fetchClaimData(claimId)
    }
  }
  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value)
  }

  const fetchClaimData = async (claimId: string) => {
    form.reset(defaultClaimUpdateValues)
    const claimResponse = await getClaimById(claimId)
    if (claimResponse.state === 'success') {
      const transformedClaimData = transformClaimData(claimResponse.data)
      setSelectedClaimsData(activeTab, {
        claimId: claimId,
        claimStatus: transformedClaimData.claimStatusCode
          ? transformedClaimData.claimStatusCode
          : '',
        claimPrimaryStatus: transformedClaimData.primaryStatusCode
          ? transformedClaimData.primaryStatusCode
          : '',
      })
      form.reset(transformedClaimData)
    } else {
      toast.error('Failed to fetch claim data')
    }
  }

  useEffect(() => {
    if (claimId && activeTab.includes(RevenueCycleTab.ClaimDetails)) {
      fetchClaimData(claimId)
    }
    return () => {
      openAlertModal(false)
    }
  }, [activeTab])

  useEffect(() => {
    if (isClaimPosted === true) {
      fetchClaimData(claimId)
    }
  }, [isClaimPosted])
  const transformClaimData = (
    claimData: ClaimUpdateApiResponse,
  ): ClaimUpdate => {
    return {
      ...claimData,
      accidentDate: claimData.accidentDate
        ? getLocalCalendarDate(claimData.accidentDate)
        : undefined,
      lastSeenDate: claimData.lastSeenDate
        ? getLocalCalendarDate(claimData.lastSeenDate)
        : undefined,
      forceUnlockDate: claimData.forceUnlockDate
        ? getLocalCalendarDate(claimData.forceUnlockDate)
        : undefined,
      dateOfServiceFrom: claimData.dateOfServiceFrom
        ? getLocalCalendarDate(claimData.dateOfServiceFrom)
        : undefined,
      dateOfServiceTo: claimData.dateOfServiceTo
        ? getLocalCalendarDate(claimData.dateOfServiceTo)
        : undefined,
      submittedDate: claimData.submittedDate
        ? getLocalCalendarDate(claimData.submittedDate)
        : undefined,
      onsetOfCurrentIllness: claimData.onsetOfCurrentIllness
        ? getLocalCalendarDate(claimData.onsetOfCurrentIllness)
        : undefined,
      firstSimilarIllness: claimData.firstSimilarIllness
        ? getLocalCalendarDate(claimData.firstSimilarIllness)
        : undefined,
      lastMenstrualPeriod: claimData.lastMenstrualPeriod
        ? getLocalCalendarDate(claimData.lastMenstrualPeriod)
        : undefined,
      admissionDate: claimData.admissionDate
        ? getLocalCalendarDate(claimData.admissionDate)
        : undefined,
      dischargeDate: claimData.dischargeDate
        ? getLocalCalendarDate(claimData.dischargeDate)
        : undefined,
      lastXRayDate: claimData.lastXRayDate
        ? getLocalCalendarDate(claimData.lastXRayDate)
        : undefined,
      startDateOfInabilityToWork: claimData.startDateOfInabilityToWork
        ? getLocalCalendarDate(claimData.startDateOfInabilityToWork)
        : undefined,
      endDateOfInabilityToWork: claimData.endDateOfInabilityToWork
        ? getLocalCalendarDate(claimData.endDateOfInabilityToWork)
        : undefined,
      renderingProviderId:
        claimData.renderingProviderId?.toString() ?? undefined,
      attendingProviderId:
        claimData.attendingProviderId?.toString() ?? undefined,
      supervisingProviderId:
        claimData.supervisingProviderId?.toString() ?? undefined,
      orderingProviderId: claimData.orderingProviderId?.toString() ?? undefined,
      referringProviderId:
        claimData.referringProviderId?.toString() ?? undefined,
      updatedByName:
        (claimData.metadata?.updatedByFullName ||
          claimData.metadata?.createdByFullName) ??
        'NA',
      claimServiceLines: (claimData.claimServiceLines ?? []).map(
        (line: ClaimServiceLineApiResponse) => ({
          ...line,
          dateOfServiceFrom: line.dateOfServiceFrom
            ? getLocalCalendarDate(line.dateOfServiceFrom)
            : undefined,
          dateOfServiceTo: line.dateOfServiceTo
            ? getLocalCalendarDate(line.dateOfServiceTo)
            : undefined,
          isAnesthsia: line?.isAnesthesia ?? false,
          startTime: line?.startTime?.toString() ?? '',
          minutes: line?.minutes?.toString() ?? '',
          endTime: line?.endTime?.toString() ?? '',
        }),
      ),
    }
  }
  const onAddNewServiceLine = () => {
    const timeZone = getLocalTimeZone()
    const claimServiceLines = form.getValues('claimServiceLines')
    const activeClaimServiceLines = claimServiceLines.filter(
      (charge: ClaimServiceLine) => charge.recordStatus !== 'Deleted',
    )
    if (activeClaimServiceLines.length > 24) {
      toast.error('Cannot add more then 25 service lines')
      return
    }

    const activeDiagnoses = form
      .getValues('claimDiagnosis')
      .filter((diagnosis) => diagnosis.recordStatus !== 'Deleted')

    const firstFourDiagnoses = activeDiagnoses.slice(0, 4)

    const diagnosisPointers: Record<string, string> = {
      diagnosisPointer1: '',
      diagnosisPointer2: '',
      diagnosisPointer3: '',
      diagnosisPointer4: '',
    }

    firstFourDiagnoses.forEach((diagnosis, index) => {
      diagnosisPointers[`diagnosisPointer${index + 1}`] = diagnosis.sequenceNo
        ? diagnosis.sequenceNo.toString()
        : ''
    })
    const dateToday: CalendarDate = today(timeZone)
    const newServiceLine = {
      recordStatus: 'Active',
      claimId,
      chargeId: '',
      cptCode: '',
      modifierCode1: '',
      modifierCode2: '',
      ...diagnosisPointers,
      sequenceNo: form.watch('claimServiceLines').length + 1,
      dateOfServiceFrom: dateToday,
      dateOfServiceTo: dateToday,
      units: 0,
      unitAmount: 0.0,
      totalAmount: 0.0,
      placeOfService: '',
      isDoNotBill: false,
      statusCode: 'NewCharge',
      isAnesthesia: false,
    }

    append(newServiceLine)
  }
  const handleReloadClaim = () => {
    fetchClaimData(claimId)
    setReloadClaimDialog(false)
  }
  const isSelfPay = form.watch('isSelfPay')

  useEffect(() => {
    setOpenItems((prevOpenItems) => {
      if (isSelfPay) {
        return prevOpenItems.filter(
          (item) => item !== ClaimDetailsTab.Insurances,
        )
      } else {
        if (!prevOpenItems.includes(ClaimDetailsTab.Insurances)) {
          return [...prevOpenItems, ClaimDetailsTab.Insurances]
        }
        return prevOpenItems
      }
    })
  }, [isSelfPay])

  return (
    <Box>
      {openNotesDialog && (
        <ClaimNotesDialog
          isEditMode={false}
          claimId={claimId}
          openNotesDialog={openNotesDialog}
          handleCloseModal={() => setOpenNotesDialog(false)}
        />
      )}
      {openDeletedNotesDialog && (
        <ClaimDeletedNotesDialog
          claimId={claimId}
          openDialog={openDeletedNotesDialog}
          handleCloseModal={() => setOpenDeletedNotesDialog(false)}
        />
      )}
      {reloadClaimDialog && (
        <LoadClaimConfrimationDialog
          isOpen={reloadClaimDialog}
          onConfirm={handleReloadClaim}
          toggleOpen={() => setReloadClaimDialog(false)}
        />
      )}
      <FormContainer
        form={form}
        onSubmit={onSubmit}
        className="bg-pp-bg-accent "
      >
        <ClaimDetailHeader />
        <ClaimActions claimId={claimId} />
        <PatientClaimDetails />
        <Flex direction="column" className="bg-white overflow-hidden rounded-1">
          <ScrollArea scrollbars="vertical" className="max-h-[63vh]">
            <Accordion.Root
              type="multiple"
              className="w-full"
              value={openItems}
              onValueChange={handleAccordionChange}
            >
              <ClaimAccordionItem title={ClaimDetailsTab.BillingProvider}>
                <BillingProviderView />
              </ClaimAccordionItem>

              <ClaimAccordionItem
                title={ClaimDetailsTab.Insurances}
                buttons={<ClaimInsuranceHeaders />}
                isDisabled={isSelfPay}
              >
                <ClaimInsuranceTable />
              </ClaimAccordionItem>
              <ClaimAccordionItem title={ClaimDetailsTab.Diagnosis}>
                <DiagnosisView />
              </ClaimAccordionItem>
              <ClaimAccordionItem
                title={ClaimDetailsTab.Charges}
                buttons={<ChargesHeaderAction onAddNew={onAddNewServiceLine} />}
              >
                <ChargesTableView />
              </ClaimAccordionItem>

              <ClaimAccordionItem title={ClaimDetailsTab.AccidentsAndLabs}>
                <AccidentAndLabView />
              </ClaimAccordionItem>

              <Flex gap="3" className="flex-1">
                <ClaimAccordionItem
                  title={ClaimDetailsTab.AuthorizationsAndReferrals}
                  className="flex-1"
                >
                  <AuthAndReferralsView />
                </ClaimAccordionItem>

                <ClaimAccordionItem
                  title={ClaimDetailsTab.SubmissionInformation}
                  className="flex-1"
                >
                  <SubmissionInformationView />
                </ClaimAccordionItem>
              </Flex>
              <ClaimAccordionItem
                title={ClaimDetailsTab.ClaimDates}
                className="flex-1"
              >
                <ClaimDatesView />
              </ClaimAccordionItem>
              <ClaimAccordionItem title={ClaimDetailsTab.SubmissionResponse}>
                <SubmissionResponseTable />
              </ClaimAccordionItem>
              <ClaimAccordionItem
                title={ClaimDetailsTab.Notes}
                buttons={
                  <ClaimNotesHeaderActions
                    handleOpenModal={() => setOpenNotesDialog(true)}
                    handleOpenDeletedModal={() =>
                      setOpenDeletedNotesDialog(true)
                    }
                  />
                }
              >
                <ClaimNotesTable claimId={claimId} />
              </ClaimAccordionItem>
            </Accordion.Root>
          </ScrollArea>
        </Flex>
      </FormContainer>
    </Box>
  )
}

export { ClaimDetailView }
