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
import { Filters } from '../types'
import { useStore } from './store'

const LicenseFilterForm = () => {
  const { search } = useStore((state) => ({ search: state.search }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      endDate: undefined,
      licenseNumber: '',
      providerStaffId: '',
      startDate: undefined,
      state: '',
      status: '',
      isAlert: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = ({ state, ...rest }) => {
    const { isAlert, startDate, endDate, ...restPayload } = rest
    let alertStatus
    if (isAlert === 'Yes') {
      alertStatus = true
    } else if (isAlert === 'No') {
      alertStatus = false
    }

    const payload = {
      ...restPayload,
      isAlert: alertStatus,
      stateCodes: state ? [state] : undefined,
      startDate: startDate ? getCalendarDateLabel(startDate) : undefined,
      endDate: endDate ? getCalendarDateLabel(endDate) : undefined,
      statuses: restPayload.status ? [restPayload.status] : undefined,
    }
    const sanitizedData = sanitizeFormData(payload) as Filters
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
      form={form}
      onSubmit={onSubmit}
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

export { LicenseFilterForm, type SchemaType }
