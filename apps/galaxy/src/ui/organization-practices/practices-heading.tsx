'use client'

import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { PracticeDialog } from '@/ui/organization-practice/dialogs'
import { useStore } from './store'

const PracticesHeading = () => {
  const { id } = useParams<{ id: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const refetch = () => {
    search({
      organizationId: id,
    })
  }
  return (
    <Flex
      className="bg-white h-[32px] w-full gap-1 px-2 py-1"
      align="center"
      justify="between"
    >
      <Text className="text-black text-[16px]" weight="medium">
        Practices
      </Text>
      <PracticeDialog organizationId={id} isAddPractice refetch={refetch} />
    </Flex>
  )
}

export { PracticesHeading }
