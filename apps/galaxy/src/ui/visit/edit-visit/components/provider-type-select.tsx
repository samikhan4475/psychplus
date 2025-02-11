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
import { transformProviderTypes } from '../../add-visit/util'
import { ProviderType, ServiceType } from '../../types'
import { SchemaType } from '../schema'
import { useEditVisitStore } from '../store'

const ProviderTypeSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const { services } = useEditVisitStore()
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const [serviceId, isServiceTimeDependent] = useWatch({
    control: form.control,
    name: ['service', 'isServiceTimeDependent'],
  })

  const options = useMemo(() => {
    const service = services.find((s) => s.id === serviceId)
    if (!service?.serviceOffered) return []

    return transformProviderTypes(codes, service)
  }, [codes, serviceId, services])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <SelectInput
        options={options}
        buttonClassName="h-6 w-full"
        onValueChange={(val) => {
          form.setValue('providerType', val)
          form.setValue('provider', '')
        }}
        field="providerType"
        disabled={
          (!serviceId || !isServiceTimeDependent) &&
          !isPsychiatristVisitTypeSequence
        }
      />
      <FormFieldError name={'providerType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeSelect }
