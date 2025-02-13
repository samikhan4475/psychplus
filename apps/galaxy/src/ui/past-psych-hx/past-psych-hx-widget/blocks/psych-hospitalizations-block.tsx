import { FormFieldError, NumberInput } from '@/components'

const PsychHospitalizationsBlock = () => {
  return (
    <>
    <NumberInput
      format="##"
      label="Psych Hospitalizations"
      field="psychHospitalizations"
      required
      />
    <FormFieldError name="psychHospitalizations" />
      </>
  )
}

export { PsychHospitalizationsBlock }
