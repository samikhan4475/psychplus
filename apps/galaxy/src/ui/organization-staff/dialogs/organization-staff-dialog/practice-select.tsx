'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticeOptionsAction } from '../../actions'
import { SchemaType } from './schema'

const PracticeSelect = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const organizationId = form.getValues('organizationIds')[0] ?? ''
      const response = await getPracticeOptionsAction({
        payload: {
          organizationId,
        },
      })
      if (response.state === 'success') {
        setOptions(response.data)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Practice</FormFieldLabel>
      <MultiSelectField
        disabled={loading}
        onChange={(vals) =>
          form.setValue('practiceIds', vals, {
            shouldDirty: true,
          })
        }
        defaultValues={form.watch('practiceIds')}
        options={options}
        loading={loading}
      />
      <FormFieldError name="practiceIds" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
