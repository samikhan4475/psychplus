import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useStore } from '../../clinic-time-tab/store'
import * as MultiSelectPopover from './multiselect-popover'
import { SchemaType, telestateType } from './schema'

const teleStatesAllowedAttributeName = 'IsServiceAllowedForTeleState'

const AddTelestatePopover = () => {
  const { states, fetchLocationsWithCosigners } = useStore((store) => ({
    states: store.states,
    fetchLocationsWithCosigners: store.fetchLocationWithCosigners,
  }))
  const [searchValue, setSearchValue] = useState<string>('')
  const { append } = useFieldArray({
    name: 'teleStates',
  })
  const { watch, setValue } = useFormContext<SchemaType>()
  const primaryState = watch('primaryState')
  const telestatesAdded = watch('teleStates')
  const serviceOffered = watch('serviceOffered')

  const stateCodes = useCodesetCodes(CODESETS.UsStates).filter(
    (code) =>
      states?.find((el) => el.stateCode === code.value) &&
      code.value !== primaryState,
  )
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const serviceNotAllowingTeleState = !serviceCodes
    .find((service) => service.value === serviceOffered)
    ?.attributes?.find(
      (att) =>
        att.name === teleStatesAllowedAttributeName && att.value === 'True',
    )

  const telestatesDisabled =
    !primaryState || !serviceOffered || !!serviceNotAllowingTeleState

  const teleStates = Array.from(stateCodes, (code) => ({
    stateName: code.display,
    stateCode: code.value,
    stateId:
      states?.find((state) => state.stateCode === code.value)?.stateId ?? '',
    location: '',
  }))

  const handleAddTelestate = (state: telestateType) => {
    if (isStateAdded(state.stateCode)) return
    append(state)
    fetchLocationsWithCosigners(state.stateCode, [serviceOffered])
  }

  const isStateAdded = (value: string) =>
    !!telestatesAdded?.find((state) => state.stateCode === value)

  useEffect(() => {
    if (!serviceOffered && telestatesAdded.length) {
      setValue('teleStates', [])
    }
  }, [serviceOffered, telestatesAdded, setValue])

  return (
    <MultiSelectPopover.Root disabled={telestatesDisabled}>
      <MultiSelectPopover.SearchBar onSearch={setSearchValue} />
      <MultiSelectPopover.Placeholder>
        Select States
      </MultiSelectPopover.Placeholder>
      <MultiSelectPopover.List>
        {teleStates
          .filter((state) => {
            if (!searchValue) return true
            return state.stateName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          })
          .map((state) => (
            <MultiSelectPopover.Item
              key={state.stateName}
              display={state.stateName}
              onSelect={() => handleAddTelestate(state)}
              disabled={!!isStateAdded(state.stateCode)}
            />
          ))}
      </MultiSelectPopover.List>
    </MultiSelectPopover.Root>
  )
}

export { AddTelestatePopover }
