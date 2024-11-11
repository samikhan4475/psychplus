import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  FormError,
  FormFieldContainer,
  TextAreaInput,
} from '@/components'
import { TherapySchemaType } from '../therapy-schema'

const AdditionalTherapyDetailBlock = () => {
  const {
    formState: { errors },
  } = useFormContext<TherapySchemaType>()

  const errorMessage = errors.additionalTherapyDetail?.message || ''

  return (
    <FormFieldContainer className="flex flex-row items-start justify-start flex-grow">
      <BlockLabel className="flex-none self-start" required>
        Additional Therapy Details
      </BlockLabel>

      <Flex className=" w-full max-w-full flex-grow flex-col">
        <TextAreaInput
          field="additionalTherapyDetail"
          className="h-[90px] w-full max-w-full flex-grow mb-4"
        />
        <FormError message={errorMessage} />
      </Flex>
    </FormFieldContainer>
  )
}

export { AdditionalTherapyDetailBlock }
