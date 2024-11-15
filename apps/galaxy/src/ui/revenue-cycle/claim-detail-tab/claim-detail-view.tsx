import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
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
import { DiagnosisView } from './diagnosis-section'
import { claimUpdateSchema, ClaimUpdateSchemaType } from './schema'
import { SubmissionInformationView } from './submission-information-section'
import { SubmissionResponseTable } from './submission-response-section'

interface ClaimDetailViewProps {
  claimId: string
}
const ClaimDetailView = ({ claimId }: ClaimDetailViewProps) => {
  const [openItems, setOpenItems] = useState<string[]>([
    'Billing Provider',
    'Accidents And Labs',
    'Diagnosis',
    'Charges',
    'Authorizations and Referrals',
    'Submission Information',
    'Submission Response',
    'Insurances',
  ])

  const form = useForm<ClaimUpdateSchemaType>({
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
      renderingProviderId: Number(data.renderingProviderId),
      attendingProviderId: Number(data.attendingProviderId),
      supervisingProviderId: Number(data.supervisingProviderId),
      orderingProviderId: Number(data.orderingProviderId),
      referringProviderId: Number(data.referringProviderId),
      claimServiceLines: (data.claimServiceLines ?? []).map(
        (line: ClaimServiceLine) => ({
          ...line,
          dateOfServiceFrom: getDateString(line.dateOfServiceFrom),
          dateOfServiceTo: getDateString(line.dateOfServiceTo),
        }),
      ),
    }
    const sanitizeClaimData = sanitizeFormData(formattedClaimData)
    await updateClaimAction(data.id ?? '', sanitizeClaimData)
    toast.success('Record has been saved successfully')
    fetchClaimData(claimId)
  }

  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value)
  }

  const fetchClaimData = async (claimId: string) => {
    const claimResponse = await getClaimById(claimId)
    if (claimResponse.state === 'success') {
      const transformedClaimData = transformClaimData(claimResponse.data)
      form.reset(transformedClaimData)
    } else {
      toast('Failed to fetch claim data')
    }
  }
  useEffect(() => {
    if (claimId) {
      fetchClaimData(claimId)
    }
  }, [])

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
      renderingProviderId:
        claimData.renderingProviderId?.toString() ?? undefined,
      attendingProviderId:
        claimData.attendingProviderId?.toString() ?? undefined,
      supervisingProviderId:
        claimData.supervisingProviderId?.toString() ?? undefined,
      orderingProviderId: claimData.orderingProviderId?.toString() ?? undefined,
      referringProviderId:
        claimData.referringProviderId?.toString() ?? undefined,
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
  return (
    <FormContainer form={form} onSubmit={onSubmit} className="bg-pp-bg-accent ">
      <ClaimDetailHeader />
      <ClaimActions />
      <PatientClaimDetails />
      <Flex direction="column" className="bg-white overflow-hidden rounded-1">
        <Accordion.Root
          type="multiple"
          className="w-full"
          value={openItems}
          onValueChange={handleAccordionChange}
        >
          <ClaimAccordionItem title="Billing Provider">
            <BillingProviderView />
          </ClaimAccordionItem>

          <ClaimAccordionItem
            title="Insurances"
            buttons={<ClaimInsuranceHeaders />}
          >
            <ClaimInsuranceTable />
          </ClaimAccordionItem>
          <ClaimAccordionItem title="Diagnosis">
            <DiagnosisView />
          </ClaimAccordionItem>
          <ClaimAccordionItem
            title="Charges"
            buttons={<ChargesHeaderAction onAddNew={onAddNewServiceLine} />}
          >
            <ChargesTableView />
          </ClaimAccordionItem>

          <ClaimAccordionItem title="Accidents And Labs">
            <AccidentAndLabView />
          </ClaimAccordionItem>

          <Flex gap="3" className="flex-1">
            <ClaimAccordionItem
              title="Authorizations and Referrals"
              className="flex-1"
            >
              <AuthAndReferralsView />
            </ClaimAccordionItem>

            <ClaimAccordionItem
              title="Submission Information"
              className="flex-1"
            >
              <SubmissionInformationView />
            </ClaimAccordionItem>
          </Flex>
          <ClaimAccordionItem title="Submission Response">
            <SubmissionResponseTable />
          </ClaimAccordionItem>
        </Accordion.Root>
      </Flex>
    </FormContainer>
  )
}

export { ClaimDetailView }
