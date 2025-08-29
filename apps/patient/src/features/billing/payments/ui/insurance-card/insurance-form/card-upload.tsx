import { Flex } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components-v2'
import { InsurancePolicy } from '../../../types'
import { CardInput } from '../card-input'
import { InsuranceSchemaType } from '../schema'

interface InsuranceCardUploadProps {
  insurance?: InsurancePolicy
  form: UseFormReturn<InsuranceSchemaType>
  isReadOnly: boolean
  isCall: boolean
  onCardFrontImageChange: (image?: File) => void
  onCardBackImageChange: (image?: File) => void
}

const InsuranceCardUpload = ({
  insurance,
  form,
  isReadOnly,
  isCall,
  onCardFrontImageChange,
  onCardBackImageChange,
}: InsuranceCardUploadProps) => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>
        {isCall ? 'Upload Image of Insurance Card' : 'Insurance Card'}
      </FormFieldLabel>
      <Flex direction={{ initial: 'column', sm: 'row' }} width="100%" gap="3">
        <CardInput
          disabled={isReadOnly}
          label="Upload Front Side"
          savedImg={
            insurance && form.watch('hasCardFrontImage')
              ? `/api/patients/self/policies/${insurance.id}/cardimage/front`
              : undefined
          }
          onImageChanged={(image) => {
            form.setValue(
              'hasCardFrontImage',
              !form.getValues('hasCardFrontImage'),
            )
            onCardFrontImageChange(image)
          }}
          isCall={isCall}
        />
        <CardInput
          disabled={isReadOnly}
          label="Upload Back Side"
          savedImg={
            insurance && form.watch('hasCardBackImage')
              ? `/api/patients/self/policies/${insurance.id}/cardimage/back`
              : undefined
          }
          onImageChanged={(image) => {
            form.setValue(
              'hasCardBackImage',
              !form.getValues('hasCardBackImage'),
            )
            onCardBackImageChange(image)
          }}
          isCall={isCall}
        />
      </Flex>
    </FormFieldContainer>
  )
}

export default InsuranceCardUpload
