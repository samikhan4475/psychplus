import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import * as MultiSelectPopover from './multiselect-popover'
import { SchemaType } from './schema'

const AddTelestatePopover = () => {
  const stateCodes = useCodesetCodes(CODESETS.UsStates).filter(
    (code) => code.value !== 'NotSet',
  )
  const [searchValue, setSearchValue] = useState<string>('')
  const states = Array.from(stateCodes, (code) => ({
    name: code.display,
    location: '',
    cosigner: '',
  }))
  const { watch } = useFormContext<SchemaType>()
  const { append } = useFieldArray({
    name: 'telestates',
  })

  const telestatesAdded = watch('telestates')

  const isStateAdded = (value: string) =>
    !!telestatesAdded.find((state) => state.name === value)

  return (
    <MultiSelectPopover.Root>
      <MultiSelectPopover.SearchBar onSearch={setSearchValue} />
      <MultiSelectPopover.Placeholder>
        Select States
      </MultiSelectPopover.Placeholder>
      <MultiSelectPopover.List>
        {states
          .filter((state) => {
            if (!searchValue) return true
            return state.name.toLowerCase().includes(searchValue.toLowerCase())
          })
          .map((state) => (
            <MultiSelectPopover.Item
              key={state.name}
              display={state.name}
              onSelect={() =>
                isStateAdded(state.name) ? null : append(state)
              }
              disabled={!!isStateAdded(state.name)}
            />
          ))}
      </MultiSelectPopover.List>
    </MultiSelectPopover.Root>
  )
}

export { AddTelestatePopover }
