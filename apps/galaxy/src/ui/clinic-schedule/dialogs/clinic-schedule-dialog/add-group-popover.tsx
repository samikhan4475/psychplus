import { useFieldArray, useFormContext } from 'react-hook-form'
import * as MultiSelectPopover from './multiselect-popover'
import { SchemaType } from './schema'

const groups = [
  'Child (5 yo to 12 yo)',
  'Adolescent (13 yo to 17 yo)',
  'Adult (18 yo to 54 yo',
]

const AddAgeGroupPopover = () => {
  const { watch } = useFormContext<SchemaType>()
  const { append } = useFieldArray({
    name: 'groups',
  })

  const groupsAdded = watch('groups')

  const isGroupAdded = (value: string) =>
    !!groupsAdded.find((group) => group.group === value)

  return (
    <MultiSelectPopover.Root>
      <MultiSelectPopover.Placeholder>
        Select Groups
      </MultiSelectPopover.Placeholder>
      <MultiSelectPopover.List>
        {groups.map((group) => (
          <MultiSelectPopover.Item
            key={group}
            onSelect={() =>
              isGroupAdded(group) ? null : append({ group: group })
            }
            disabled={!!isGroupAdded(group)}
            display={group}
          />
        ))}
      </MultiSelectPopover.List>
    </MultiSelectPopover.Root>
  )
}

export { AddAgeGroupPopover }
