import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const PatientIsInRoomRadio = ({ isAdminView }: { isAdminView: boolean }) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'PatientIsInRoomOptions',
    valueKey: 'PatientIsInRoomValue',
  })
  return (
    <RadioGroup
      className="ml-2 border-none !bg-transparent"
      field="patientIsInRoom"
      defaultValue={watch('patientIsInRoom') ?? defaultValue}
      onValueChange={(val) => setValue('patientIsInRoom', val)}
      options={options}
      disabled={!isAdminView}
    />
  )
}

export { PatientIsInRoomRadio }
