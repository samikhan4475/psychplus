'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import {
  transformInOptions,
  transformInPOSOptions,
} from '@/ui/location/service/transform'

const PosSelect = () => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce)
  const options = transformInPOSOptions(codes)

  return (
    <FormFieldContainer>
      <FormFieldLabel>POS</FormFieldLabel>
      <SelectInput
        field="placeOfService"
        options={transformInOptions(options)}
        placeholder="Select"
        size="1"
        buttonClassName='w-full'
      />
    </FormFieldContainer>
  )
}

export { PosSelect }
