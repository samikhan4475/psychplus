import React from 'react'
import { Button, Flex, Select, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
const SubmissionOptions = [
  { label: 'Change HealthCare', value: 'Change HealthCare' },
  { label: 'Change Paper', value: 'Change Paper' },
]
const items = SubmissionOptions.map((option) => (
  <Select.Item key={option.value} value={option.value}>
    {option.label}
  </Select.Item>
))
const SubmissionSubmitField = () => {
  return (
    <Flex align={'center'} className="ml-auto">
      <Text size={'1'} weight={'bold'} mr={'1'}>Clearinghouse</Text>
      <Select.Root size="1">
        <Select.Trigger
          placeholder={'Submission Type'}
          title={'Submit Type'}
          className={cn('h-[var(--chip-height)]')}
        />
        <Select.Content position="popper" align="center" highContrast>
          {items}
        </Select.Content>
      </Select.Root>
      <Button
        variant="solid"
        size={'1'}
        highContrast
        className="disabled:text-white ml-1 h-[25px]  "
      >
        Submit
      </Button>
    </Flex>
  )
}
export { SubmissionSubmitField }
