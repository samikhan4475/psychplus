import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, CodesetSelect, TextAreaInput } from '@/components'
import { CODESETS } from '@/constants'
import { TmsWidgetSchemaType } from '../../../tms-widget-schema'

const TreatmentParameterAdjustments = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const treatmentParameter = form.watch('treatmentParameter')
  return (
    <>
      <Flex direction="row" gap="1" align="center">
        <BlockLabel required>Treatment Parameter Adjustments</BlockLabel>
        <CodesetSelect
          name="treatmentParameter"
          codeset={CODESETS.ParameterAdjustmentStatus}
          size="1"
          className="max-w-44"
        />
      </Flex>
      {treatmentParameter === 'AdjustmentsMade' && (
        <TextAreaInput
          field="treatmentAdjustmentDetail"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export { TreatmentParameterAdjustments }
