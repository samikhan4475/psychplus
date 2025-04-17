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
import { getAllPracticesOptionsListAction } from '../../actions'

const FromStaffSelect = () => {
  const form = useFormContext()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const practiceId = form.watch('fromPracticeId')

  useEffect(() => {
    ;(async () => {
      if (practiceId) {
        setDisabled(false)
        setLoading(true)
        const result = await getAllPracticesOptionsListAction({
          payload: {
            practiceId,
            includeUsers: true,
          },
        })
        if (result.state === 'success') {
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [practiceId])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Staff Members</FormFieldLabel>
      <SelectInput
        field="fromUserId"
        options={organizations}
        loading={loading}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        disabled={disabled}
      />
      <FormFieldError name="fromUserId" />
    </FormFieldContainer>
  )
}

export { FromStaffSelect }
