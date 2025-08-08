import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getProviders } from '../../client-actions'
import { SchemaType } from '../schema'
import { BillingProviderInfo } from '../types'

type BillingProviderOptionType = { label: string; value: string; id?: number }

const BillingProviderInfoPhoneNum = () => {
  const [billingProviderOptions, setBillingProviderOptions] = useState<
    BillingProviderOptionType[]
  >([])
  const [loading, setLoading] = useState(false)

  const form = useFormContext<SchemaType>()

  const [billingProviderInfo, setbillingProviderInfo] = useState<
    Record<string, BillingProviderOptionType[]>
  >({
    [BillingProviderInfo.PROVIDER]: [],
    [BillingProviderInfo.COSIGNER]: [],
    [BillingProviderInfo.PRACTICE]: [],
  })
  const [cosignerId, provider, location, providerType] = form.watch([
    'cosignerId',
    'provider',
    'location',
    'providerType',
  ])
  const fetchProviderInfo = (staffId: string, type: BillingProviderInfo) => {
    setLoading(true)
    getProviders({
      locationIds: [location],
      providerType,
      staffIds: [staffId],
    }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        return toast.error('Failed to fetch provider')
      }

      const newProvider = res.data[0]
      if (!newProvider) return
      const newOption = {
        label: `${newProvider.firstName} ${newProvider.lastName}, ${
          newProvider.honors ?? ''
        } - ${newProvider.phoneContact ?? ''}`,
        value: type,
      }

      const filteredOptions = billingProviderOptions.filter(
        (option) =>
          option.value !== newOption.value && newOption.label !== option.label,
      )
      setBillingProviderOptions([...filteredOptions, newOption])

      setbillingProviderInfo((prev) => ({
        ...prev,
        [type]: [...prev[type]],
      }))
    })
  }
  useEffect(() => {
    if (
      provider &&
      location &&
      providerType &&
      !billingProviderInfo[BillingProviderInfo.PROVIDER]?.some(
        (p) => p.id === +provider,
      )
    ) {
      fetchProviderInfo(provider, BillingProviderInfo.PROVIDER)
    }
  }, [provider])

  useEffect(() => {
    if (
      cosignerId &&
      location &&
      providerType &&
      !billingProviderInfo[BillingProviderInfo.COSIGNER]?.some(
        (p) => p.id === +cosignerId,
      )
    ) {
      fetchProviderInfo(cosignerId, BillingProviderInfo.COSIGNER)
    }
  }, [cosignerId])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Billing Provider Info & Phone #</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="billingProviderInfo"
        loading={loading}
        disabled={billingProviderOptions?.length === 0}
        options={billingProviderOptions}
      />
      <FormFieldError name="billingProviderInfo" />
    </FormFieldContainer>
  )
}

export { BillingProviderInfoPhoneNum }
