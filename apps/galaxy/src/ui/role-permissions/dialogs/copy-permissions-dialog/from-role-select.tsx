'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getRoleOptionsAction } from '../../actions'

const FromRoleSelect = () => {
  const form = useFormContext()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const practiceId = form.watch('fromPracticeId')
  const userId = form.watch('fromUserId')

  useEffect(() => {
    ;(async () => {
      if (practiceId && userId) {
        setDisabled(false)
        setLoading(true)
        const result = await getRoleOptionsAction({
          userId,
          practiceId,
        })
        if (result.state === 'success') {
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [practiceId, userId])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Role</FormFieldLabel>
      <SelectInput
        field="fromRoleId"
        options={organizations}
        loading={loading}
        disabled={disabled}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
      />
      <FormFieldError name="fromRoleId" />
    </FormFieldContainer>
  )
}

export { FromRoleSelect }
