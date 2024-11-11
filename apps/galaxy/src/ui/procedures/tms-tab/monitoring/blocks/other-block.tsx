import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsOtherBlock'
const BLOCK_TITLE = 'Other'

const OtherBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const other = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {other === 'yes' && (
        <TextAreaInput field="tmsOtherBlockDetail" className="h-full w-full" />
      )}
    </>
  )
}

export default OtherBlock
