'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { OPTIONS } from './constant'
import { PropsWithIndex } from './types'

const StatusField = ({ index }: PropsWithIndex) => {
  const { setValue, watch } = useFormContext()
  const field = `allergies.${index}.status`
  const currentStatus = watch(field)

  useEffect(() => {
    if (!currentStatus) {
      setValue(field, 'Active')
    }
  }, [currentStatus, field, setValue])

  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="Status">Status</BlockLabel>
      <SelectInput
        field={field}
        options={OPTIONS}
        className="w-full"
        buttonClassName="flex-1"
      />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { StatusField }
