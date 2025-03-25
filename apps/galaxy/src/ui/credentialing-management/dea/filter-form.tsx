import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/ui/visit/utils'
import { getCalendarDateLabel } from '@/utils'
import { schema, SchemaType } from '../schema'
import { AlertSelect } from '../shared/alert-select'
import { ClearFilterFormButton } from '../shared/clear-filter-form-button'
import { EndDateField } from '../shared/end-date-input'
import { LicenseText } from '../shared/license-text'
import { ProviderSelect } from '../shared/provider-select'
import { StartDateField } from '../shared/start-date-input'
import { StateSelect } from '../shared/state-select'
import { StatusSelect } from '../shared/status-select'
import { SubmitFormButton } from '../shared/submit-form-button'
import { transformFilters } from '../transform'
import { Filters, LicenseType } from '../types'
import { useStore } from './store'

const DEAFilterForm = () => {
  const { search } = useStore((state) => ({ search: state.search }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      providerStaffId: '',
      state: '',
      licenseNumber: '',
      startDate: undefined,
      endDate: undefined,
      status: '',
      isAlert: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const sanitizedData = transformFilters(data, LicenseType.DEA)
    return search(sanitizedData, 1, true)
  }

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset()
    return search({} as Filters, 1, true)
  }

  return (
    <FormContainer
      className="bg-white flex-none flex-row flex-wrap gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      onSubmit={onSubmit}
      form={form}
    >
      <ProviderSelect />
      <StateSelect />
      <StatusSelect />
      <LicenseText />
      <StartDateField />
      <EndDateField />
      <AlertSelect />
      <ClearFilterFormButton onClear={onClear} />
      <SubmitFormButton />
    </FormContainer>
  )
}

export { DEAFilterForm, type SchemaType }
