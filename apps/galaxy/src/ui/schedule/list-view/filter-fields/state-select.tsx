'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getUsStatesOptionsAction } from '@/actions'
import { MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const StateSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const [stateOptions, setStateOptions] = useState<SelectOptionType[]>([])
  const states = form.watch('stateIds')

  useEffect(() => {
    getUsStatesOptionsAction().then((response) => {
      if (response.state === 'error') {
        toast.error(
          response.error ? response.error : 'Error fetching US states',
        )
        return setStateOptions([])
      }
      setStateOptions(response.data)
    })
  }, [])

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>State</FieldLabel>
      <MultiSelectField
        defaultValues={states}
        options={stateOptions}
        className="flex-1"
        menuClassName="w-[155px]"
        onChange={(values) =>
          form.setValue('stateIds', values, { shouldDirty: true })
        }
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
