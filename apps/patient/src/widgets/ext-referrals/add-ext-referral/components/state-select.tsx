'use client'

import { useEffect } from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { useFormContext } from 'react-hook-form'
import { CodesetFormSelect, FormField } from '@/components-v2'
import { useUserLocation } from '@/hooks/use-user-location'
import { SchemaType } from './schema'

interface Props {
  googleAPIkey: string
}
const StateSelect = ({ googleAPIkey }: Props) => {
  const { setValue } = useFormContext<SchemaType>()

  const { zip, state } = useUserLocation(googleAPIkey)
  useEffect(() => {
    if (!state) return
    setValue('patientContactDetails.addresses.0.state', state)
    if (zip) {
      setValue('patientContactDetails.addresses.0.postalCode', zip)
    }
  }, [state, setValue])
  return (
    <FormField
      containerClassName="flex-1"
      name="patientContactDetails.addresses.0.state"
      label="State"
    >
      <CodesetFormSelect
        name="patientContactDetails.addresses.0.state"
        placeholder="Select"
        className={buttonClassName}
        codeset={CODESETS.UsStates}
        size="1"
      />
    </FormField>
  )
}

export { StateSelect }
const buttonClassName =
  'font-regular h-[38px] text-gray-12 text-2 w-full [&_span]:bg-red-500 bg-[white] border-pp-gray-2  border border-solid !outline-none [box-shadow:none]'
