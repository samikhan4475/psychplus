import { useCallback, useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ActionResult } from '@/api'
import { AsyncSelect, BlockLabel, FormFieldError } from '@/components'
import { getLabsLocation } from '../api'
import { LabOrderSchemaType } from '../lab-order-schema'
import { LabsLocation } from './types'

type Options = {
  label: string
  value: string
  data: LabsLocation
}

const LabsLocationDropdown = () => {
  const form = useFormContext<LabOrderSchemaType>()
  const labOrderId = form.watch('labOrderId')

  const [labLocations, setLabLocations] = useState<Options[]>([])

  const fetchOptions: () => Promise<ActionResult<Options[]>> =
    useCallback(async () => {
      const response = await getLabsLocation({
        recordStatuses: ['Active'],
      })
      if (response.state === 'success') {
        const dropdownValues = response.data.map((item: LabsLocation) => ({
          label: item.name ?? '',
          value: item.id ?? '',
          data: item,
        }))
        setLabLocations(dropdownValues)
        return Promise.resolve({
          state: 'success',
          data: dropdownValues ?? [],
        })
      }
      return Promise.resolve({ state: 'success', data: [] })
    }, [])

  useEffect(() => {
    if (!labOrderId) {
      const questLab = labLocations.find((item) => item?.label === 'Quest')
      if (questLab) {
        form.setValue('labLocation', questLab?.value)
        form.setValue('labLocationData', questLab?.data)
      }
    }
  }, [labLocations, labOrderId])

  return (
    <Flex direction="row" gap="1" className="flex-1">
      <BlockLabel required>Lab Location</BlockLabel>
      <AsyncSelect
        field="labLocation"
        fetchOptions={fetchOptions}
        buttonClassName="w-[231px] h-7"
        onValueChange={(value) => {
          form.setValue('labLocation', value)
          form.setValue(
            'labLocationData',
            labLocations.find((e: Options) => e.value === value)?.data,
          )
        }}
      />
      <FormFieldError name="labLocation" />
    </Flex>
  )
}

export { LabsLocationDropdown }
