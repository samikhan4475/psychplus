import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  FormFieldContainer,
  TextInput,
} from '@/components'

const FollowUpBlock = () => {
  return (
    <FormFieldContainer className="flex flex-row items-start justify-start flex-grow gap-1">
      <BlockLabel className="flex-none self-start" >
        Follow Up if Other
      </BlockLabel>
      <Flex className=" w-full max-w-full flex-grow flex-col">
        <TextInput
          field="followUp"
          className="w-[600px]"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { FollowUpBlock }
