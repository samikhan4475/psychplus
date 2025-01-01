import React from 'react'
import { Text } from '@radix-ui/themes'
import { FormFieldContainer, TextAreaInput } from '@/components'
import { PatientReferralsWidget } from '@/ui/referrals'
import { useStore } from '../../../store'

const ReferralBlock = () => {
  const { patientId } = useStore((state) => ({
    patientId: state.patientId,
  }))

  return (
    <FormFieldContainer>
      <Text className="text-2 font-medium">Referral</Text>
      <TextAreaInput field="referralDetail" className="h-full w-full" />
      <PatientReferralsWidget
        patientId={patientId}
        hideHeader
        isTabView={false}
      />
    </FormFieldContainer>
  )
}

export default ReferralBlock
