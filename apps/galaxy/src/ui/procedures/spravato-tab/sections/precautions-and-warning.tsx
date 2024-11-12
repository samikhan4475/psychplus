import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CheckboxInput, FormFieldContainer, YesNoSelect } from '@/components'
import { SectionHeading } from '@/ui/procedures/spravato-tab/sections/section-heading'
import { AlertMessage } from './alert-message'
import {
  PRECAUTION_OPTIONS,
  RADIO_BUTTON_OPTIONS,
} from './precaution-warning-options'
import { RadioButton } from './radio-button'

const PrecautionsAndWarningSection = () => {
  const [alertMessage, setAlertMessage] = useState({
    open: false,
    message: '',
  })

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
            <RadioButton
              key={item.field}
              field={item.field}
              label={item.label}
              message={item.message}
              setAlertMessage={setAlertMessage}
            />
          ))}
        </Flex>

        {PRECAUTION_OPTIONS.map((option) => (
          <CheckboxInput
            key={option.field}
            label={option.label}
            field={option.field}
            labelClassName="max-w-max"
            defaultChecked
            onCheckedChange={(checked) =>
              setAlertMessage({
                open: !checked,
                message: option.message,
              })
            }
          />
        ))}
      </Flex>
      <AlertMessage
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
    </FormFieldContainer>
  )
}

export { PrecautionsAndWarningSection }
