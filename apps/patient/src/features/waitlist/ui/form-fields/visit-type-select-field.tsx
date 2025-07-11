import React, { useEffect } from 'react'
import { CODESETS, ServiceOffered } from '@psychplus-v2/constants'
import { useFormContext } from 'react-hook-form'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'
import { useCodesetCodes } from '@/providers'
import { useStore } from '../../store'
import { WaitlistSchemaType } from '../waitlist-form'

const VisitTypeSelectField = () => {
  const form = useFormContext<WaitlistSchemaType>()
  const { setProviders, staff, setProviderLoading } = useStore()
  const visitTypes = useCodesetCodes(CODESETS.ServicesOffered)
    .filter((item) =>
      [ServiceOffered.Psychiatry, ServiceOffered.Therapy].includes(
        item.value as ServiceOffered,
      ),
    )
    .map((item) => ({
      ...item,
      display: item.value,
    }))

  useEffect(() => {
    const visitType = form.watch('serviceOffered')

    if (visitType) {
      setProviderLoading(true)
      const visitTypeCode = visitType === 'Psychiatry' ? 1 : 2
      const filteredProviders = staff?.filter(
        (provider) => provider.staffRoleCode === String(visitTypeCode),
      )
      const currentProviderId = Number(form.getValues('providerId'))
      if (
        !filteredProviders.some((provider) => provider.id === currentProviderId)
      ) {
        form.setValue('providerId', '')
      }
      setProviders(filteredProviders)
      setProviderLoading(false)
    }
  }, [form.watch('serviceOffered')])

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <CodesetFormSelect size="3" name="serviceOffered" options={visitTypes} />
      <FormFieldError name="serviceOffered" />
    </FormFieldContainer>
  )
}

export { VisitTypeSelectField }
