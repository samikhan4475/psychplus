import { NumberInput } from '@/components-v2'

const SuicideAttemptsBlock = () => {
  return (
    <NumberInput
      format="##"
      label="Suicide Attempts"
      field="suicideAttempts"
      className="h-8 w-full rounded-6 border border-gray-8 px-2 py-1"
    />
  )
}

export { SuicideAttemptsBlock }
