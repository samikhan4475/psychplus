import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getProviders } from '../../../actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'

const AdmittingProviderSelector = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [location, patient, state, service] = useWatch({
    control: form.control,
    name: ['location', 'patient', 'state', 'service'],
  })
  const isDisabled = !patient || !state || !service || !location
  useEffect(() => {
    form.setValue('admittingProvider', '')
    if (!location) return
    setLoading(true)
    getProviders({
      locationIds: [location],
    }).then((res) => {
      setLoading(false)
      if (res.state === 'error') return setOptions([])
      setOptions(
        res.data.map((provider: Provider) => ({
          label: `${provider.firstName} ${provider.lastName}`,
          value: `${provider.id}`,
        })),
      )
    })
  }, [location])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Admitting Provider</FormFieldLabel>
      <SelectInput
        field="admittingProvider"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={isDisabled}
        loading={loading}
      />
      <FormFieldError name={'admittingProvider'} />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelector }
