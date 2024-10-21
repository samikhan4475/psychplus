import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsOtherBlock.other'
const BLOCK_TITLE = 'Other'

const OtherBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const other = form.watch('tmsOtherBlock.other')
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {other === 'yes' && (
        <TextAreaInput
          field="tmsOtherBlock.details"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default OtherBlock;
