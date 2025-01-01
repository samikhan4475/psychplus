import { useMemo } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const InsuranceVerificationSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const codes = useCodesetCodes(CODESETS.BillingVerificationStatus)
  const options = useMemo(
    () =>
      codes
        .toSorted((a, b) => {
          const aValue =
            a.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          const bValue =
            b.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? 0
          return +aValue - +bValue
        })
        .map((item) => ({
          label: item.display,
          value: item.value,
        })),
    [codes],
  )

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>VIS</FormFieldLabel>
      <SelectInput
        options={options}
        field="insuranceVerificationStatus"
        disabled={isPsychiatristVisitTypeSequence}
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { InsuranceVerificationSelect }
