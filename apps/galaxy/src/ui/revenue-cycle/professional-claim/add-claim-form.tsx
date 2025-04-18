import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { Box, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer, FormSubmitButton } from '@/components'
import { ClaimAddApiRequest, ClaimUpdateApiResponse } from '@/types'
import { getCalendarDateLabel, sanitizeFormData } from '@/utils'
import { addClaimAction, getPracticeAction } from '../actions'
import { useStore } from '../claim-tab/store'
import { ClaimDetailsTab } from '../types'
import { ClaimHeaders } from './add-claim-header'
import { ChargesTable } from './charges'
import { ChargesHeader } from './charges/charges-header'
import { AddClaimDiagnosisView } from './diagnosis'
import { PatientSelect } from './patient-select'
import { ProvidersView } from './providers'
import { addClaimSchema, ClaimAddSchemaType } from './schema'
import { useStore as ClaimStore } from '../store'

const getDateString = (date?: DateValue): string | undefined =>
  date ? getCalendarDateLabel(date) : undefined

interface AddClaimFormProps {
  onCloseModal: (open: boolean) => void
}

const AddClaimForm = ({ onCloseModal }: AddClaimFormProps) => {
  const { setActiveTab, setSelectedClaimsData } = ClaimStore((state) => ({
    setActiveTab: state.setActiveTab,
    setSelectedClaimsData: state.setSelectedClaimsData,
  }))
  const form = useForm<ClaimAddSchemaType>({
    resolver: zodResolver(addClaimSchema),
    defaultValues: {
      claimServiceLines: [
        {
          recordStatus: 'Active',
          cptCode: '',
          modifierCode1: '',
          modifierCode2: '',
          modifierCode3: '',
          modifierCode4: '',
          sequenceNo: 1,
          dateOfServiceFrom: today(getLocalTimeZone()),
          dateOfServiceTo: today(getLocalTimeZone()),
          units: 1,
          unitAmount: 0.0,
          totalAmount: 0.0,
          statusCode: 'NewCharge',
          isAnesthesia: false,
          diagnosisPointer1: '1',
          diagnosisPointer2: '',
          diagnosisPointer3: '',
          diagnosisPointer4: '',
        },
      ],
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const { control } = form
  const { append } = useFieldArray({
    control,
    name: 'claimServiceLines',
  })

  useEffect(() => {
    getPracticeAction().then((practiceResult) => {
      if (practiceResult.state === 'success') {
        const practiceId = practiceResult?.data[0]?.id ?? ''
        form.setValue('practiceId', practiceId, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    })
  }, [])

  const onOpenClaim = (claim: ClaimAddApiRequest) => {
    const claimTab = `Claim# ${claim.claimNumber}`
    setActiveTab(claimTab)
    setSelectedClaimsData(claimTab, {
      claimId: claim.id ?? '',
      claimStatus: claim.claimStatusCode ?? '',
      claimPrimaryStatus: claim.primaryStatusCode ??''
    })
  }

  const onsubmit = async (formData: ClaimAddSchemaType) => {
    const formattedClaimData = {
      ...formData,
      renderingProviderId: formData.renderingProviderId
        ? Number(formData.renderingProviderId)
        : null,
      dateOfServiceFrom: getDateString(formData.dateOfServiceFrom),
      dateOfServiceTo: getDateString(formData.dateOfServiceTo),
      totalAmount: (formData.claimServiceLines ?? []).reduce(
        (sum, line) => sum + (Number(line.totalAmount) || 0),
        0,
      ),
      primaryStatusCode: 'NewCharge',
      claimServiceLines: (formData.claimServiceLines ?? []).map((line) => ({
        ...line,
        dateOfServiceFrom: getDateString(line.dateOfServiceFrom),
        dateOfServiceTo: getDateString(line.dateOfServiceTo),
        placeOfService: formData.placeOfService,
      })),
    }
    const sanitizeClaimData = sanitizeFormData(formattedClaimData)
    const response = await addClaimAction(sanitizeClaimData)
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    if (response.state === 'success') {
      onOpenClaim(response.data)
      onCloseModal(false)
      form.reset()
      toast.success('Record has been saved successfully')
    }
  }
  const handleAddNewCharge = () => {
    const claimServiceLines = form.getValues('claimServiceLines')

    if (claimServiceLines.length > 5) {
      toast.error('Cannot add more then 6 service lines')
      return
    }
    const activeDiagnoses = form.getValues('claimDiagnosis') ?? []

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
    const timeZone = getLocalTimeZone()
    const dateToday: CalendarDate = today(timeZone)
    const newServiceLine = {
      recordStatus: 'Active',
      chargeId: '',
      cptCode: '',
      modifierCode1: '',
      modifierCode2: '',
      ...diagnosisPointers,
      sequenceNo: form.watch('claimServiceLines').length + 1,
      dateOfServiceFrom: dateToday,
      dateOfServiceTo: dateToday,
      units: 1,
      unitAmount: 0.0,
      totalAmount: 0.0,
      statusCode: 'NewCharge',
      isAnesthesia: false,
    }
    append(newServiceLine)
  }
  return (
    <FormContainer onSubmit={onsubmit} form={form}>
      <PatientSelect />
      <Flex direction="column" className="bg-white overflow-hidden rounded-1">
        <ClaimHeaders title={ClaimDetailsTab.BillingProvider}>
          <ProvidersView />
        </ClaimHeaders>
        <ClaimHeaders title={ClaimDetailsTab.Diagnosis}>
          <AddClaimDiagnosisView />
        </ClaimHeaders>
        <ClaimHeaders
          title={ClaimDetailsTab.Charges}
          buttons={<ChargesHeader onAddNew={handleAddNewCharge} />}
        >
          <ChargesTable />
        </ClaimHeaders>
      </Flex>
      <Box className="mt-4 flex justify-end">
        <FormSubmitButton size="2" highContrast form={form}>
          Save
        </FormSubmitButton>
      </Box>
    </FormContainer>
  )
}

export { AddClaimForm }
