import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getProviders } from '../../actions'
import { SchemaType } from '../../schema'
import { Provider } from '../../types'

const AdmittingProviderSelector = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const facilityAdmissionId = form.watch('facilityAdmissionId')

  const nonTimeProviderType = form.watch('nonTimeProviderType')
  const location = form.watch('location')

  useEffect(() => {
    if (location && nonTimeProviderType) {
      form.resetField('provider')
      getProviders({
        locationIds: [location],
      }).then((res) => {
        if (res.state === 'error') return setOptions([])
        setOptions(
          res.data.map((provider: Provider) => ({
            label: `${provider.firstName} ${provider.lastName}`,
            value: `${provider.id}`,
          })),
        )
      })
    }
  }, [location, nonTimeProviderType])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Admitting Provider</FormFieldLabel>

      <SelectInput
        field="admittingProvider"
        options={options}
        buttonClassName="flex-1"
        disabled={!facilityAdmissionId}
      />
      <FormFieldError name={'admittingProvider'} />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelector }
