import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsHeadacheBlock.headache'
const BLOCK_TITLE = 'Headache'

const HeadacheBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const headache = form.watch('tmsHeadacheBlock.headache')
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {headache === 'yes' && (
        <TextAreaInput field="tmsHeadacheBlock.details" className="h-full w-full" />
      )}
    </>
  )
}

export default HeadacheBlock;
