import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsSeizureBlock.seizure'
const BLOCK_TITLE = 'Seizure'

const SeizureBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const seizure = form.watch('tmsSeizureBlock.seizure')
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {seizure === 'yes' && (
        <TextAreaInput
          field="tmsSeizureBlock.details"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default SeizureBlock;
