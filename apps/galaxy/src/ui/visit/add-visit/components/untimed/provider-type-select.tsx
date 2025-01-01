import { useFormContext, useWatch } from 'react-hook-form'
import { SchemaType } from '../../schema'
import { ProviderTypeDropdown } from '../provider-type-select'

const ProviderTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const [
    patient,
    state,
    service,
    location,
    dateOfAdmission,
    admittingProvider,
  ] = useWatch({
    control: form.control,
    name: [
      'patient',
      'state',
      'service',
      'location',
      'dateOfAdmission',
      'admittingProvider',
    ],
  })
  const isDisabled =
    !patient ||
    !state ||
    !service ||
    !location ||
    !dateOfAdmission ||
    !admittingProvider

  return <ProviderTypeDropdown isDisabled={isDisabled} />
}

export { ProviderTypeSelect }
