import { PsychPlusNavLogo } from '@psychplus-v2/components'
import { Flex } from '@radix-ui/themes'

const AnonHeader = () => {
  return (
    <Flex
      justify={{ initial: 'start', sm: 'center' }}
      px="5"
      py="1"
      className="border-b border-b-gray-5"
    >
      <PsychPlusNavLogo
        textClassName="text-[32px]"
        logoClassName="h-[28px] w-[28px]"
      />
    </Flex>
  )
}

export { AnonHeader }
