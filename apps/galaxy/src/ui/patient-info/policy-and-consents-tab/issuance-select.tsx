'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from './store'

const IssuanceSelect = () => {
  const consents = useStore((state) => state.consents)

  const uniqueIssuanceDates = consents
    ? [
        ...new Map(
          consents
            .filter((consent) => consent.issuanceDate) // Filter out empty issuanceDate
            .map((consent) => [
              consent.issuanceDate,
              {
                value: consent.issuanceDate,
                label: consent.issuanceDate,
              },
            ]),
        ).values(),
      ]
    : []

  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Issuance Date</FormFieldLabel>
      <SelectInput
        field="issuanceDate"
        placeholder="Select"
        buttonClassName="border-pp-gray-2 w-[143px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={uniqueIssuanceDates}
      />
    </FormFieldContainer>
  )
}
export { IssuanceSelect }
