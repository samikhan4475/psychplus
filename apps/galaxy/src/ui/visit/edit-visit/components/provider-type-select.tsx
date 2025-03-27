import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { transformProviderTypes } from '../../add-visit/util'
import { SchemaType } from '../schema'
import { useEditVisitStore } from '../store'

const ProviderTypeSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const { services, setUserId } = useEditVisitStore()
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const codesetOptions = useCodesetOptions(CODESETS.ProviderType, undefined, [
    CODE_NOT_SET,
  ])
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
        options={isServiceTimeDependent ? options : codesetOptions}
        buttonClassName="h-6 w-full"
        onValueChange={(val) => {
          form.setValue('providerType', val, {
            shouldDirty: true,
          })
          form.setValue('provider', '')
          setUserId(0)
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
