import { NumberInput } from '@/components'

const PsychHospitalizationsBlock = () => {
  return (
    <NumberInput
      format="##"
      label="Psych Hospitalizations"
      field="psychHospitalizations"
      required
    />
  )
}

export { PsychHospitalizationsBlock }
