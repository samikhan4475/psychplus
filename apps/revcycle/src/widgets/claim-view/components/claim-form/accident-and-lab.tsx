'use client'

import { useEffect, useState } from 'react'
import { Checkbox, Flex, Grid, Text } from '@radix-ui/themes'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { useStore } from '../../store'
import { SchemaType } from './add-claim-form'

// Define a type for valid form field names
type FormFieldName =
  | 'accidentDate'
  | 'isEmployment'
  | 'isAutoAccident'
  | 'isOtherAccident'
  | 'isOutsideLab'
  | 'accidentState'
  | 'accidentType'
  | 'labCharges'
  | 'clinicalLaboratoryImprovementAmendmentsNumber';
  
const AccidentAndLab = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  const accidentTypeCode = useStore((state) => state.accidentTypeCodesets)
  const usaStates = useStore((state) => state.usaStatesCodeSets)
  const accidentDate = useWatch({ control: form.control, name: 'accidentDate' })
  const isEmployment = useWatch({ control: form.control, name: 'isEmployment' })
  const isAutoAccident = useWatch({ control: form.control, name: 'isAutoAccident' })
  const isOtherAccident = useWatch({control: form.control,name: 'isOtherAccident'})
  const isOutsideLab = useWatch({control: form.control,name: 'isOutsideLab'})

  const [date, setDate] = useState<Date | undefined>(() => {
    return accidentDate ? new Date(accidentDate) : undefined
  })

  useEffect(() => {
    if (accidentDate) {
      setDate(new Date(accidentDate))
    } else {
      setDate(undefined)
    }
  }, [accidentDate])

  const handleChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    form.setValue(`accidentDate`, selectedDate ?? new Date())
  }

  const handleCheckboxChange = (fieldName: FormFieldName) => {
    const currentValue = form.getValues(fieldName);
    form.setValue(fieldName, !currentValue);
  }

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
          onSelect={handleChange}
          placeholder="mm/dd/yyyy"
          dateFormat="MM/dd/yyyy"
        />
      </Flex>

      <FormSelect
        label="Accident State"
        placeholder="Default Value"
        required={false}
        {...form.register('accidentState')}
        options={usaStates}
      />

      <FormSelect
        label="Accident Type"
        placeholder="Default Value"
        required={false}
        {...form.register('accidentType')}
        options={accidentTypeCode.map((r) => ({
          label: r.display,
          value: r.code,
        }))}
      />
      <FormTextInput
        type="text"
        label="Lab Charges"
        placeholder="0"
        data-testid="add-fee-schedule-name-input"
        className="relative px-1 text-right"
        {...form.register('labCharges')}
      />

      <FormTextInput
        type="text"
        label="CLIA #"
        data-testid="add-fee-schedule-name-input"
        {...form.register('clinicalLaboratoryImprovementAmendmentsNumber')} // needed to update with clianum
      />
      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox
            checked={isEmployment ?? false}
            onCheckedChange={() => handleCheckboxChange('isEmployment')}
          />
          New Employment
        </Flex>
      </Text>

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox
            checked={isAutoAccident ?? false}
            onCheckedChange={() => handleCheckboxChange('isAutoAccident')}
          />{' '}
          Auto Accident
        </Flex>
      </Text>

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox
            checked={isOtherAccident ?? false}
            onCheckedChange={() => handleCheckboxChange('isOtherAccident')}
          />
          Other Accident
        </Flex>
      </Text>

      <Text as="label" size="2" weight="bold">
        <Flex gap="2">
          <Checkbox
            checked={isOutsideLab ?? false}
            onCheckedChange={() => handleCheckboxChange('isOutsideLab')}
          />
          Outside Lab
        </Flex>
      </Text>
    </Grid>
  )
}

export { AccidentAndLab }
