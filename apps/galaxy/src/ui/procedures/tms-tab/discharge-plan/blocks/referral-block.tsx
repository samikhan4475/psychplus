import React from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { FormFieldContainer, TextAreaInput } from '@/components'
import { PatientReferralsWidget } from '@/ui/referrals'

const ReferralBlock = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <FormFieldContainer>
      <Text className="text-2 font-medium">Referral</Text>
      <TextAreaInput field="referralDetail" className="h-full w-full" />
      <PatientReferralsWidget patientId={id} hideHeader />
    </FormFieldContainer>
  )
}

export default ReferralBlock
