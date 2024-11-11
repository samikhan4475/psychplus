import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsSeizureBlock'
const BLOCK_TITLE = 'Seizure'

const SeizureBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const seizure = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {seizure === 'yes' && (
        <TextAreaInput
          field="tmsSeizureBlockDetail"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default SeizureBlock
