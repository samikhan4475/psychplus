import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsHeadacheBlock'
const BLOCK_TITLE = 'Headache'

const HeadacheBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const headache = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {headache === 'yes' && (
        <TextAreaInput field="tmsHeadacheBlockDetail" className="h-full w-full" />
      )}
    </>
  )
}

export default HeadacheBlock;
