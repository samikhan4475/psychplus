import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getProviders } from '../../../actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'

const AdmittingProviderSelector = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [facilityAdmissionId, providerType, location] = useWatch({
    control: form.control,
    name: ['facilityAdmissionId', 'providerType', 'location'],
  })

  useEffect(() => {
    if (location && providerType) {
      form.resetField('provider')
      getProviders({
        locationIds: [location],
        providerType: providerType,
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
  }, [location, providerType])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Admitting Provider</FormFieldLabel>

      <SelectInput
        field="admittingProvider"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!facilityAdmissionId}
      />
      <FormFieldError name={'admittingProvider'} />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelector }
