import { useEffect, useMemo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { useStore } from '@/ui/clinic-schedule/clinic-time-tab/store'
import { getClinicLocations } from '@/ui/visit/client-actions'
import { SchemaType } from '../schema'

const PrimaryLocationSelect = () => {
  const { setValue, resetField } = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [locations, setLocations] = useState<SelectOptionType[]>([])
  const { states } = useStore((store) => ({
    states: store.states,
  }))
  const stateCode = useWatch({
    name: 'primaryState',
  })
  const state = useMemo(
    () => states?.find((state) => state.stateCode === stateCode),
    [stateCode, states],
  )

  useEffect(() => {
    if (state?.stateId) {
      setLoading(true)
      resetField('primaryLocation')
      getClinicLocations(state?.stateId).then((res) => {
        setLoading(false)
        if (res.state === 'error') return setLocations([])
        setLocations(res.data)
      })
    }
  }, [state, resetField])

  const handleAddLocation = (newValue: string) => {
    const selectedLocation = locations.find(
      (location) => location.value === newValue,
    )
    if (!selectedLocation) return
    setValue('primaryLocation', selectedLocation.value)
    setValue('primaryLocationName', selectedLocation.label)
  }

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Primary Location
      </FormFieldLabel>
      <SelectInput
        field="primaryLocation"
        options={locations}
        buttonClassName="h-6 w-full"
        disabled={!stateCode}
        loading={loading}
        onValueChange={handleAddLocation}
      />
      <FormFieldError name="primaryLocation" />
    </FormFieldContainer>
  )
}

export { PrimaryLocationSelect }
