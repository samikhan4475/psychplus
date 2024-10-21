import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsScalpDiscomfortBlock.scalpDiscomfort'
const BLOCK_TITLE = 'Scalp Discomfort'

const ScalpBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const scalpDiscomfort = form.watch('tmsScalpDiscomfortBlock.scalpDiscomfort')
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {scalpDiscomfort === 'yes' && (
        <TextAreaInput
          field="tmsScalpDiscomfortBlock.details"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default ScalpBlock
