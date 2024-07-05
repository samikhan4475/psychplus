import { Select } from '@psychplus/ui/select'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { useState } from 'react'
import { PatientPreferredPartner } from '../types'

const TableCellSelector = ({
    row: {original: preferredPartner}, name
}: PropsWithRow<PatientPreferredPartner> & { name: string }) => {
  const [value, setValue] = useState(preferredPartner[name as keyof PatientPreferredPartner] as string)
  const options = [
    'Primary',
    'Secondary',
    'Tertiary'
  ]

  const updateSelection = (value: string | undefined) => {
    if(value) setValue(value)
  }

  return (
      <Select.Root
        value={value}
        size="2"
        name={name}
        onValueChange={updateSelection}
      >
        <Select.Trigger variant='ghost' className='w-[100%]' />
        <Select.Content>
          {options.map((option) => (
            <Select.Item value={option} key={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
  )
}

export { TableCellSelector }
