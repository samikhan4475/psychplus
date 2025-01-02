'use client'

import { Flex, Select } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { SchedulingHistoryData } from '../types'

const AdmittingProviderCell = ({
  row,
}: PropsWithRow<SchedulingHistoryData>) => {
  return (
    <Flex p="1" width="100%">
      <Select.Root defaultValue="John Smith, MD" size="1">
        <Select.Trigger className={buttonClassName} placeholder="Select" />
        <Select.Content highContrast position="popper" align="center">
          {options?.map(({ label, value }) => (
            <Select.Item value={value} key={label}>
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
const options = [
  {
    label: 'John Smith, MD',
    value: 'John Smith, MD',
  },
  {
    label: 'test',
    value: 'test',
  },
]
const buttonClassName =
  'border-pp-gray-2 w-full h-4 rounded-2 text-[11px] border border-solid !outline-none [box-shadow:none]'
export { AdmittingProviderCell }
