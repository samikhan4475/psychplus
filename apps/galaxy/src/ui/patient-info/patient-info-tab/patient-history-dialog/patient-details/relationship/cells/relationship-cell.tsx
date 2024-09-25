'use client'

import { Select } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DummyRelationship } from '../relationship-table'

const RelationshipCell = ({
  row: {
    original: { relationship },
  },
}: PropsWithRow<DummyRelationship>) => {
  return (
    <Select.Root defaultValue={relationship} size="1">
      <Select.Trigger className="h-4 w-full px-0 !outline-none [box-shadow:none] data-[disabled]:!bg-gray-3 data-[disabled]:!text-gray-11" />
      <Select.Content position="popper" highContrast>
        {options.map(({ label, value }, idx) => (
          <Select.Item value={value} key={`${value}-${idx}`}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

const options = [
  {
    label: 'Father',
    value: 'father',
  },
  {
    label: 'Son',
    value: 'son',
  },
]
export { RelationshipCell }
