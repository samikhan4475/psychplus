'use client'

import { useState } from 'react'
import { Checkbox, Flex, Grid, Text } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { SchemaType } from './components/add-claim-form'
import ClaimFormSelect from './components/claim-form-select'

const options = [
  { label: 'Shahbaz MD', value: 'Shahbaz MD' },
  { label: 'Willow Brook', value: 'Willow Brook2' },
]

const AccidentAndLab = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <Grid columns="5" gap="2" rows="repeat(2)" width="auto">
      <Flex direction="column">
        <Text size="2" className="pb-1 font-bold">
          Accident Date
        </Text>
        <DatePicker
          color="gray"
          buttonClassName="justify-between text-left font-regular h-[36px]"
          reverse={true}
          date={date}
          onSelect={setDate}
        />
      </Flex>

      <ClaimFormSelect
        label="Accident State"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <ClaimFormSelect
        label="Accident Type"
        options={options}
        defaultValue="Shahbaz MD"
      />

      <FormTextInput
        type="text"
        label="Lab Charges"
        placeholder="0"
        data-testid="add-fee-schedule-name-input"
        className='relative text-right px-1'
        {...form.register('name')}
      />

      <FormTextInput
        type="text"
        label="CLIA #"
        data-testid="add-fee-schedule-name-input"
        {...form.register('name')}
      />

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox /> New Employment
        </Flex>
      </Text>

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox /> Auto Accident
        </Flex>
      </Text>

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox /> Other Accident
        </Flex>
      </Text>

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox /> Outside Lab
        </Flex>
      </Text>
    </Grid>
  )
}

export { AccidentAndLab }
