import { PreferredPartnerFiltersSchemaType } from './blocks/schema'

export const getInitialValues = (): PreferredPartnerFiltersSchemaType => ({
  userName: '',
  mrn: '',
  dateFrom: null,
  dateTo: null,
})

export const getCodesetOptions = (
  codeset: { label: string; value: string }[],
) => {
  return codeset.map((option: { value: string }) => ({
    value: option.value,
    label: option.value,
  }))
}
