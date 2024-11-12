import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, TextAreaInput } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const AdverseEventTextBoxBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const adverseEventQuestion = form.watch('adverseEventQuestion')

  return (
    adverseEventQuestion === 'yes' && (
      <>
        <BlockLabel required className="text-[14px] font-medium">
          Adverse Event (if applicable)
        </BlockLabel>
        <TextAreaInput
          field="adverseEventText"
          placeHolder="Indicate what the adverse event was."
          className="w-[100%]"
        />
        <FormFieldError name="adverseEventText" />
      </>
    )
  )
}

export { AdverseEventTextBoxBlock }
