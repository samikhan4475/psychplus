import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitMediumDropdown = () => {
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const options = codes.map((code) => ({
    label: code.display,
    value: code.value,
  }))
  const { filters } = useFiltersContext()

  if (!filters.includes(SchedulerFilters.VisitMedium)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <DropdownSelect field="visitMediums" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { VisitMediumDropdown }
