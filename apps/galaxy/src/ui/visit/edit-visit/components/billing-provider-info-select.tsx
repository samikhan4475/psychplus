import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { BillingProviderInfo } from '../../add-visit/types'
import { getProviders } from '../../client-actions'
import { SchemaType } from '../schema'

type BillingProviderOptionType = {
  label: string
  value: string
  id?: number
  staffKey: string
}

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

      const staffKey = `${type}-${staffId}`

      const newOption: BillingProviderOptionType = {
        label: `${newProvider.firstName} ${newProvider.lastName}, ${
          newProvider.honors ?? ''
        } - ${newProvider.phoneContact ?? ''}`,
        value: type,
        id: +staffId,
        staffKey,
      }

      setBillingProviderOptions((prevOptions) => {
        const filteredOptions = prevOptions.filter(
          (option) =>
            option.staffKey !== staffKey &&
            option.value !== type &&
            option.label !== newOption.label,
        )
        return [...filteredOptions, newOption]
      })

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
        field="billingProviderType"
        loading={loading}
        options={billingProviderOptions}
      />
      <FormFieldError name="billingProviderType" />
    </FormFieldContainer>
  )
}

export { BillingProviderInfoPhoneNum }
