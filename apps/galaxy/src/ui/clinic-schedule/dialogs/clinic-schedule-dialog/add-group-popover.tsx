import { useFieldArray, useFormContext } from 'react-hook-form'
import { GROUP_OPTIONS } from '../../constants'
import * as MultiSelectPopover from './multiselect-popover'
import { SchemaType } from './schema'

const AddAgeGroupPopover = () => {
  const { watch } = useFormContext<SchemaType>()
  const { append } = useFieldArray({
    name: 'groups',
  })
  const groupsAdded = watch('groups')

  const isGroupAdded = (value: string) =>
    !!groupsAdded.find((group) => group.toLowerCase() === value.toLowerCase())

  return (
    <MultiSelectPopover.Root>
      <MultiSelectPopover.Placeholder>
        Select Groups
      </MultiSelectPopover.Placeholder>
      <MultiSelectPopover.List>
        {GROUP_OPTIONS.map((group) => (
          <MultiSelectPopover.Item
            key={group.value}
            onSelect={() =>
              isGroupAdded(group.value) ? null : append(group.value)
            }
            disabled={!!isGroupAdded(group.value)}
            display={group.label}
          />
        ))}
      </MultiSelectPopover.List>
    </MultiSelectPopover.Root>
  )
}

export { AddAgeGroupPopover }
