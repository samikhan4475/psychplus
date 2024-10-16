import { NumberInput } from '@/components'

const PsychHospitalizationsBlock = () => {
  return (
    <NumberInput
      format="##"
      label="Psych Hospitalizations"
      field="psychHospitalizations"
    />
  )
}

export { PsychHospitalizationsBlock }
