import { FormFieldContainer, FormFieldLabel, SelectableChipDetails } from '@/components'

const SeizureDuration = () => {
  return (
    <FormFieldContainer className="w-auto flex flex-row gap-2">
      <FormFieldLabel className='text-[12px]' required>
        Seizure Duration
      </FormFieldLabel>
      <SelectableChipDetails label='Duration' type='number' field='ectSeizureDuration' showIndicator={false} />
    </FormFieldContainer>
  )
}

export { SeizureDuration }
