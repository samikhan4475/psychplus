import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  CheckboxInput,
  DatePickerInput,
  SelectInput,
  TextInput,
} from '@/components'
import { useStore } from '../../store'
import { SearchDrugsBlock } from './search-drugs-block'

interface Option {
  label: string
  value: string
}

const SITE_LOCATIONS = [
  { label: 'Right Upper Arm', value: 'right_upper_arm' },
  { label: 'Left Upper Arm', value: 'left_upper_arm' },
  { label: 'Right Thigh', value: 'right_thigh' },
  { label: 'Left Thigh', value: 'left_thigh' },
  { label: 'Right Buttocks', value: 'right_buttocks' },
  { label: 'Left Buttocks', value: 'left_buttocks' },
  { label: 'Right Hip', value: 'right_hip' },
  { label: 'Left Hip', value: 'left_hip' },
]

const InjectionBlock = () => {
  const { selectedDrug } = useStore()
  const form = useFormContext()
  const { watch } = form

  const manufacturersList = selectedDrug
    ? selectedDrug?.manufacturer.map((item) => ({ label: item, value: item }))
    : []

  const dosesList: Option[] = selectedDrug
    ? selectedDrug?.doses.map((item) => ({ label: item, value: item }))
    : []

  return (
    <Flex
      direction="column"
      pt="1"
      pb="2"
      px="2"
      className="rounded-3 border border-gray-7"
    >
      <Flex align="center" gap="2">
        <CheckboxInput field="injection" checked={form.watch('injection')} />
        <Text className="cursor-default" weight="medium">
          Injection
        </Text>
      </Flex>
      {watch('injection') && (
        <Flex align="center" gap="2" wrap="wrap">
          <SearchDrugsBlock />
          <SelectInput
            label={'Dose'}
            field={'dose'}
            options={dosesList}
            buttonClassName="flex-1"
            className="w-[25%]"
            required={true}
          />
          <SelectInput
            label={'Site Locations'}
            field={'siteLocations'}
            options={SITE_LOCATIONS}
            buttonClassName="flex-1"
            className="w-[25%]"
            required={true}
          />
          <SelectInput
            label={'Manufacturer'}
            field={'manufacturer'}
            options={manufacturersList}
            buttonClassName="flex-1"
            className="w-[25%]"
            required={true}
            disabled={!watch('drugName')}
          />

          <TextInput label="Lot Number" field="lotNumber" />
          <Flex gap="2">
            <BlockLabel>Expiration Date</BlockLabel>
            <DatePickerInput
              field="expirationDate"
              dateInputClass="h-6 w-[100px]"
              className="flex flex-row items-center gap-2"
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export { InjectionBlock }
