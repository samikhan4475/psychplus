'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getUsStatesOptionsAction } from '../../client-actions'
import { SchemaType } from '../filter-actions-group'

const StateSelect = () => {
  const form = useFormContext<SchemaType>()
  const [stateOptions, setStateOptions] = useState<SelectOptionType[]>([])
  const stateIds = form.watch('stateIds')

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
    <FormFieldContainer className="flex-1 gap-x-1">
      <Flex className="flex-1 gap-x-1" align="center">
        <FormFieldLabel className="h-6">State</FormFieldLabel>
        <MultiSelectField
          defaultValues={stateIds}
          options={stateOptions}
          className="flex-1"
          menuClassName="w-[155px]"
          onChange={(values) => {
            form.setValue('stateIds', values, { shouldDirty: true })
            form.setValue('locationIds', [])
            form.setValue('serviceIds', [])
          }}
        />
      </Flex>
      <FormFieldError name="stateId" />
    </FormFieldContainer>
  )
}

export { StateSelect }
