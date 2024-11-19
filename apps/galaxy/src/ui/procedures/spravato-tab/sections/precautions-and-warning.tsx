import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput, FormFieldContainer, YesNoSelect } from '@/components'
import { SectionHeading } from '@/ui/procedures/spravato-tab/sections/section-heading'
import { AlertMessage } from './alert-message'
import {
  PRECAUTION_OPTIONS,
  RADIO_BUTTON_OPTIONS,
} from './precaution-warning-options'

const PrecautionsAndWarningSection = () => {
  const form = useFormContext()

  return (
    <FormFieldContainer className="bg-white  p-2.5 shadow-2">
      <SectionHeading title="Precautions & Warnings" />
      <Flex gap="4" direction="column">
        <CheckboxInput
          label={
            'The patient was assessed to determine if they are currently taking any of the following medication(s) that may cause sedation or blood pressure changes:'
          }
          labelClassName="max-w-max"
          field={'medicationAssessment'}
          defaultChecked
          disabled
        />

        <Flex
          className="border-pp-gray-2 mx-4 rounded-2 border p-3"
          direction="column"
          gap="1"
        >
          {RADIO_BUTTON_OPTIONS.map((item) => (
            <Flex direction="column" gap="2" key={item.field}>
              <YesNoSelect
                isNoFirst
                field={item.field}
                label={item.label}
                required
              />
              {form.watch(item.field) === 'yes' && (
                <AlertMessage message={item.message} error={false} />
              )}
            </Flex>
          ))}
        </Flex>

        {PRECAUTION_OPTIONS.map((option) => (
          <Flex direction="column" gap="1" key={option.field}>
            <CheckboxInput
              label={option.label}
              field={option.field}
              labelClassName="max-w-max"
              defaultChecked
              onCheckedChange={(checked) =>
                form.setValue(option.field, `${checked}`)
              }
            />
            {form.watch(option.field) === 'false' && (
              <AlertMessage message={option.message} />
            )}
          </Flex>
        ))}
      </Flex>
    </FormFieldContainer>
  )
}

export { PrecautionsAndWarningSection }
