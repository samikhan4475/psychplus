import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PayerSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required={true}>Payer</FormFieldLabel>
      <CodesetSelect
        name="name"
        codeset={CODESETS.AccidentType}
        size="2"
        className=" w-full"
      />
    </FormFieldContainer>
  )
}

export { PayerSelect }
