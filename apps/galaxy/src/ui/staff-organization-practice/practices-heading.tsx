'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { OrganizationSelect } from './organization-select'
import { PracticeSelect } from './practice-select'

const schema = z.object({
  organizationId: z.string().optional(),
  practice: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const PracticesHeading = ({ userId }: { userId: string }) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      organizationId: '',
      practice: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {}

  return (
    <Flex className="bg-white h-[32px] w-full" align="center" gap="5">
      <Flex>
        <Text className="text-black text-[16px]" weight="medium">
          Organization & Practice
        </Text>
      </Flex>
      <Flex>
        <FormContainer
          className="flex-row gap-4"
          form={form}
          onSubmit={onSubmit}
        >
          <OrganizationSelect userId={userId} />
          <PracticeSelect userId={userId} />
        </FormContainer>
      </Flex>
    </Flex>
  )
}

export { PracticesHeading, type SchemaType }
