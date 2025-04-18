import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectCell } from '@/components'
import { useStore } from '@/ui/clinic-schedule/clinic-time-tab/store'
import { SchemaType } from '../schema'

const CosignerSelectCell = ({ index }: { index: number }) => {
  const { setValue, watch } = useFormContext<SchemaType>()
  const { stateWithLocationAndCosigners } = useStore((store) => ({
    stateWithLocationAndCosigners: store.stateWithLocationAndCosigners,
  }))
  const stateCode = watch(`teleStates.${index}.stateCode`)
  const teleStateLocation = watch(`teleStates.${index}.location`)
  const cosigner = watch(`teleStates.${index}.cosignerStaffId`)
  const options =
    stateWithLocationAndCosigners
      ?.find((state) => state.stateCode === stateCode)
      ?.locationsWithCosigners?.find(
        (location) => location.location.id.toString() === teleStateLocation,
      )
      ?.cosigners?.map((cosigner) => ({
        label: `${cosigner.legalName.firstName} ${cosigner.legalName.lastName}, ${cosigner.legalName.honors}`,
        value: String(cosigner.id),
      })) ?? []
  const cosignerFound = options.find(
    (option) => option.value === String(cosigner),
  )
  const handleAddCosigner = (e: string) => {
    setValue(`teleStates.${index}.cosignerStaffId`, Number(e))
  }
  useEffect(() => {
    if (!cosignerFound && cosigner) {
      setValue(`teleStates.${index}.cosignerStaffId`, undefined)
    }
  }, [cosignerFound, index, setValue, cosigner])
  return (
    <SelectCell
      value={String(cosigner)}
      options={options}
      onValueChange={handleAddCosigner}
    />
  )
}

export { CosignerSelectCell }
