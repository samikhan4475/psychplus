import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsMuscleTwitchingBlock'
const BLOCK_TITLE = 'Muscle Twitching'

const MuscleBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const muscleTwitching = form.watch(BLOCK_ID)
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {muscleTwitching === 'yes' && (
        <TextAreaInput
          field="tmsMuscleTwitchingBlockDetail"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default MuscleBlock;
