'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from '../patient-lookup/actions'
import { SchemaType } from './organization-users-list-filter-form'

const PracticeSelect = () => {
  const { id } = useParams<{ id: string }>()
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState(true)
  const [practicesOptions, setPracticesOptions] = useState<SelectOptionType[]>(
    [],
  )
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getPracticesOptionsAction({
        payload: {
          organizationId: id,
        },
      })

      if (response.state === 'error') {
        setLoading(false)
        return
      }

      setPracticesOptions(response.data)
      setLoading(false)
    })()
  }, [])

  const practices = form.watch('practices')
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <MultiSelectField
        options={practicesOptions}
        defaultValues={practices}
        onChange={(values) => form.setValue('practices', values)}
        className="min-w-[112px] flex-1"
        loading={loading}
        disabled={loading}
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
