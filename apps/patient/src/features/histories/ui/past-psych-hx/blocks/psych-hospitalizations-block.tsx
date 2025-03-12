import { NumberInput } from '@/components-v2'

const PsychHospitalizationsBlock = () => {
  return (
    <NumberInput
      format="##"
      label="Psych Hospitalizations"
      field="psychHospitalizations"
      required
      className="bg-pp-focus-bg-2 h-8 w-full rounded-2 border border-gray-8 bg-pp-gray-5 px-2 py-1"
    />
  )
}

export { PsychHospitalizationsBlock }
