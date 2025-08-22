'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const MemberIdField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Member ID</FormFieldLabel>
      <TextInput
        field="memberId"
        className="h-6 w-full"
        disabled
        placeHolder="Member Id"
      />
      <FormFieldError name="memberId" />
    </FormFieldContainer>
  )
}

export { MemberIdField }
