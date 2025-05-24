import { FormFieldContainer } from '@/components'
import { DurationInterval } from './duration-interval'
import { NumberOfDuration } from './duration-number-field'
import { ForSelect } from './for-select'

const DurationSelection = () => {
  return (
    <FormFieldContainer className="ml-1 mt-1 py-2 flex-row items-start gap-2">
      <ForSelect />
      <NumberOfDuration />
      <DurationInterval />
    </FormFieldContainer>
  )
}

export { DurationSelection }
