import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, TextAreaInput } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const OtherBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()
  const adverseEventQuestion = form.watch('adverseEventQuestion')
  const eventResultedIn = form.watch('eventResultedIn')

  return (
    adverseEventQuestion === 'yes' &&
    eventResultedIn === 'Other' && (
      <>
        <BlockLabel required className="text-2 font-medium">
          Other
        </BlockLabel>
        <TextAreaInput
          field="otherText"
          placeHolder="Describe what happened to the patient as a result of the serious adverse event."
          className="w-[100%]"
        />
        <FormFieldError name="otherText" />
      </>
    )
  )
}

export { OtherBlock }
