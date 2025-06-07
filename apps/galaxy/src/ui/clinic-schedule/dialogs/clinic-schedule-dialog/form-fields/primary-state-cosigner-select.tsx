import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getServiceCosigners } from '@/ui/clinic-schedule/clinic-time-tab/actions'
import { useStore } from '@/ui/clinic-schedule/clinic-time-tab/store'
import { SchemaType } from '../schema'

const PrimaryStateCosigner = () => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const serviceId = watch('serviceId')
  const primaryStateCosigner = watch('cosignerStaffId')
  const cosignerName = watch('cosignerName')
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const staff = useStore((state) => state.staff)

  const handleAddCosigner = (value: string) => {
    const selectedCosigner = options.find((el) => el.value === value)
    if (!selectedCosigner) return
    setValue('cosignerStaffId', selectedCosigner.value)
    setValue('cosignerName', selectedCosigner.label)
  }

  useEffect(() => {
    if (!serviceId) {
      primaryStateCosigner && setValue('cosignerStaffId', '')
      cosignerName && setValue('cosignerName', '')
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
      <FormFieldLabel className="text-[12px]">
        Primary State Cosigner
      </FormFieldLabel>
      <SelectInput
        key={JSON.stringify(options)}
        buttonClassName="w-full h-6"
        field="cosignerStaffId"
        disabled={!serviceId}
        loading={loading}
        options={options}
        onValueChange={handleAddCosigner}
      />
    </FormFieldContainer>
  )
}

export { PrimaryStateCosigner }
