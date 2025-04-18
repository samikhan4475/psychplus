import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectInput } from '@/components'
import { useStore } from '../../../clinic-time-tab/store'
import { SchemaType } from '../schema'

const LocationSelectCell = ({ index }: { index: number }) => {
  const { setValue, register, watch, formState } = useFormContext<SchemaType>()
  const stateCode = watch(`teleStates.${index}.stateCode`)
  const serviceOffered = watch('serviceOffered')
  const locationInput = watch(`teleStates.${index}.location`)
  const { stateWithLocationAndCosigners, fetchLocationWithCosigners } =
    useStore((store) => ({
      stateWithLocationAndCosigners: store.stateWithLocationAndCosigners,
      fetchLocationWithCosigners: store.fetchLocationWithCosigners,
    }))
  const stateFound = stateWithLocationAndCosigners?.find(
    (state) => state.stateCode === stateCode,
  )
  const teleStatesErrors = formState.errors.teleStates
  const highLightBorder = teleStatesErrors && !locationInput

  const locations = stateWithLocationAndCosigners
    ?.find((state) => state.stateCode === stateCode)
    ?.locationsWithCosigners.map((location) => ({
      label: location.location.name,
      value: String(location.location.id),
    }))

  const handleAddLocation = (e: string) => {
    setValue(`teleStates.${index}.location`, e)
  }

  useEffect(() => {
    if (stateFound) return
    fetchLocationWithCosigners(stateCode, [serviceOffered])
  }, [stateFound, serviceOffered, fetchLocationWithCosigners, stateCode])

  return (
    <SelectInput
      field={register(`teleStates.${index}.location`).name}
      options={locations}
      buttonClassName="h-6 w-full"
      onValueChange={handleAddLocation}
      className={`w-full rounded-2
        ${highLightBorder && 'border-pp-red-border border-2 border-solid'}
      `}
    />
  )
}

export { LocationSelectCell }
