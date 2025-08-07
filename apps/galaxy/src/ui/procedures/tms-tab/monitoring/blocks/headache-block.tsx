import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsHeadacheBlock'
const BLOCK_TITLE = 'Headache'

const HeadacheBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const headache = form.watch(BLOCK_ID)
  return (
    <Flex direction={'column'} gap={'1'}>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} isNoFirst required/>
      {headache === 'yes' && (
        <Flex gap={'1'} direction={'column'}>
          <FormFieldLabel required>
            Measures taken to address this adverse reaction
          </FormFieldLabel>
          <TextAreaInput
            field="tmsHeadacheBlockDetail"
            className="h-full w-full"
          />
        </Flex>
      )}
    </Flex>
  )
}

export default HeadacheBlock
