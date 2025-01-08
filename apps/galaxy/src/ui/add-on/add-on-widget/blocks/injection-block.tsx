'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  CheckboxInput,
  DatePickerInput,
  SelectInput,
  TextInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { codesetAttributesOptions } from '@/utils'

const InjectionBlock = () => {
  const form = useFormContext()
  const { watch } = form

  const injectionAddonCodeset = useCodesetCodes(CODESETS.InjectionAddon)
  const injectionSiteCodeset = useCodesetCodes(CODESETS.InjectionSite)

  const injectionAddonOptions = injectionAddonCodeset.map(
    ({ display, value }) => ({
      label: display,
      value: value,
    }),
  )

  const injectionSiteOptions = injectionSiteCodeset.map(
    ({ display, value }) => ({
      label: display,
      value: value,
    }),
  )
  const selectedDrug = form.watch('drugName')

  const selectedDrugAttributes = injectionAddonCodeset.find(
    (item) => item.value === selectedDrug,
  )

  const dosesList = codesetAttributesOptions({
    attribute: 'Doses',
    splitter: '|',
    codeset: selectedDrugAttributes,
  })

  const manufacturersList = codesetAttributesOptions({
    attribute: 'Manufacturer',
    splitter: '|',
    codeset: selectedDrugAttributes,
  })

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
          <SelectInput
            label="Drug Name"
            field={'drugName'}
            options={injectionAddonOptions}
            buttonClassName="flex-1"
            className="min-w-[15%]"
            required={true}
          />
          <SelectInput
            label={'Dose'}
            field={'dose'}
            options={dosesList}
            buttonClassName="flex-1"
            className="min-w-[15%]"
            required={true}
          />
          <SelectInput
            label={'Site Locations'}
            field={'siteLocations'}
            options={injectionSiteOptions}
            buttonClassName="flex-1"
            className="min-w-[15%]"
            required={true}
          />
          <SelectInput
            label={'Manufacture'}
            field={'manufacturer'}
            options={manufacturersList}
            buttonClassName="flex-1"
            className="min-w-[15%]"
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
