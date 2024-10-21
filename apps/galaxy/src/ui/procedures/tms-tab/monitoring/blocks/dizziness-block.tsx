import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsDizzinessBlock.dizziness'

const BLOCK_TITLE = 'Dizziness'

const DizzinessBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const dizziness = form.watch('tmsDizzinessBlock.dizziness')
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {dizziness === 'yes' && (
        <TextAreaInput field="dizziness.details" className="h-full w-full" />
      )}
    </>
  )
}

export default DizzinessBlock;
