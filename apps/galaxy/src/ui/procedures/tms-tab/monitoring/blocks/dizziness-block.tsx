import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsDizzinessBlock'

const BLOCK_TITLE = 'Dizziness'

const DizzinessBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const dizziness = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} isNoFirst />
      {dizziness === 'yes' && (
        <TextAreaInput
          field="tmsDizzinessBlockDetail"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default DizzinessBlock
