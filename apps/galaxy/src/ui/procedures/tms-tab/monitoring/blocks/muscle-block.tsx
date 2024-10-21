import { useFormContext } from 'react-hook-form'
import { TextAreaInput, YesNoSelect } from '@/components'
import { TmsWidgetSchemaType } from '../../tms-widget-schema'

const BLOCK_ID = 'tmsMuscleTwitchingBlock.muscleTwitching'
const BLOCK_TITLE = 'Muscle Twitching'

const MuscleBlock = () => {
  const form = useFormContext<TmsWidgetSchemaType>()
  const muscleTwitching = form.watch('tmsMuscleTwitchingBlock.muscleTwitching')
  return (
    <>
      <YesNoSelect label={BLOCK_TITLE} field={BLOCK_ID} />
      {muscleTwitching === 'yes' && (
        <TextAreaInput
          field="tmsMuscleTwitchingBlock.details"
          className="h-full w-full"
        />
      )}
    </>
  )
}

export default MuscleBlock;
