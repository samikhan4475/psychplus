import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'
import { AddVitalButton } from './add-vital-button-block'
import useAddVitals from './use-add-vitals'

const VitalSignsAddButton = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const vitalSigns = form.watch('vitalSigns')
  const { buttonConfig, disableButton, generateVitalMessages } = useAddVitals(
    vitalSigns,
    form,
  )

  return (
    <Flex direction="column" gap="2">
      {Object.values(buttonConfig).map((item, index) => (
        <AddVitalButton
          key={`${index + 1}`}
          {...item}
          disabled={
            index !== Object.values(buttonConfig).length - 1 || disableButton
          }
          generateVitalButtons={generateVitalMessages}
        />
      ))}
    </Flex>
  )
}

export { VitalSignsAddButton }
