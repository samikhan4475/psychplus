import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { getLabsLocation } from '../api'
import { LabOrderSchemaType } from '../lab-order-schema'
import { LabsLocation } from './types'

const LabsLocationDropdown = () => {
  const form = useFormContext<LabOrderSchemaType>()

  const [labLocations, setLabsLocations] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      const response: any = await getLabsLocation({
        recordStatuses: ['Active'],
      })
      if (response.data && response.data.length > 0) {
        const dropdownValues = response.data.map((item: LabsLocation) => ({
          label: item.name,
          value: item.locationId,
          data: item,
        }))
        setLabsLocations(dropdownValues)
      }
    })()
  }, [])

  return (
    <Flex direction="column" gap="1" className="flex-1">
      <BlockLabel required>Lab Location</BlockLabel>
      <SelectInput
        field="labLocation"
        options={labLocations}
        buttonClassName="flex-1 w-[144px] h-7"
        onValueChange={(value) => {
          form.setValue('labLocation', value)
          form.setValue(
            'labLocationData',
            labLocations.find((e: any) => e.value === value)?.data,
          )
        }}
      />
      <FormFieldError name="labLocation" />
    </Flex>
  )
}

export { LabsLocationDropdown }
