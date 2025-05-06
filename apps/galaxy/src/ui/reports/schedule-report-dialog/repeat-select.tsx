import { FormFieldContainer } from '@/components'
import { RepeatCountSelect } from './repeat-count-select'

const RepeatSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-start gap-1">
      <RepeatCountSelect />
    </FormFieldContainer>
  )
}

export { RepeatSelect }
