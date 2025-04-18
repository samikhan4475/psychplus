import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { SchemaType } from '../schema'

const GROUP_THERAPY = 'GroupTherapy'
const GroupType = () => {
  const { watch } = useFormContext<SchemaType>()
  const serviceOffered = watch('serviceOffered')

  return (
    <>
      {serviceOffered === GROUP_THERAPY && (
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required className="text-[12px]">
            Group Type
          </FormFieldLabel>
          <CodesetSelect
            name="therapyTypeCode"
            codeset={CODESETS.GroupTherapyType}
            size="1"
            className="w-[100%]"
          />
        </FormFieldContainer>
      )}
    </>
  )
}

export { GroupType }
