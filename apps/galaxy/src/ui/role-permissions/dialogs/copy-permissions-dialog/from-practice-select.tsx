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

const FromPracticeSelect = () => {
  const form = useFormContext()
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const organizationId = form.watch('fromOrganizationId')

  useEffect(() => {
    ;(async () => {
      if (organizationId) {
        setDisabled(false)
        setLoading(true)
        const result = await getAllPracticesOptionsListAction({
          payload: {
            organizationId,
          },
        })
        if (result.state === 'success') {
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [organizationId])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Practice</FormFieldLabel>
      <SelectInput
        field="fromPracticeId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        loading={loading}
        disabled={disabled}
      />
      <FormFieldError name="fromPracticeId" />
    </FormFieldContainer>
  )
}

export { FromPracticeSelect }
