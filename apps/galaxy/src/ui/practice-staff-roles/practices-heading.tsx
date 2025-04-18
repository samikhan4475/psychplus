'use client'

import { Flex, Text } from '@radix-ui/themes'
import { z } from 'zod'
import { Practice } from '@/types'
import { OrganizationSelect } from './organization-select'
import { PracticeSelect } from './practice-select'

const schema = z.object({
  organizationId: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

interface Props {
  practice: Practice
}

const PracticesHeading = ({ practice }: Props) => {
  return (
    <Flex className="bg-white h-[32px] w-full" align="center" gap="5">
      <Flex>
        <Text className="text-black text-[16px]" weight="medium">
          Staff Roles
        </Text>
      </Flex>
      <Flex direction="row" className="gap-8">
        <OrganizationSelect />
        <PracticeSelect organizationId={practice.organizationId} />
      </Flex>
    </Flex>
  )
}

export { PracticesHeading, type SchemaType }
