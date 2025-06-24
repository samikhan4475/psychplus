'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { AddPlanDialog } from './dialogs'

const PracticePlanListHeading = () => {
  return (
    <Flex
      className="bg-white h-[32px] w-full gap-1 px-2 py-1"
      align="center"
      justify="between"
    >
      <Text className="text-black text-[16px]" weight="medium">
        Plan List
      </Text>

      <AddPlanDialog>
        <Button size="1" variant="outline" color="gray" className="text-black">
          <PlusIcon height={16} width={16} />
          Add New
        </Button>
      </AddPlanDialog>
    </Flex>
  )
}

export { PracticePlanListHeading }
