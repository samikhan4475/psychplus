import { NumberInput } from '@/components'

const SuicideAttemptsBlock = () => {
  return (
    <NumberInput
      format="##"
      label="Suicide Attempts"
      field="suicideAttempts"
      required
    />
  )
}

export { SuicideAttemptsBlock }
