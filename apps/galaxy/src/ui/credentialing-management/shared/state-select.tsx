import { useMemo } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const StateSelect = ({ isCDSTab = false }: { isCDSTab?: boolean }) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  const stateOptions = useMemo(() => {
    let codeOptions = [...codes]
    if (isCDSTab) {
      codeOptions = codeOptions.filter(
        (code) =>
          code?.attributes?.find((attr) => attr?.name === 'CDS')?.value ===
          'true',
      )
    }
    codeOptions.unshift({ value: 'NotSet', display: 'Select' })
    return codeOptions.map((code) => ({
      value: code.value,
      label: code.display,
    }))
  }, [])
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>State</FormFieldLabel>
      <SelectInput
        field="state"
        size="1"
        options={stateOptions}
        buttonClassName="h-6 w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
