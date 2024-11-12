import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumberInput,
  RadioSelectSection,
  YesNoSelect,
} from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const ONSET_OF_SYMPTOMS_OPTIONS = [
  {
    label: '1-29 Minutes',
    value: '1-29 Minutes',
  },
  {
    label: '30-59 Minutes',
    value: '30-59 Minutes',
  },
  {
    label: '60-89 Minute',
    value: '60-89 Minute',
  },
  {
    label: '90-120 Minutes',
    value: '90-120 Minutes',
  },
]

const SedationBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const sedation = form.watch('sedation')
  const symptomsResolved = form.watch('sedationSymptomsResolved')

  return (
    <>
      <YesNoSelect isNoFirst label="Sedation" field="sedation" required />
      {sedation === 'yes' && (
        <>
          <FormFieldContainer className="flex-row items-center gap-1">
            <FormFieldLabel className="text-[12px]" required>
              Indicate the onset of symptoms from the start of administration
            </FormFieldLabel>
            <RadioSelectSection
              field="sedationOnsetOfSymptoms"
              options={ONSET_OF_SYMPTOMS_OPTIONS}
            />
            <FormFieldError name="sedationOnsetOfSymptoms" />
          </FormFieldContainer>
          <YesNoSelect
            isNoFirst
            required
            label="Did symptoms resolve within 2-hours of administration?"
            field="sedationSymptomsResolved"
          />
          {symptomsResolved === 'no' && (
            <FormFieldContainer className="flex-row items-center gap-1">
              <BlockLabel required>
                If greater than 2-hours, specify time since administration
              </BlockLabel>
              <NumberInput
                field="sedationTimeSinceAdministration"
                label=""
                autoFocus
                format="###"
                placeholder="000"
              />
              <FormFieldError name="sedationTimeSinceAdministration" />
            </FormFieldContainer>
          )}
        </>
      )}
    </>
  )
}

export { SedationBlock }
