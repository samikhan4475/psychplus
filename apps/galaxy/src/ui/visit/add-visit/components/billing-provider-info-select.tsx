import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getPracticeOptionsAction } from '@/ui/staff-management/actions'
import { BillingProviderInfo } from '../../add-visit/types'
import { getProviders } from '../../client-actions'
import { SchemaType } from '../schema'

type BillingProviderOptionType = {
  label: string
  value: string
  id?: number | string
}

const BillingProviderInfoPhoneNum = () => {
  const [loading, setLoading] = useState(false)
  const [fetchedInfo, setFetchedInfo] = useState<
    Record<string, BillingProviderOptionType[]>
  >({
    [BillingProviderInfo.PROVIDER]: [],
    [BillingProviderInfo.COSIGNER]: [],
    [BillingProviderInfo.PRACTICE]: [],
  })

  const form = useFormContext<SchemaType>()
  const [cosignerId, provider, practiceId, location, providerType] = form.watch(
    ['cosignerId', 'provider', 'practiceId', 'location', 'providerType'],
  )

  const fetchProviderInfo = async (
    staffId: string,
    type: BillingProviderInfo,
  ) => {
    setLoading(true)
    const res = await getProviders({
      locationIds: [location],
      providerType,
      staffIds: [staffId],
    })
    setLoading(false)

    if (res.state === 'error') return toast.error('Failed to fetch provider')

    const newProvider = res.data[0]

    if (!newProvider) return
    setFetchedInfo((prev) => ({
      ...prev,
      [type]: [
        {
          label: `${newProvider.firstName ?? ''} ${newProvider.lastName ?? ''}${
            newProvider.honors ? `, ${newProvider.honors}` : ''
          }`,
          value: type,
          id: newProvider.id,
        },
      ],
    }))
  }

  const fetchPracticeInfo = async (practiceId: string) => {
    setLoading(true)
    const res = await getPracticeOptionsAction({ payload: { practiceId } })
    setLoading(false)

    if (res.state === 'error') {
      toast.error('Failed to fetch practice')
      return
    }

    const practice = res.data[0]
    if (!practice) return

    setFetchedInfo((prev) => ({
      ...prev,
      [BillingProviderInfo.PRACTICE]: [
        {
          label: practice.label,
          value: BillingProviderInfo.PRACTICE,
          id: practice.value,
        },
      ],
    }))
  }

  useEffect(() => {
    if (
      provider &&
      location &&
      providerType &&
      !fetchedInfo[BillingProviderInfo.PROVIDER]?.some(
        (p) => String(p.id) === String(provider),
      )
    ) {
      fetchProviderInfo(provider, BillingProviderInfo.PROVIDER)
    }
    if (
      cosignerId &&
      location &&
      providerType &&
      !fetchedInfo[BillingProviderInfo.COSIGNER]?.some(
        (p) => String(p.id) === String(cosignerId),
      )
    ) {
      fetchProviderInfo(cosignerId, BillingProviderInfo.COSIGNER)
    }
    if (
      practiceId &&
      !fetchedInfo[BillingProviderInfo.PRACTICE]?.some(
        (p) => String(p.id) === String(practiceId),
      )
    ) {
      fetchPracticeInfo(practiceId)
    }
  }, [provider, cosignerId, practiceId, location, providerType])
  const billingProviderOptions = useMemo(() => {
    const selectedBillingProviderInfo = form.getValues('billingProviderInfo')
    const updatedInfo: typeof fetchedInfo = { ...fetchedInfo }

    if (cosignerId) updatedInfo[BillingProviderInfo.PROVIDER] = []
    if (!provider) updatedInfo[BillingProviderInfo.PROVIDER] = []
    if (!cosignerId) updatedInfo[BillingProviderInfo.COSIGNER] = []
    if (!practiceId) updatedInfo[BillingProviderInfo.PRACTICE] = []

    const opts: BillingProviderOptionType[] = []
    let nextValue = selectedBillingProviderInfo || ''

    if (updatedInfo[BillingProviderInfo.COSIGNER]?.length) {
      opts.push(...updatedInfo[BillingProviderInfo.COSIGNER])
    }
    if (updatedInfo[BillingProviderInfo.PROVIDER]?.length) {
      opts.push(...updatedInfo[BillingProviderInfo.PROVIDER])
    }
    if (updatedInfo[BillingProviderInfo.PRACTICE]?.length) {
      opts.push(...updatedInfo[BillingProviderInfo.PRACTICE])
    }

    if (
      updatedInfo[BillingProviderInfo.COSIGNER]?.length &&
      ((selectedBillingProviderInfo &&
        selectedBillingProviderInfo === BillingProviderInfo.PROVIDER) ||
        !selectedBillingProviderInfo)
    ) {
      nextValue = BillingProviderInfo.COSIGNER
    } else if (
      updatedInfo[BillingProviderInfo.PROVIDER]?.length &&
      !selectedBillingProviderInfo
    ) {
      nextValue = BillingProviderInfo.PROVIDER
    } else if (
      updatedInfo[BillingProviderInfo.PRACTICE]?.length &&
      !updatedInfo[BillingProviderInfo.PROVIDER]?.length &&
      !updatedInfo[BillingProviderInfo.COSIGNER]?.length &&
      !selectedBillingProviderInfo
    ) {
      nextValue = BillingProviderInfo.PRACTICE
    }

    if (
      (nextValue === BillingProviderInfo.PROVIDER && !provider) ||
      (nextValue === BillingProviderInfo.COSIGNER && !cosignerId) ||
      (nextValue === BillingProviderInfo.PRACTICE && !practiceId)
    ) {
      nextValue = ''
    }

    if (nextValue !== selectedBillingProviderInfo) {
      form.setValue('billingProviderInfo', nextValue)
    }

    return opts
  }, [fetchedInfo, provider, cosignerId, practiceId])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Billing Provider Info & Phone #</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="billingProviderInfo"
        loading={loading}
        disabled={billingProviderOptions.length === 0}
        options={billingProviderOptions}
      />
      <FormFieldError name="billingProviderInfo" />
    </FormFieldContainer>
  )
}

export { BillingProviderInfoPhoneNum }
