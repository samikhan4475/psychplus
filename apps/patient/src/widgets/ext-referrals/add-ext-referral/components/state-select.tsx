'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { CODESETS } from '@psychplus-v2/constants'
import { useFormContext } from 'react-hook-form'
import { CodesetFormSelect, FormField } from '@/components-v2'
import { useUserLocation } from '@/hooks/use-user-location'
import { useCodesetCodes } from '@/providers'
import { SchemaType } from './schema'

interface Props {
  googleAPIkey: string
}
const StateSelect = ({ googleAPIkey }: Props) => {
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const { setValue } = useFormContext<SchemaType>()

  const { zip, state: detectedState } = useUserLocation(googleAPIkey)

  const searchParams = useSearchParams()
  const stateNameFromQuery = searchParams?.get('stateName')?.toLowerCase()
  
  const resolvedStateCode = useMemo(() => {
    if (!stateNameFromQuery || !stateCodes) return null

    const match = stateCodes.find(
      (code) => code.display?.toLowerCase() === stateNameFromQuery,
    )

    return match?.value ?? null
  }, [stateNameFromQuery, stateCodes])

  useEffect(() => {
    const effectiveState = resolvedStateCode || detectedState

    if (!effectiveState) return

    setValue('patientContactDetails.addresses.0.state', effectiveState)

    if (zip) {
      setValue('patientContactDetails.addresses.0.postalCode', zip)
    }
  }, [resolvedStateCode, detectedState, zip, setValue])
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
