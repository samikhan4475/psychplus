import { Button, Flex, Text } from '@radix-ui/themes'
import { ChevronRightIcon } from 'lucide-react'
import { Badge, FileLineIcon } from '@/components-v2'

const UpcomingSummaryPreVisitAssessment = () => {
  return (
    <Flex gap="1" width={{ initial: '100%', xs: 'auto' }} align="center">
      <Flex gap="1" align="center">
        <FileLineIcon />
        <Text className="whitespace-nowrap text-[12px] xs:text-[15px]">
          Pre-Visit Assessment
        </Text>
      </Flex>
      <Badge
        label="Not Completed"
        type="warning"
        addIcon={true}
        className="h-[32px]"
      />
      <Button highContrast className="bg-[#194595]" radius="full">
        <Flex gap="1" align="center">
          <Text className="whitespace-nowrap text-[11px] xs:text-[15px]">
            Fill Now
          </Text>
          <ChevronRightIcon height="16" width="16" />
        </Flex>
      </Button>
    </Flex>
  )
}

export { UpcomingSummaryPreVisitAssessment }
