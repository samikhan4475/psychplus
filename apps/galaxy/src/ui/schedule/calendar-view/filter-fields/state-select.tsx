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
import { CalenderViewSchemaType } from '../../types'

const StateSelect = () => {
  const form = useFormContext<CalenderViewSchemaType>()
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
    <FormFieldContainer className="flex-1 gap-x-1">
      <Flex className="flex-1 gap-x-1" align="center">
        <FormFieldLabel className="h-6">State</FormFieldLabel>
        <MultiSelectField
          defaultValues={states}
          options={stateOptions}
          className="flex-1"
          menuClassName="w-[155px]"
          onChange={(values) => {
            form.setValue('stateIds', values, { shouldDirty: true })
            form.setValue('locationIds', [])
            form.setValue('serviceIds', [])
            form.setValue('servicesOffered', [])
            form.setValue('unitIds', [])
            form.setValue('roomIds', [])
            form.setValue('groupIds', [])
          }}
        />
      </Flex>
      <FormFieldError name="stateIds" />
    </FormFieldContainer>
  )
}

export { StateSelect }
