import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getProviders } from '../../../actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'

const AdmittingProviderSelect = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [location, nonTimeProviderType] = useWatch({
    control: form.control,
    name: ['location', 'nonTimeProviderType'],
  })

  useEffect(() => {
    form.resetField('admittingProvider')
    if (!location || !nonTimeProviderType) return
    getProviders({
      locationIds: [location],
      specialistType: nonTimeProviderType,
    }).then((res) => {
      if (res.state === 'error') {
        toast.error('Failed to fetch providers')
        return setOptions([])
      }
      setOptions(
        res.data.map((provider: Provider) => ({
          value: `${provider.id}`,
          label: `${provider.firstName} ${provider.lastName}`,
        })),
      )
    })
  }, [location, nonTimeProviderType])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Admitting Provider</FormFieldLabel>
      <SelectInput
        field="admittingProvider"
        options={options}
        buttonClassName="h-6 w-full"
      />
      <FormFieldError name={'admittingProvider'} />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelect }
