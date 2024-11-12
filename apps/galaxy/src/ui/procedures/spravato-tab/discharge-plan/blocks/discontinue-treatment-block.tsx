import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, TextAreaInput } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'

const DiscontinueTreatmentBlock = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const plan = form.watch('plan')

  return (
    plan.includes('Discontinue Treatment') && (
      <Flex
        className="mt-2 gap-2 rounded-3 border border-gray-7 p-2"
        direction="column"
      >
        <BlockLabel className="text-2 font-[600px]">
          Discontinue Treatment
        </BlockLabel>
        <TextAreaInput field="discontinueTreatment" className="w-[80%]" />
      </Flex>
    )
  )
}

export { DiscontinueTreatmentBlock }
