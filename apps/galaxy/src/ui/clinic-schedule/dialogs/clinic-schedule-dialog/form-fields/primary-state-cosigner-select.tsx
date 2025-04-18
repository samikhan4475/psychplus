import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getServiceCosigners } from '@/ui/clinic-schedule/clinic-time-tab/actions'
import { useStore } from '@/ui/clinic-schedule/clinic-time-tab/store'
import { SchemaType } from '../schema'

const PrimaryStateCosigner = () => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const serviceId = watch('serviceId')
  const primaryStateCosigner = watch('primaryStateCosigner')
  const primaryStateCosignerName = watch('primaryStateCosignerName')
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const staff = useStore((state) => state.staff)

  const handleAddCosigner = (value: string) => {
    const selectedCosigner = options.find((el) => el.value === value)
    if (!selectedCosigner) return
    setValue('primaryStateCosigner', selectedCosigner.value)
    setValue('primaryStateCosignerName', selectedCosigner.label)
  }

  useEffect(() => {
    if (!serviceId) {
      primaryStateCosigner && setValue('primaryStateCosigner', '')
      primaryStateCosignerName && setValue('primaryStateCosignerName', '')
      return
    }
    const fetchCosigners = async () => {
      setLoading(true)
      setOptions([])
      const response = await getServiceCosigners({
        locationServiceIds: [serviceId],
      })
      if (response.state === 'error') {
        toast(response.error)
        return
      }

      setOptions(
        response.data
          .filter((el) => String(el.id) !== staff?.id)
          .map((el) => ({
            value: String(el.id),
            label: `${el.legalName.firstName} ${el.legalName.lastName}, ${el.legalName.honors}`,
            default: el.isDefaultCosigner,
          })),
      )
      setLoading(false)
    }
    fetchCosigners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Primary State Cosigner
      </FormFieldLabel>
      <SelectInput
        key={JSON.stringify(options)}
        buttonClassName="w-full h-6"
        field="primaryStateCosigner"
        disabled={!serviceId}
        loading={loading}
        options={options}
        onValueChange={handleAddCosigner}
      />
      <FormFieldError name="primaryStateCosigner" />
    </FormFieldContainer>
  )
}

export { PrimaryStateCosigner }
