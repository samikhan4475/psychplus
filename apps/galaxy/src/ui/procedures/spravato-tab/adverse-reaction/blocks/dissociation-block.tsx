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

const DissociationBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const dissociation = form.watch('dissociation')
  const symptomsResolved = form.watch('dissociationSymptomsResolved')

  return (
    <>
      <YesNoSelect
        isNoFirst
        label="Dissociation"
        field="dissociation"
        required
      />
      {dissociation === 'yes' && (
        <>
          <FormFieldContainer className="flex-row items-center gap-1">
            <FormFieldLabel className="text-[12px]" required>
              Indicate the onset of symptoms from the start of administration
            </FormFieldLabel>
            <RadioSelectSection
              field="dissociationOnsetOfSymptoms"
              options={ONSET_OF_SYMPTOMS_OPTIONS}
            />
            <FormFieldError name="dissociationOnsetOfSymptoms" />
          </FormFieldContainer>
          <YesNoSelect
            isNoFirst
            required
            label="Did symptoms resolve within 2-hours of administration?"
            field="dissociationSymptomsResolved"
          />
          {symptomsResolved === 'no' && (
            <FormFieldContainer className="flex-row items-center gap-1">
              <BlockLabel required>
                If greater than 2-hours, specify time since administration
              </BlockLabel>
              <NumberInput
                field="dissociationTimeSinceAdministration"
                label=""
                autoFocus
                format="###"
                placeholder="000"
              />
              <FormFieldError name="dissociationTimeSinceAdministration" />
            </FormFieldContainer>
          )}
        </>
      )}
    </>
  )
}

export { DissociationBlock }
