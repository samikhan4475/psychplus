import { Button, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore } from '@/store'

export const ProviderLink = () => {
  const { staffResource } = useStore((state) => ({
    staffResource: state.staffResource,
  }))

  const providerLink = `${window.location.origin}/call?email=${staffResource?.contactInfo?.email}`

  const handleCopy = () => {
    navigator.clipboard.writeText(providerLink)
    toast.success('Link copied to clipboard')
  }
  return (
    <Flex
      py="3"
      className="bg-white h-fit px-2.5 shadow-2"
      direction="column"
      m="3"
      width={'50vw'}
    >
      <Flex direction="column" mb="4" gap="1">
        <Heading>
          Welcome, {staffResource?.legalName.firstName}.{' '}
          {staffResource?.legalName.lastName}
        </Heading>
        <Text color="gray">
          Please invite someone to your waiting room, share this link
        </Text>
      </Flex>
      <Flex gap="1">
        <TextField.Root
          size="2"
          value={providerLink}
          disabled
          className="w-full"
        />
        <Button size="2" highContrast onClick={handleCopy}>
          <CopyIcon size="20" />
          <Text>Copy</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
