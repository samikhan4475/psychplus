import { Select } from '@psychplus/ui/select'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { LinkAccount } from '../types'
import { useState } from 'react'

const TableCellSelector = ({
    row: {original: linkAccount}, name
}: PropsWithRow<LinkAccount> & { name: string }) => {
  const [value, setValue] = useState(linkAccount[name as keyof LinkAccount])
  const options = [
    'test',
    'test 1',
    'test 2',
    'test 3',
    'test 4',
    'Primary',
    'Secondary',
    'Teritiary'
  ]

  const updateSelection = (value: string) => {
    setValue(value)
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
