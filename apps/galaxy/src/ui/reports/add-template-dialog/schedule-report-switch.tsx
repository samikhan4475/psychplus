'use client'

import { FormFieldContainer } from '@/components'
import { Flex, Switch, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const ScheduleReportSwitch = () => {
  const form = useFormContext()

  return (
    <Flex
      className="w-[40%] rounded-[4px] bg-pp-bg-accent px-2 py-1.5"
      justify="between"
      align="center"
    >
      <FormFieldContainer className="flex-row gap-1.5 justify-between w-full">
        <Text className='text-pp-black-3' size="1" weight="medium">
          Is this schedule report
        </Text>
        <Text as="label" size="1">
          <Flex className="gap-1.5">
            <Switch
              size="1"
              color="blue"
              checked={form.watch('isSchedule')}
              onCheckedChange={(checked) => form.setValue('isSchedule', checked)}
            />
            Yes
          </Flex>
        </Text>
      </FormFieldContainer>
    </Flex>
  )
}

export default ScheduleReportSwitch
