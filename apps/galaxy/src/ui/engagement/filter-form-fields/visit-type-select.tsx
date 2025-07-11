'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { Services } from '@/ui/location/service/types'

const VisitTypeSelect = () => {
  const visitTypes = useCodesetOptions(CODESETS.ServicesOffered).filter(
    (item) =>
      [Services.Psychiatry, Services.Therapy].includes(item.value as Services),
  )

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="serviceOffered"
        buttonClassName={buttonClassName}
        options={visitTypes}
      />
    </FormFieldContainer>
  )
}

const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]'

export { VisitTypeSelect }
