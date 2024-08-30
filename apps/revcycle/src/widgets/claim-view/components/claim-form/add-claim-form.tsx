import { useEffect } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { FileIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Switch,
  Text,
} from '@radix-ui/themes'
import { useWatch, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Form, useForm, validate } from '@psychplus/form'
import { getClaimById, updateClaim } from '../../api.client'
import { useStore } from '../../store'
import { AccidentAndLab } from './accident-and-lab'
import { AuthAndReferrals } from './auth-and-referrals'
import { BillingProvider } from './billing-provider'
import { Charges } from './charges'
import { ClaimAccordionItem } from './claim-accordion'
import { Diagnosis } from './diagnosis'
import { InsuranceTable } from './insurance-table'
import { SubmissionInformation } from './submission-information'
import { SubmissionResponse } from './submission-response'
import { ClaimServiceLine } from './types'

const schema = z.object({
  id: z.string().uuid().optional(),
  recordStatus: validate.anyString,
  practiceId: validate.requiredString,
  appointmentId: validate.numberOnly,
  claimNumber: validate.requiredString,
  locationId: validate.anyString.optional(),
  renderingProviderId: validate.anyString,
  attendingProviderId: validate.nullOrString,
  supervisingProviderId: validate.nullOrString,
  orderingProviderId: validate.nullOrString,
  referringProviderId: validate.nullOrString,
  patientId: validate.numberOnly,
  placeOfService: validate.anyString,
  dateOfServiceFrom: z.date(),
  dateOfServiceTo: z.date(),
  claimType: validate.anyString.optional(),
  authorizationNumber: validate.anyString.optional(),
  referralNumber: validate.anyString.optional(),
  clinicalLaboratoryImprovementAmendmentsNumber:
    validate.nullOrString.optional(),
  claimNotes: validate.anyString.optional(),
  payerClaimControlNumber: validate.anyString.optional(),
  primaryStatusCode: validate.anyString.optional(),
  secondaryStatusCode: validate.anyString.optional(),
  tertiaryStatusCode: validate.anyString.optional(),
  patientStatusCode: validate.anyString.optional(),
  createFrom: validate.anyString.optional(),
  deletedReason: validate.anyString.optional(),
  totalAmount: validate.numberOnly,
  amountDue: validate.nullOrNumber,
  primaryPaid: validate.nullOrNumber,
  secondaryPaid: validate.nullOrNumber,
  tertiaryPaid: validate.nullOrNumber,
  claimStatusCode: validate.anyString.optional(),
  isMarkAsSubmitted: validate.nullOrBoolean,
  isSubmitted: validate.nullOrBoolean,
  submittedDate: z.date().optional(),
  isHoldStatement: validate.nullOrBoolean,
  isResubmitted: validate.nullOrBoolean,
  isForcePaper: validate.nullOrBoolean,
  rejectionReason: validate.anyString.optional(),
  isSelfPay: validate.nullOrBoolean,
  isDraft: validate.nullOrBoolean,
  isHold: validate.nullOrBoolean,
  isClaimScrubbed: validate.nullOrBoolean,
  isForceUnlock: validate.nullOrBoolean,
  forceUnlockDate: z.date().optional(),
  forceUnlockReason: validate.anyString.optional(),
  primaryPatientInsurancePlanId: validate.nullOrNumber,
  secondaryPatientInsurancePlanId: validate.nullOrNumber,
  tertiaryPatientInsurancePlanId: validate.nullOrNumber,
  accidentDate: z.date().optional(),
  accidentState: validate.anyString.optional(),
  accidentType: validate.anyString.optional(),
  isOutsideLab: validate.nullOrBoolean,
  labCharges: validate.nullOrNumber,
  isEmployment: validate.nullOrBoolean,
  isAutoAccident: validate.nullOrBoolean,
  isOtherAccident: validate.nullOrBoolean,
  claimFrequencyCode: validate.anyString.optional(),
  lastSeenDate: z.date().optional(),
  patientName: validate.anyString.optional(),
  patientAccountNumber: validate.anyString.optional(),
  patientDateOfBirth: validate.anyString.optional(),
  patientGender: validate.anyString.optional(),
  claimServiceLines: z.array(
    z.object({
      id: validate.nullOrString.optional(),
      recordStatus: validate.anyString.optional(),
      claimId: validate.anyString,
      chargeId: validate.nullOrString,
      cptCode: validate.anyString,
      cptDescription: validate.anyString.optional(),
      nationalDrugCode: validate.anyString.optional(),
      modifierCode1: validate.anyString.optional(),
      modifierCode2: validate.anyString.optional(),
      modifierCode3: validate.anyString.optional(),
      modifierCode4: validate.anyString.optional(),
      diagnosisPointer1: validate.anyString.optional(),
      diagnosisPointer2: validate.anyString.optional(),
      diagnosisPointer3: validate.anyString.optional(),
      diagnosisPointer4: validate.anyString.optional(),
      serviceLineNotes: validate.anyString.optional(),
      authorizationNumber: validate.anyString.optional(),
      deletedReason: validate.anyString.optional(),
      minutes: validate.anyString.optional(),
      startTime: validate.anyString.optional(),
      endTime: validate.anyString.optional(),
      sequenceNo: validate.numberOnly,
      dateOfServiceFrom: z.date(),
      dateOfServiceTo: z.date(),
      units: validate.nullOrNumber,
      // nationalDrugCodeQuantity: validate.nullOrNumber,
      nationalDrugCodeMeasureUnit: validate.anyString.optional(),
      unitAmount: validate.nullOrNumber,
      totalAmount: validate.nullOrNumber,
      placeOfService: validate.anyString.optional(),
      isDoNotBill: validate.nullOrBoolean,
      statusCode: validate.anyString.optional(),
    }),
  ),
  claimDiagnosis: z
    .array(
      z.object({
        id: validate.anyString.optional(),
        recordStatus: validate.anyString.optional(),
        claimId: validate.anyString,
        diagnosisCode: validate.anyString,
        diagnosisDescription: validate.anyString.optional(),
        deletedReason: validate.anyString.optional(),
        sequenceNo: validate.numberOnly,
      }),
    )
    .optional(),
})
type SchemaType = z.infer<typeof schema>
type FormBoolFieldName =
  | 'isMarkAsSubmitted'
  | 'isHoldStatement'
  | 'isHold'
  | 'isClaimScrubbed'
  | 'isForcePaper'
const AddClaimForm = ({
  selectedClaimId,
  claimNumber,
}: {
  selectedClaimId?: string
  claimNumber?: string
}) => {
  const {
    setSelectedClaimBilledAmt,
    selectedClaimBilledAmt,
    deletedClaimServiceLines,
  } = useStore((state) => ({
    setSelectedClaimBilledAmt: state.setSelectedClaimBilledAmt,
    selectedClaimBilledAmt: state.selectedClaimBilledAmt,
    deletedClaimServiceLines: state.deletedClaimServiceLines,
  }))
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })
  const emptyStringToNull = (
    value: string | undefined | null,
  ): string | null => {
    if (typeof value === 'string') {
      return value.trim() !== '' ? value.trim() : null
    }
    return null
  }

  const transformClaimData = (claimData: any) => {
    setSelectedClaimBilledAmt(Number(claimData.totalAmount))
    return {
      ...claimData,
      dateOfServiceFrom: claimData.dateOfServiceFrom
        ? new Date(claimData.dateOfServiceFrom)
        : undefined,
      dateOfServiceTo: claimData.dateOfServiceTo
        ? new Date(claimData.dateOfServiceTo)
        : undefined,
      primaryPatientInsurancePlanId: claimData.primaryPatientInsurancePlanId
        ? Number(claimData.primaryPatientInsurancePlanId)
        : null,
      secondaryPatientInsurancePlanId: claimData.secondaryPatientInsurancePlanId
        ? Number(claimData.secondaryPatientInsurancePlanId)
        : null,
      tertiaryPatientInsurancePlanId: claimData.tertiaryPatientInsurancePlanId
        ? Number(claimData.tertiaryPatientInsurancePlanId)
        : null,
      renderingProviderId: claimData.renderingProviderId?.toString() ?? null,
      attendingProviderId: claimData.attendingProviderId?.toString() ?? null,
      supervisingProviderId:
        claimData.supervisingProviderId?.toString() ?? null,
      orderingProviderId: claimData.orderingProviderId?.toString() ?? null,
      referringProviderId: claimData.referringProviderId?.toString() ?? null,
      submittedDate: claimData.submittedDate
        ? new Date(claimData.submittedDate)
        : undefined,
      forceUnlockDate: claimData.forceUnlockDate
        ? new Date(claimData.forceUnlockDate)
        : undefined,
      accidentDate: claimData.accidentDate
        ? new Date(claimData.accidentDate)
        : undefined,
      lastSeenDate: claimData.lastSeenDate
        ? new Date(claimData.lastSeenDate)
        : undefined,
      claimServiceLines: claimData.claimServiceLines.map(
        (line: ClaimServiceLine) => ({
          ...line,
          dateOfServiceFrom: line.dateOfServiceFrom
            ? new Date(line.dateOfServiceFrom)
            : undefined,
          dateOfServiceTo: line.dateOfServiceTo
            ? new Date(line.dateOfServiceTo)
            : undefined,
        }),
      ),
    }
  }

  const fetchAndSetClaimData = async (claimId: string) => {
    try {
      const claimData = await getClaimById(claimId)
      if (claimData) {
        const transformedClaimData = transformClaimData(claimData)
        form.reset(transformedClaimData)
      }
    } catch (error) {
      console.error('Failed to fetch claim data:', error)
    }
  }

  useEffect(() => {
    if (selectedClaimId) {
      fetchAndSetClaimData(selectedClaimId)
    }
  }, [selectedClaimId, form])

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    // Parse fields to ensure correct types
    const parsedData = {
      ...data,
      id: data.id ?? '',
      attendingProviderId: emptyStringToNull(data.attendingProviderId),
      supervisingProviderId: emptyStringToNull(data.supervisingProviderId),
      orderingProviderId: emptyStringToNull(data.orderingProviderId),
      referringProviderId: emptyStringToNull(data.referringProviderId),
      accidentState: emptyStringToNull(data.accidentState),
      accidentType: emptyStringToNull(data.accidentType),
    }
    const currentClaimServiceLines = data.claimServiceLines || []
    const updatedClaimServiceLines = [
      ...currentClaimServiceLines,
      ...deletedClaimServiceLines,
    ]
    await updateClaim(parsedData.id, {
      ...parsedData,
      claimServiceLines: updatedClaimServiceLines,
    })
  }

  const handleAddCharge = () => {
    const { setValue, getValues } = form
    const currentCharges = getValues('claimServiceLines') || []

    // Check if there are any charges
    if (currentCharges.length > 0) {
      const lastCharge = currentCharges[currentCharges.length - 1]

      // Ensure that the last charge has a CPT code and place of service
      if (!lastCharge.cptCode || !lastCharge.placeOfService) {
        alert(
          'Please fill in the CPT code and place of service for the previous service line before adding a new one.',
        )
        return
      }
    }

    const newCharge = {
      id: null,
      recordStatus: 'Active',
      claimId: getValues('id') ?? '',
      chargeId: '',
      cptCode: '',
      cptDescription: '',
      nationalDrugCode: '',
      modifierCode1: '',
      modifierCode2: '',
      modifierCode3: '',
      modifierCode4: '',
      diagnosisPointer1: '',
      diagnosisPointer2: '',
      diagnosisPointer3: '',
      diagnosisPointer4: '',
      serviceLineNotes: '',
      authorizationNumber: '',
      deletedReason: '',
      minutes: '',
      startTime: '',
      endTime: '',
      sequenceNo: currentCharges.length + 1,
      dateOfServiceFrom: new Date(),
      dateOfServiceTo: new Date(),
      units: 0,
      // nationalDrugCodeQuantity: 0,
      nationalDrugCodeMeasureUnit: '',
      unitAmount: 0,
      totalAmount: 0,
      placeOfService: '',
      isDoNotBill: false,
      statusCode: 'NewCharge',
    }

    setValue('claimServiceLines', [...currentCharges, newCharge])
  }

  const dobFormat = (dob: string | undefined): string => {
    if (!dob) return '' // Return an empty string if dob is undefined

    const date = new Date(dob)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    return `${month}/${day}/${year}`
  }
  const handleCheckboxChange = (fieldName: FormBoolFieldName) => {
    const currentValue = form.getValues(fieldName)
    form.setValue(fieldName, !currentValue)
  }

  const isForcePaper = useWatch({ control: form.control, name: 'isForcePaper' })
  const isMarkAsSubmitted = useWatch({
    control: form.control,
    name: 'isMarkAsSubmitted',
  })
  const isHoldStatement = useWatch({
    control: form.control,
    name: 'isHoldStatement',
  })
  const isHold = useWatch({ control: form.control, name: 'isHold' })
  const isClaimScrubbed = useWatch({
    control: form.control,
    name: 'isClaimScrubbed',
  })
  return (
    <Box className="px-2">
      <Form form={form} onSubmit={onSubmit}>
        <Flex
          justify="between"
          className="mb-2 border border-solid border-[#f7f6f6] py-1"
        >
          <Box>
            <Text size="4" className="pt-2 font-bold">
              Claim # {claimNumber}
            </Text>
          </Box>
          <Box>
            <Button className="h-25 ml-2 bg-[#151B4A]">
              <FileIcon /> Save
            </Button>
          </Box>
        </Flex>

        <Flex justify="between" className="mb-2">
          <Flex gap="2">
            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox
                  checked={isForcePaper ?? false}
                  onCheckedChange={() => handleCheckboxChange('isForcePaper')}
                />{' '}
                HCFA
              </Flex>
            </Text>

            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox
                  checked={isClaimScrubbed ?? false}
                  onCheckedChange={() =>
                    handleCheckboxChange('isClaimScrubbed')
                  }
                />{' '}
                Ready to Send
              </Flex>
            </Text>

            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox
                  checked={isHoldStatement ?? false}
                  onCheckedChange={() =>
                    handleCheckboxChange('isHoldStatement')
                  }
                />
                Hold Statement
              </Flex>
            </Text>

            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox
                  checked={isHold ?? false}
                  onCheckedChange={() => handleCheckboxChange('isHold')}
                />{' '}
                Hold Claim
              </Flex>
            </Text>

            <Text as="label" size="2" weight="bold">
              <Flex gap="2">
                <Checkbox
                  checked={isMarkAsSubmitted ?? false}
                  onCheckedChange={() =>
                    handleCheckboxChange('isMarkAsSubmitted')
                  }
                />
                Mark as Submit
              </Flex>
            </Text>
          </Flex>
          <Box>
            <Button className="h-25 ml-2 border border-solid border-[#8b8b8b] bg-transparent text-[#000]">
              HX
            </Button>
          </Box>
        </Flex>
        <Flex className="rounded-[5px] bg-[#EBF3FC] p-2">
          <Grid
            columns="2"
            gap="3"
            rows="repeat(2)"
            className=" mr-2 w-2/5 border-r border-solid border-[#a4a4a4]"
          >
            <Box>
              <Text size="2" className="pr-2 font-bold">
                Patient Name
              </Text>
              <Text size="2">{form.getValues('patientName')}</Text>
            </Box>
            <Box>
              <Text size="2" className="pr-2 font-bold">
                Gender
              </Text>
              <Text size="2">{form.getValues('patientGender')}</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                DOB
              </Text>
              <Text size="2">
                {dobFormat(form.getValues('patientDateOfBirth') ?? '')}
              </Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Account Number
              </Text>
              <Text size="2">{form.getValues('patientAccountNumber')}</Text>
            </Box>
          </Grid>

          <Grid columns="4" gap="3" rows="repeat(2)" className=" w-3/5">
            <Box>
              <Text size="2" className="pr-2 font-bold">
                Billed
              </Text>
              <Text size="2">${selectedClaimBilledAmt.toFixed(2)}</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Secondary Paid
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Write Off
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Last Modified By
              </Text>
              <Text size="2">-</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Primary Paid
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Patient Paid
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Balance
              </Text>
              <Text size="2">$0.00</Text>
            </Box>

            <Box>
              <Text size="2" className="pr-2 font-bold">
                Claim Status
              </Text>
              <Text size="2">New Charge</Text>
            </Box>
          </Grid>
        </Flex>

        <Accordion.Root
          type="multiple"
          className="w-full"
          defaultValue={[
            'Billing Provider',
            'Accidents And Labs',
            'Diagnosis',
            'Insurances',
            'Charges',
            'Authorizations and Referrals',
            'Submission Information',
            'Submission Response',
          ]}
        >
          <ClaimAccordionItem title="Billing Provider">
            <BillingProvider form={form} />
          </ClaimAccordionItem>

          <ClaimAccordionItem title="Accidents And Labs">
            <AccidentAndLab form={form} />
          </ClaimAccordionItem>

          <ClaimAccordionItem title="Diagnosis">
            <Diagnosis form={form} />
          </ClaimAccordionItem>

          <ClaimAccordionItem
            title="Insurances"
            buttons={
              <Flex gap="3" align="center" justify="end">
                <Text as="label" size="2" weight="bold">
                  <Flex gap="2">
                    <Switch
                      size="1"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />{' '}
                    Show Inactive Plans
                  </Flex>
                </Text>

                <Text as="label" size="2" weight="bold">
                  <Flex gap="2">
                    <Switch
                      size="1"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />{' '}
                    Self Pay
                  </Flex>
                </Text>

                <Button
                  className="bg-[transparent] font-bold text-[#000]"
                  size="1"
                >
                  <PlusCircledIcon />
                  Add
                </Button>
              </Flex>
            }
          >
            <InsuranceTable />
          </ClaimAccordionItem>

          <ClaimAccordionItem
            title="Charges"
            buttons={
              <Flex gap="3" align="center" justify="end">
                <Button
                  type="button"
                  className="bg-[transparent] font-bold text-[#000]"
                  size="1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddCharge()
                  }}
                >
                  <PlusCircledIcon />
                  Add
                </Button>
              </Flex>
            }
          >
            <Charges form={form} />
          </ClaimAccordionItem>

          <Flex gap="3">
            <Box className="flex-1">
              <ClaimAccordionItem title="Authorizations and Referrals">
                <AuthAndReferrals form={form} />
              </ClaimAccordionItem>
            </Box>
            <Box className="flex-1">
              <ClaimAccordionItem title="Submission Information">
                <SubmissionInformation form={form} />
              </ClaimAccordionItem>
            </Box>
          </Flex>

          <ClaimAccordionItem title="Submission Response">
            <SubmissionResponse />
          </ClaimAccordionItem>
        </Accordion.Root>
      </Form>
    </Box>
  )
}

export { AddClaimForm, type SchemaType }
