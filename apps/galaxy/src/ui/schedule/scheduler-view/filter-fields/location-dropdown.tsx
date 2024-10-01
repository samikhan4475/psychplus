'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldLabel, SelectInput } from '@/components'
import { getStateClinicsOptionsAction } from '../../actions'
import { FormFieldContainer } from '../../shared'

const LocationDropdown = () => {
  const [clinicLocations, setClinicLocations] = useState<
    { label: string; value: string }[]
  >([])
  const form = useFormContext()
  const stateId = form.watch('state')

  useEffect(() => {
    if (stateId) {
      getStateClinicsOptionsAction(stateId).then((response) => {
        if (response.state === 'error') {
          toast.error('Failed ot fetch clinic locations')
        }
        setClinicLocations(response.state === 'error' ? [] : response.data)
      })
    }
  }, [stateId])

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="location"
        placeholder="Select"
        options={clinicLocations}
        disabled={!stateId}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
