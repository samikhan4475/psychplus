import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StaffCredentials } from '@/constants'
import { SelectOptionType } from '@/types'
import { getProviders } from '../../../client-actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'

const AdmittingProviderSelector = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { services } = useAddVisitStore()
  const [location, patient, state, service] = useWatch({
    control: form.control,
    name: ['location', 'patient', 'state', 'service'],
  })
  const isDisabled = !patient || !state || !service || !location
  useEffect(() => {
    form.setValue('admittingProvider', '')
    if (!location || !service) return

    const serviceData = services.find((s) => s.id === service)
    if (!serviceData?.serviceOffered) return
    setLoading(true)
    getProviders({
      locationIds: [location],
      honors: [StaffCredentials.MD, StaffCredentials.DO],
      isIncludeProvidersForServicePrimaryProviderType: true,
      servicesOffered: serviceData?.serviceOffered,
    }).then((res) => {
      setLoading(false)
      if (res.state === 'error') return setOptions([])
      setOptions(
        res.data.map((provider: Provider) => ({
          label: `${provider.firstName} ${provider.lastName}, ${
            provider?.honors ?? ''
          }`,
          value: `${provider.id}`,
        })),
      )
    })
  }, [location, service])

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
