'use client'
import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

interface RoleSelectProps {
  userActorCategory: string
}

const RoleSelect = ({ userActorCategory }: RoleSelectProps) => {
  const options = [{ label: userActorCategory, value: userActorCategory }]

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Role</FormFieldLabel>
      <SelectInput
        options={options}
        field="userActorCategory"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        disabled
      />
    </FormFieldContainer>
  )
}

export { RoleSelect }

