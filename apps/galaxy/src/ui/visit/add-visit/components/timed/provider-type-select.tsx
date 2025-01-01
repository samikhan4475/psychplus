import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../../schema'
import { ProviderTypeDropdown } from '../provider-type-select'

const ProviderTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const service = form.watch('service')

  return <ProviderTypeDropdown isDisabled={!service} />
}

export { ProviderTypeSelect }
