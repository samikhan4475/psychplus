import { Button, Flex, Text } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { ClaimUpdate } from '@/types'

const ClaimDetailHeader = () => {
  const { watch } = useFormContext<ClaimUpdate>()
  const claimNumber = watch('claimNumber')
  return (
    <Flex direction="column" gap="2" className="flex-1">
      <Flex
        p="2"
        className="bg-white sticky -top-[1px] z-10 -mt-[1px] border border-gray-5"
      >
        <Text className="text-[16px] font-[600] text-accent-12">
          Claim #{claimNumber}
        </Text>
        <Flex align="center" justify="end" gap="2" className="flex-1">
          <Button
            type="submit"
            size="1"
            highContrast
            className="h-auto px-1 py-1 text-[11px] font-[300]"
          >
            <SaveIcon width={15} height={15} strokeWidth={1.75} />
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
export { ClaimDetailHeader }
