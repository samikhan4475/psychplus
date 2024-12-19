import { Flex } from '@radix-ui/themes'
import { CodesetSelect, FormFieldError, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

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

const NoteTypeDropdown = () => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Note Type
      </FormFieldLabel>
      <CodesetSelect
        name="noteTypeCode"
        codeset={CODESETS.NoteType}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name="noteTypeCode" />
    </Flex>
  )
}

export { NoteTypeDropdown }
