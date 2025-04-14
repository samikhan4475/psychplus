import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import * as Accordion from '@radix-ui/react-accordion'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, LoadingPlaceholder } from '@/components'
import {
  ClaimServiceLine,
  ClaimServiceLineApiResponse,
  ClaimUpdate,
  ClaimUpdateApiResponse,
} from '@/types'
import {
  getCalendarDateLabel,
  getLocalCalendarDate,
  sanitizeFormData,
} from '@/utils'
import { CLAIM_PAYMENT_STATUSES, ENABLE_FORM_STATUSES } from '../constants'
import { useStore } from '../store'
import { ClaimDetailsTab } from '../types'
import { AccidentAndLabView } from './accident-lab-section'
import { getClaimById } from './actions/get-service-claim'
import { updateClaimAction } from './actions/update-claim'
import { AuthAndReferralsView } from './auth-and-referrals-section'
import { BillingProviderView } from './billing-provider-section'
import { ChargesHeaderAction, ChargesTableView } from './charges-section'
import { ClaimAccordionItem } from './claim-accordion-item'
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
import { DiagnosisView } from './diagnosis-section'
import { LoadClaimConfrimationDialog } from './load-claim-confirmation-dialog'
import { claimUpdateSchema, ClaimUpdateSchemaType } from './schema'
import { useStore as ClaimDetailStore } from './store'
import { SubmissionInformationView } from './submission-information-section'
import { SubmissionResponseTable } from './submission-response-section'
import { metadata } from '@/app/layout'

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
    'Authorizations and Referrals',
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
    defaultValues: {
      claimServiceLines: [],
      claimDiagnosis: [],
    },
  })
  const { control } = form
  const { append } = useFieldArray({
    control,
    name: 'claimServiceLines',
  })

  const getDateString = (date?: DateValue): string | undefined =>
    date ? getCalendarDateLabel(date) : undefined

  const onSubmit: SubmitHandler<ClaimUpdateSchemaType> = async (data) => {
    const formattedClaimData = {
      ...data,
      accidentDate: getDateString(data.accidentDate),
      lastSeenDate: getDateString(data.lastSeenDate),
      forceUnlockDate: getDateString(data.forceUnlockDate),
      dateOfServiceFrom: getDateString(data.dateOfServiceFrom),
      dateOfServiceTo: getDateString(data.dateOfServiceTo),
      submittedDate: getDateString(data.submittedDate),
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
      toast.success('Record has been saved successfully')
      fetchClaimData(claimId)
    }
  }

  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value)
  }

  const fetchClaimData = async (claimId: string) => {
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
    if (claimId) {
      fetchClaimData(claimId)
    }
    return () => {
      openAlertModal(false)
    }
  }, [])

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
