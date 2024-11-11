import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsScalpDiscomfortBlock'
const BLOCK_TITLE = 'Scalp Discomfort'

const ScalpBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const scalpDiscomfort = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {scalpDiscomfort === 'yes' && (
        <TextAreaInput
          field="tmsScalpDiscomfortBlockDetail"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default ScalpBlock
