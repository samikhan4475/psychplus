import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsScalpDiscomfortBlock'
const BLOCK_TITLE = 'Scalp Discomfort'

const ScalpBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const scalpDiscomfort = form.watch(BLOCK_ID)
  return (
    <Flex direction={'column'} gap={'1'}>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} isNoFirst required/>
      {scalpDiscomfort === 'yes' && (
        <Flex gap={'1'} direction={'column'}>
          <FormFieldLabel required>
            Measures taken to address this adverse reaction
          </FormFieldLabel>
          <TextAreaInput
            field="tmsScalpDiscomfortBlockDetail"
            className="h-full w-full"
          />
        </Flex>
      )}
    </Flex>
  )
}

export default ScalpBlock
