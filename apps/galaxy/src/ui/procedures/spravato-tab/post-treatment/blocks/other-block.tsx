import { useFormContext } from 'react-hook-form'
import { BlockLabel, TextAreaInput } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const OtherBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const postTreatmentTransportation = form.watch('postTreatmentTransportation')

  return (
    postTreatmentTransportation === 'Other' && (
      <>
        <BlockLabel className="text-2 font-medium">Other</BlockLabel>
        <TextAreaInput className="w-[80%]" field="othertransportation" />
      </>
    )
  )
}

export { OtherBlock }
