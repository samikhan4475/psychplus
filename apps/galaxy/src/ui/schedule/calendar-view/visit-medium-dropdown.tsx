import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'

const VisitMediumDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Visit Medium</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.VisitMedium}
        size="1"
        className='flex-1'
      />
    </FormFieldContainer>
  )
}

export { VisitMediumDropdown }
