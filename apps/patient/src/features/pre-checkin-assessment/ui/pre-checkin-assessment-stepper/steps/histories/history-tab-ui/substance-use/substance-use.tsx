import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex } from '@radix-ui/themes'
import { FormProvider, useForm } from 'react-hook-form'
import AlcoholBlock from './blocks/alcohol-block'
import SmokingBlock from './blocks/smoking-block'
import { substanceSchema, SubstanceSchemaType } from './substance-use-schema'

const SubstanceUse = () => {
  const form = useForm<SubstanceSchemaType>({
    resolver: zodResolver(substanceSchema),
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <Box>
        <Flex direction="column" gap="2">
          <Flex gap="3" align="start" wrap="wrap" direction={'column'}>
            <SmokingBlock />
            <hr className="w-full border-gray-7" />
            <AlcoholBlock />
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  )
}

export default SubstanceUse
