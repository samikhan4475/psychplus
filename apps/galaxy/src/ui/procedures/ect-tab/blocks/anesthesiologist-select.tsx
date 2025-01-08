import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const AnesthesiologistSelect = () => {
  return (
  <FormFieldContainer className="w-auto flex flex-row gap-2">
      <FormFieldLabel className='text-[12px]'>Anesthesiologist</FormFieldLabel>
      <CodesetSelect
        name="anesthesiologist"
        codeset={CODESETS.ProviderType}
        size="1"
        className="w-32"
      />
    </FormFieldContainer>
  )
}

export { AnesthesiologistSelect }
