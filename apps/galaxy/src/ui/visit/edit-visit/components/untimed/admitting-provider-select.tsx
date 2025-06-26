import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StaffCredentials } from '@/constants'
import { useHasPermission } from '@/hooks'
import { SelectOptionType } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { EDIT_ADMITTING_PROVIDER } from '@/ui/visit/constants'
import { getProviders } from '../../../client-actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'

const AdmittingProviderSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { services } = useEditVisitStore()
  const [location, service] = useWatch({
    control: form.control,
    name: ['location', 'service'],
  })
  const canChangeAdmittingProvider = useHasPermission('editAdmittingProvider')

  useEffect(() => {
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
      if (res.state === 'error') {
        toast.error(res.error || 'Failed to fetch providers')
        return setOptions([])
      }
      setOptions(
        res.data.map((provider: Provider) => ({
          value: `${provider.id}`,
          label: `${provider.firstName} ${provider.lastName}, ${
            provider?.honors ?? ''
          }`,
        })),
      )
    })
  }, [location, service, services])

  return (
    <FormFieldContainer>
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={EDIT_ADMITTING_PROVIDER}
      />
      <FormFieldLabel required>Admitting Provider</FormFieldLabel>
      <SelectInput
        field="admittingProvider"
        disabled={isPsychiatristVisitTypeSequence}
        options={options}
        buttonClassName="h-6 w-full"
        loading={loading}
        onValueChange={(value) => {
          if (canChangeAdmittingProvider) {
            return form.setValue('admittingProvider', value, {
              shouldDirty: true,
            })
          }
          setIsOpen(true)
        }}
      />
      <FormFieldError name={'admittingProvider'} />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelect }
