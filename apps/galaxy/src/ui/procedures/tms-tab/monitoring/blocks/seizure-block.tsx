import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsSeizureBlock'
const BLOCK_TITLE = 'Seizure'

const SeizureBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const seizure = form.watch(BLOCK_ID)
  return (
    <Flex direction={'column'} gap={'1'}>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} isNoFirst required/>
      {seizure === 'yes' && (
        <Flex gap={'1'} direction={'column'}>
          <FormFieldLabel required>
            Measures taken to address this adverse reaction
          </FormFieldLabel>
          <TextAreaInput
            field="tmsSeizureBlockDetail"
            className="h-full w-full"
          />
        </Flex>
      )}
    </Flex>
  )
}

export default SeizureBlock
