import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'
import { transformProviderTypes } from '../util'

const ProviderTypeDropdown = ({ isDisabled }: { isDisabled?: boolean }) => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const { services } = useAddVisitStore()
  const serviceId = useWatch({
    control: form.control,
    name: 'service',
  })

  const options = useMemo(() => {
    const service = services.find((s) => s.id === serviceId)
    if (!service?.serviceOffered) return []

    return transformProviderTypes(codes, service)
  }, [codes, services, serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <SelectInput
        field="providerType"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={isDisabled}
      />
      <FormFieldError name={'providerType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
