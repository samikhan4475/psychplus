'use client'

import { Flex, Strong, Text } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldError } from '@/components'
import { VisaCardIcon } from '@/components/icons'

// import { VisaIcon } from '@/components/icons'

const CardDetails = () => {
  return (
    <FormFieldContainer className="h-full w-[388px] pt-5">
      <Flex
        className="h-6 w-full rounded-1 border border-solid border-blue-6"
        px="2"
        py="1"
        justify="between"
        align="center"
      >
        <VisaCardIcon />
        <Text size="1" className="text-pp-black-3">
          ***********4328
        </Text>
        <Text size="1" className="text-pp-black-3">
          Peter C Berkman
        </Text>
        <Text size="1" className="text-pp-black-3">
          <Strong>Exp. Date </Strong>
          08/27
        </Text>
      </Flex>
      <FormFieldError name="defaultCardId" />
    </FormFieldContainer>
  )
}

export { CardDetails }
