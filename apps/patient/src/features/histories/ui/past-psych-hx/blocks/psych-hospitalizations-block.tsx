import { NumberInput } from '@/components-v2'

const PsychHospitalizationsBlock = () => {
  return (
    <NumberInput
      format="##"
      label="Psych Hospitalizations"
      field="psychHospitalizations"
      className="h-8 w-full rounded-6 border border-gray-8 px-2 py-1"
    />
  )
}

export { PsychHospitalizationsBlock }
