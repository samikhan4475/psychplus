import { FormFieldError, NumberInput } from '@/components'

const SuicideAttemptsBlock = () => {
  return (
    <>
    <NumberInput format="##" label="Suicide Attempts" field="suicideAttempts" required />
    <FormFieldError name="suicideAttempts" />
    </>
  )
}

export { SuicideAttemptsBlock }
