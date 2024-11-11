import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsFatigueBlock'
const BLOCK_TITLE = 'Fatigue'

const FatigueBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const fatigue = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {fatigue === 'yes' && (
        <TextAreaInput
          field="tmsFatigueBlockDetail"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default FatigueBlock
