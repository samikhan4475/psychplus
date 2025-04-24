'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { useSelfProofing } from './hooks/use-self-proofing'

interface EPCSHeaderProps {
  userId: string | null
  staffId: string | null
}
const EPCSHeader = ({ userId,staffId }: EPCSHeaderProps) => {
  const { start, loading } = useSelfProofing()

  const handleStart = () => {
    if (userId) {
      const callbackUrl = `${window.location.origin}/ehr/staff/${staffId}/credentialing?id=${userId}`
      start(userId, callbackUrl)
    } else {
      toast.error('User ID is required to start the proofing process')
    }
  }
  return (
    <Flex direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex className="bg-white" p="2" align="center" justify="between">
        <Text size="4" weight="medium" className="min-w-[80px]">
          EPCS Manager
        </Text>
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={handleStart}
          disabled={loading}
          loading={loading}
        >
          Start EPCS Verification
        </Button>
      </Flex>
    </Flex>
  )
}

export { EPCSHeader }
