import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'
import { Flex } from '@radix-ui/themes'

const BLOCK_ID = 'tmsMuscleTwitchingBlock'
const BLOCK_TITLE = 'Muscle Twitching'

const MuscleBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const muscleTwitching = form.watch(BLOCK_ID)
  return (
    <Flex direction={'column'} gap={'1'}>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} isNoFirst />
      {muscleTwitching === 'yes' && (
        <Flex gap={'1'} direction={'column'}>
          <FormFieldLabel required>
            Measures taken to address this adverse reaction
          </FormFieldLabel>
          <TextAreaInput
            field="tmsMuscleTwitchingBlockDetail"
            className="h-full w-full"
          />
        </Flex>
      )}
    </Flex>
  )
}

export default MuscleBlock
