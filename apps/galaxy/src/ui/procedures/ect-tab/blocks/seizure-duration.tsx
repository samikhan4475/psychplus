import {
  FormFieldContainer,
  FormFieldLabel,
  SelectableChipDetails,
} from '@/components'

const SeizureDuration = () => {
  return (
    <FormFieldContainer className="flex w-auto flex-row gap-2">
      <FormFieldLabel className="text-[12px]" required>
        Seizure Duration
      </FormFieldLabel>
      <SelectableChipDetails
        label="Duration"
        type="number"
        field="ectSeizureDuration"
        showIndicator={false}
        format="###"
        placeHolder="000"
      />
    </FormFieldContainer>
  )
}

export { SeizureDuration }
