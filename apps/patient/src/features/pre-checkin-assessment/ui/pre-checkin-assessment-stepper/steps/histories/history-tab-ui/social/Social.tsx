import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { FormProvider, useForm } from 'react-hook-form'
import SocialHistory from './blocks/social-history'
import { socialSchema, SocialSchemaType } from './social-schema'

const Social = () => {
  const form = useForm<SocialSchemaType>({
    resolver: zodResolver(socialSchema),
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap="4">
        <SocialHistory />
      </Flex>
    </FormProvider>
  )
}

export default Social
