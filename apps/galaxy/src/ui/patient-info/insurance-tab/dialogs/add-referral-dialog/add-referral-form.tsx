'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { AttachmentButton } from './attachment-button'
import { AuthInputField } from './auth-input-field'
import { CptCodeSelect } from './cpt-code-select'
import { EndDatePicker } from './end-date-picker'
import { FacilitySelect } from './facility-select'
import { IcdCodeSelect } from './icd-code-select'
import { InsurranceSelect } from './insurrance-select'
import { ProviderInput } from './provider-input'
import { RemainingVisitInput } from './remaining-visit-input'
import { SaveButton } from './save-button'
import { SelectType } from './select-type'
import { StartDatePicker } from './start-date-picker'
import { StatusSelect } from './status-select'
import { TotalVistInput } from './total-visit-input'
import { UsedVistInput } from './used-visit-input'
import { VisitType } from './vist-type'

const schema = z.object({
  type: z.string().optional(),
  auth: z.string().optional(),
  startDate: z.custom<DateValue>(),
  endDate: z.custom<DateValue>(),
  visitType: z.string().optional(),
  facilityAdmissionId: z.string().optional(),
  insurrance: z.string().optional(),
  cptCodes: z.string().optional(),
  totalVisits: z.string().optional(),
  usedVisits: z.string().optional(),
  remainingVisits: z.string().optional(),
  totalVisit: z.string().optional(),
  providerInput: z.string().optional(),
  icdCodes: z.string().optional(),
  status: z.string().optional(),
})
type AddReferralSchemaType = z.infer<typeof schema>

const AddReferralForm = () => {
  const form = useForm<AddReferralSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: '',
      auth: '',
      startDate: undefined,
      endDate: undefined,
      visitType: '',
      facilityAdmissionId: '',
      insurrance: '',
      cptCodes: '',
      totalVisits: '',
      usedVisits: '',
      remainingVisits: '',
      providerInput: '',
      icdCodes: '',
      status: '',
    },
  })

  const onSubmit: SubmitHandler<AddReferralSchemaType> = (data) => {
    console.log('Form Submitted:', data)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid gap="2" columns="4">
        <SelectType />
        <AuthInputField />
        <StartDatePicker />
        <EndDatePicker />
        <VisitType />
      <FacilitySelect />
        <InsurranceSelect />
        <CptCodeSelect />
        <TotalVistInput />
        <UsedVistInput />
        <RemainingVisitInput />
        <ProviderInput />
        <IcdCodeSelect />
        <StatusSelect />
        <AttachmentButton />
      </Grid>
      <SaveButton />
    </FormContainer>
  )
}

export { AddReferralForm }
