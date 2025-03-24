'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { transformInOptions, transformInPOSOptions } from '../transform'

const PosSelect = () => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce)
  const options = transformInPOSOptions(codes)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>POS</FormFieldLabel>
      <SelectInput
        field="servicePlace"
        options={transformInOptions(options)}
        placeholder="Select"
        size="1"
        buttonClassName="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { PosSelect }
