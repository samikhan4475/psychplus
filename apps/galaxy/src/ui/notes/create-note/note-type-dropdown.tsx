import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'
import { CreateNoteSchema } from './schema'

export enum NoteType {
  Labs = 'Labs (results)',
  Images = 'Images (results)',
  EKG = 'EKG (results)',
  OtherResults = 'Other results (results)',
  DischargeSummary = 'Discharge Summary (medical records)',
  OtherMedicalRecords = 'Other medical records (medical records)',
  RequestToObtainInformation = 'Request to obtain information (consent)',
  RequestToSendInformation = 'Request to send information (consent)',
  TreatmentConsent = 'Treatment consent (consent)',
  MedicationPriorAuth = 'Medication Prior Auth (authorization)',
  TreatmentPriorAuth = 'Treatment Prior Auth (authorization)',
  ReferralLetter = 'Referral letter (Referral)',
  PersonalImage = 'Personal Image (Personal Information)',
  DriverLicense = 'Driver license (Personal Information)',
  InsuranceCard = 'Insurance card (Personal Information)',
  ExplanationOfBenefits = 'Explanation of Benefits (Billing)',
  Receipts = 'Receipts (Billing)',
  OtherBillingDocuments = 'Other Billing documents (Billing)',
  PowerOfAttorney = 'Power of Attorney (Legal)',
  DoNotResuscitate = 'Do not resuscitate (Legal)',
  Guardianship = 'Guardianship (legal)',
  PhoneCall = 'Phone call (communication)',
}

const noteTypeOptions = Object.entries(NoteType).map(([key, value]) => ({
  label: value,
  value: key,
}))

const NoteTypeDropdown = () => {
  const form = useFormContext<CreateNoteSchema>()
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Note Type
      </FormFieldLabel>
      <SelectInput
        field="noteType"
        options={noteTypeOptions}
        placeholder="Select Note Type"
        buttonClassName={buttonClassName}
        onValueChange={(newValue) => {
          form.setValue('noteType', newValue, { shouldDirty: true })
        }}
      />
      <FormFieldError name="noteType" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'

export { NoteTypeDropdown }
